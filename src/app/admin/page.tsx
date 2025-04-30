"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  supabase, 
  getAllPages, 
  getAllProducts, 
  Page, 
  Product, 
  getSiteConfig, 
  updateSiteConfig, 
  CountryRedirect,
  getAllCountryRedirects,
  createOrUpdateCountryRedirect,
  deleteCountryRedirect
} from '../../lib/supabase';

export default function AdminPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [newPage, setNewPage] = useState({ slug: '', title: '' });
  const [newProduct, setNewProduct] = useState({ pageId: '', slug: '', title: '' });
  const [pages, setPages] = useState<Page[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedPageId, setSelectedPageId] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [geoRedirectEnabled, setGeoRedirectEnabled] = useState(false);
  const [defaultInternationalPage, setDefaultInternationalPage] = useState('en-us');
  const [countryRedirects, setCountryRedirects] = useState<CountryRedirect[]>([]);
  const [newCountryRedirect, setNewCountryRedirect] = useState({ 
    country_code: '', 
    country_name: '', 
    page_slug: '' 
  });

  // Mock authentication - Em produção, use um sistema de autenticação real
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') { // Altere para uma senha mais segura em produção
      setIsAuthenticated(true);
      localStorage.setItem('adminAuth', 'true');
    } else {
      setError('Senha incorreta');
    }
  };

  // Verificar autenticação ao carregar
  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
    
    // Carregar dados do Supabase
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  // Carregar dados do Supabase
  const loadData = async () => {
    setIsLoading(true);
    try {
      const pagesData = await getAllPages();
      const productsData = await getAllProducts();
      
      // Carregar configuração de redirecionamento geolocalizado
      const geoRedirectConfig = await getSiteConfig('geo_redirect_enabled');
      setGeoRedirectEnabled(geoRedirectConfig === 'true');
      
      // Carregar página internacional padrão
      const defaultPageConfig = await getSiteConfig('default_international_page');
      if (defaultPageConfig) {
        setDefaultInternationalPage(defaultPageConfig);
      }
      
      // Carregar redirecionamentos por país
      const countryRedirectsData = await getAllCountryRedirects();
      setCountryRedirects(countryRedirectsData);
      
      setPages(pagesData);
      setProducts(productsData);
    } catch (err) {
      console.error('Erro ao carregar dados:', err);
      setError('Erro ao carregar dados. Tente novamente mais tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  // Criar uma nova página baseada na pt-br
  const handleCreatePage = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (!newPage.slug || !newPage.title) {
      setError('Preencha todos os campos');
      setIsLoading(false);
      return;
    }
    
    // Verificar se o slug já existe
    if (pages.some(page => page.slug === newPage.slug)) {
      setError('Este slug já está em uso');
      setIsLoading(false);
      return;
    }
    
    try {
      // Inserir nova página no Supabase
      const { data, error } = await supabase
        .from('pages')
        .insert([{ 
          slug: newPage.slug,
          title: newPage.title,
          is_active: true
        }])
        .select()
        .single();
      
      if (error) throw error;
      
      if (data) {
        setPages([...pages, data]);
        setNewPage({ slug: '', title: '' });
        setMessage(`Página ${newPage.title} criada com sucesso!`);
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (err: any) {
      console.error('Erro ao criar página:', err);
      setError(err.message || 'Erro ao criar página');
    } finally {
      setIsLoading(false);
    }
  };

  // Criar um novo produto baseado em foto-passaporte
  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (!newProduct.pageId || !newProduct.slug || !newProduct.title) {
      setError('Preencha todos os campos');
      setIsLoading(false);
      return;
    }
    
    // Verificar se a combinação página/slug já existe
    if (products.some(product => 
      product.page_id === newProduct.pageId && product.slug === newProduct.slug)) {
      setError('Este produto já existe para esta página');
      setIsLoading(false);
      return;
    }
    
    try {
      // Inserir novo produto no Supabase
      const { data, error } = await supabase
        .from('products')
        .insert([{ 
          page_id: newProduct.pageId,
          slug: newProduct.slug,
          title: newProduct.title,
          is_active: true
        }])
        .select()
        .single();
      
      if (error) throw error;
      
      if (data) {
        setProducts([...products, data]);
        setNewProduct({ pageId: newProduct.pageId, slug: '', title: '' });
        setMessage(`Produto ${newProduct.title} criado com sucesso!`);
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (err: any) {
      console.error('Erro ao criar produto:', err);
      setError(err.message || 'Erro ao criar produto');
    } finally {
      setIsLoading(false);
    }
  };

  // Ativar/desativar página
  const togglePageStatus = async (id: string, currentStatus: boolean) => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('pages')
        .update({ is_active: !currentStatus })
        .eq('id', id);
      
      if (error) throw error;
      
      // Atualizar estado local
      setPages(pages.map(page => {
        if (page.id === id) {
          return { ...page, is_active: !currentStatus };
        }
        return page;
      }));
      
      setMessage(`Página ${currentStatus ? 'desativada' : 'ativada'} com sucesso!`);
      setTimeout(() => setMessage(''), 3000);
    } catch (err: any) {
      console.error('Erro ao atualizar status da página:', err);
      setError(err.message || 'Erro ao atualizar status da página');
    } finally {
      setIsLoading(false);
    }
  };

  // Ativar/desativar produto
  const toggleProductStatus = async (id: string, currentStatus: boolean) => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('products')
        .update({ is_active: !currentStatus })
        .eq('id', id);
      
      if (error) throw error;
      
      // Atualizar estado local
      setProducts(products.map(product => {
        if (product.id === id) {
          return { ...product, is_active: !currentStatus };
        }
        return product;
      }));
      
      setMessage(`Produto ${currentStatus ? 'desativado' : 'ativado'} com sucesso!`);
      setTimeout(() => setMessage(''), 3000);
    } catch (err: any) {
      console.error('Erro ao atualizar status do produto:', err);
      setError(err.message || 'Erro ao atualizar status do produto');
    } finally {
      setIsLoading(false);
    }
  };

  // Alternar redirecionamento geolocalizado
  const toggleGeoRedirect = async () => {
    setIsLoading(true);
    try {
      const newStatus = !geoRedirectEnabled;
      const success = await updateSiteConfig('geo_redirect_enabled', newStatus ? 'true' : 'false');
      
      if (success) {
        setGeoRedirectEnabled(newStatus);
        setMessage(`Redirecionamento geolocalizado ${newStatus ? 'ativado' : 'desativado'} com sucesso!`);
        setTimeout(() => setMessage(''), 3000);
      } else {
        throw new Error('Erro ao atualizar configuração');
      }
    } catch (err: any) {
      console.error('Erro ao alternar redirecionamento geolocalizado:', err);
      setError(err.message || 'Erro ao alternar redirecionamento geolocalizado');
    } finally {
      setIsLoading(false);
    }
  };

  // Atualizar página internacional padrão
  const updateDefaultInternationalPage = async (pageSlug: string) => {
    setIsLoading(true);
    try {
      const success = await updateSiteConfig('default_international_page', pageSlug);
      
      if (success) {
        setDefaultInternationalPage(pageSlug);
        setMessage(`Página internacional padrão atualizada para ${pageSlug} com sucesso!`);
        setTimeout(() => setMessage(''), 3000);
      } else {
        throw new Error('Erro ao atualizar configuração');
      }
    } catch (err: any) {
      console.error('Erro ao atualizar página internacional padrão:', err);
      setError(err.message || 'Erro ao atualizar página internacional padrão');
    } finally {
      setIsLoading(false);
    }
  };

  // Adicionar ou atualizar redirecionamento por país
  const handleCreateCountryRedirect = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (!newCountryRedirect.country_code || !newCountryRedirect.country_name || !newCountryRedirect.page_slug) {
      setError('Preencha todos os campos');
      setIsLoading(false);
      return;
    }
    
    try {
      const success = await createOrUpdateCountryRedirect(
        newCountryRedirect.country_code,
        newCountryRedirect.country_name,
        newCountryRedirect.page_slug
      );
      
      if (success) {
        // Recarregar redirecionamentos
        const updatedRedirects = await getAllCountryRedirects();
        setCountryRedirects(updatedRedirects);
        
        // Limpar formulário
        setNewCountryRedirect({ country_code: '', country_name: '', page_slug: '' });
        setMessage(`Redirecionamento para ${newCountryRedirect.country_name} criado/atualizado com sucesso!`);
        setTimeout(() => setMessage(''), 3000);
      } else {
        throw new Error('Erro ao criar/atualizar redirecionamento');
      }
    } catch (err: any) {
      console.error('Erro ao criar/atualizar redirecionamento por país:', err);
      setError(err.message || 'Erro ao criar/atualizar redirecionamento por país');
    } finally {
      setIsLoading(false);
    }
  };

  // Excluir redirecionamento por país
  const handleDeleteCountryRedirect = async (countryCode: string, countryName: string) => {
    if (!confirm(`Tem certeza que deseja excluir o redirecionamento para ${countryName}?`)) {
      return;
    }
    
    setIsLoading(true);
    try {
      const success = await deleteCountryRedirect(countryCode);
      
      if (success) {
        // Atualizar estado local
        setCountryRedirects(countryRedirects.filter(redirect => redirect.country_code !== countryCode));
        setMessage(`Redirecionamento para ${countryName} excluído com sucesso!`);
        setTimeout(() => setMessage(''), 3000);
      } else {
        throw new Error('Erro ao excluir redirecionamento');
      }
    } catch (err: any) {
      console.error('Erro ao excluir redirecionamento por país:', err);
      setError(err.message || 'Erro ao excluir redirecionamento por país');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
        <div className="bg-white p-8 rounded-xl shadow-lg w-96 border border-gray-100">
          <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Admin Login</h1>
          {error && <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded-md">{error}</div>}
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 font-medium">Senha</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <button 
              type="submit"
              className="w-full text-white py-3 rounded-lg font-medium transition-colors duration-200"
              style={{ background: 'linear-gradient(to right, #6A0FDA, #B45DEB)' }}
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-xl shadow-md">
          <h1 className="text-3xl font-bold text-gray-800">Painel de Administração</h1>
          <button 
            onClick={() => {
              localStorage.removeItem('adminAuth');
              setIsAuthenticated(false);
            }}
            className="text-white px-5 py-2 rounded-lg font-medium transition-colors duration-200"
            style={{ background: 'linear-gradient(to right, #6A0FDA, #B45DEB)' }}
            disabled={isLoading}
          >
            Sair
          </button>
        </div>
        
        {message && <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-md shadow-sm">{message}</div>}
        {error && <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md shadow-sm">{error}</div>}
        {isLoading && <div className="bg-blue-50 border-l-4 border-purple-500 text-purple-700 p-4 mb-6 rounded-md shadow-sm">Carregando...</div>}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Formulário para criar nova página */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b border-gray-100 pb-3">Criar Nova Página de País</h2>
            <p className="text-sm text-purple-600 mb-6">
              Criar uma nova página baseada em pt-br. Exemplo: en-us para Estados Unidos.
            </p>
            <form onSubmit={handleCreatePage}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2 font-medium">Slug (ex: en-us)</label>
                <input 
                  type="text" 
                  value={newPage.slug}
                  onChange={(e) => setNewPage({...newPage, slug: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="en-us"
                  disabled={isLoading}
                />
              </div>
              <div className="mb-5">
                <label className="block text-gray-700 mb-2 font-medium">Título</label>
                <input 
                  type="text" 
                  value={newPage.title}
                  onChange={(e) => setNewPage({...newPage, title: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="English (US)"
                  disabled={isLoading}
                />
              </div>
              <button 
                type="submit"
                className="w-full text-white py-3 rounded-lg font-medium transition-colors duration-200"
                style={{ background: 'linear-gradient(to right, #6A0FDA, #B45DEB)' }}
                disabled={isLoading}
              >
                Criar Página
              </button>
            </form>
          </div>
          
          {/* Formulário para criar novo produto */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b border-gray-100 pb-3">Criar Novo Produto</h2>
            <p className="text-sm text-purple-600 mb-6">
              Criar um novo produto baseado em foto-passaporte para a página selecionada.
            </p>
            <form onSubmit={handleCreateProduct}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2 font-medium">Página</label>
                <select 
                  value={newProduct.pageId}
                  onChange={(e) => setNewProduct({...newProduct, pageId: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  disabled={isLoading}
                >
                  <option value="">Selecione uma página</option>
                  {pages.map(page => (
                    <option key={page.id} value={page.id}>{page.title} ({page.slug})</option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2 font-medium">Slug (ex: foto-passaporte)</label>
                <input 
                  type="text" 
                  value={newProduct.slug}
                  onChange={(e) => setNewProduct({...newProduct, slug: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="foto-passaporte"
                  disabled={isLoading}
                />
              </div>
              <div className="mb-5">
                <label className="block text-gray-700 mb-2 font-medium">Título</label>
                <input 
                  type="text" 
                  value={newProduct.title}
                  onChange={(e) => setNewProduct({...newProduct, title: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Foto para Passaporte"
                  disabled={isLoading}
                />
              </div>
              <button 
                type="submit"
                className="w-full text-white py-3 rounded-lg font-medium transition-colors duration-200"
                style={{ background: 'linear-gradient(to right, #6A0FDA, #B45DEB)' }}
                disabled={isLoading}
              >
                Criar Produto
              </button>
            </form>
          </div>
          
          {/* Formulário para criar redirecionamento por país */}
        </div>
        
        {/* Lista de páginas */}
        <div className="mt-8 bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <h2 className="text-xl font-semibold mb-6 text-gray-800 border-b border-gray-100 pb-3">Páginas Criadas</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 border-b border-gray-100 text-left text-gray-700 font-medium">Título</th>
                  <th className="py-3 px-4 border-b border-gray-100 text-left text-gray-700 font-medium">Slug</th>
                  <th className="py-3 px-4 border-b border-gray-100 text-left text-gray-700 font-medium">Status</th>
                  <th className="py-3 px-4 border-b border-gray-100 text-left text-gray-700 font-medium">Data de Criação</th>
                  <th className="py-3 px-4 border-b border-gray-100 text-left text-gray-700 font-medium">Ações</th>
                </tr>
              </thead>
              <tbody>
                {pages.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-purple-500">
                      {isLoading ? 'Carregando páginas...' : 'Nenhuma página criada ainda'}
                    </td>
                  </tr>
                ) : (
                  pages.map(page => (
                    <tr key={page.id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="py-3 px-4 border-b border-gray-100">{page.title}</td>
                      <td className="py-3 px-4 border-b border-gray-100">{page.slug}</td>
                      <td className="py-3 px-4 border-b border-gray-100">
                        <span className={`px-3 py-1 rounded-full text-sm ${page.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {page.is_active ? 'Ativo' : 'Inativo'}
                        </span>
                      </td>
                      <td className="py-3 px-4 border-b border-gray-100">{new Date(page.created_at).toLocaleDateString()}</td>
                      <td className="py-3 px-4 border-b border-gray-100">
                        <button 
                          onClick={() => togglePageStatus(page.id, page.is_active)}
                          className={`mr-2 px-4 py-1 rounded-lg text-sm ${page.is_active ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'} text-white transition-colors duration-200`}
                          disabled={isLoading}
                        >
                          {page.is_active ? 'Desativar' : 'Ativar'}
                        </button>
                        <Link 
                          href={`/admin/edit-page/${page.slug}`} 
                          className="mr-2 px-4 py-1 rounded-lg text-sm text-white transition-colors duration-200 inline-block"
                          style={{ background: 'linear-gradient(to right, #6A0FDA, #B45DEB)' }}
                        >
                          Editar
                        </Link>
                        <Link 
                          href={`/${page.slug}`} 
                          target="_blank" 
                          className="px-4 py-1 rounded-lg text-sm text-white transition-colors duration-200 inline-block"
                          style={{ background: 'linear-gradient(to right, #6A0FDA, #B45DEB)' }}
                        >
                          Visualizar
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Lista de produtos */}
        <div className="mt-8 bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b border-gray-100 pb-3">Produtos Criados</h2>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2 font-medium">Filtrar por Página</label>
            <select 
              value={selectedPageId}
              onChange={(e) => setSelectedPageId(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              disabled={isLoading}
            >
              <option value="">Todas as páginas</option>
              {pages.map(page => (
                <option key={page.id} value={page.id}>{page.title} ({page.slug})</option>
              ))}
            </select>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 border-b border-gray-100 text-left text-gray-700 font-medium">Título</th>
                  <th className="py-3 px-4 border-b border-gray-100 text-left text-gray-700 font-medium">Página</th>
                  <th className="py-3 px-4 border-b border-gray-100 text-left text-gray-700 font-medium">Slug</th>
                  <th className="py-3 px-4 border-b border-gray-100 text-left text-gray-700 font-medium">Status</th>
                  <th className="py-3 px-4 border-b border-gray-100 text-left text-gray-700 font-medium">Data de Criação</th>
                  <th className="py-3 px-4 border-b border-gray-100 text-left text-gray-700 font-medium">Ações</th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-6 text-center text-purple-500">
                      {isLoading ? 'Carregando produtos...' : 'Nenhum produto criado ainda'}
                    </td>
                  </tr>
                ) : (
                  products
                    .filter(product => !selectedPageId || product.page_id === selectedPageId)
                    .map(product => {
                      const page = pages.find(p => p.id === product.page_id);
                      return (
                        <tr key={product.id} className="hover:bg-gray-50 transition-colors duration-150">
                          <td className="py-3 px-4 border-b border-gray-100">{product.title}</td>
                          <td className="py-3 px-4 border-b border-gray-100">{page ? `${page.title} (${page.slug})` : 'Página não encontrada'}</td>
                          <td className="py-3 px-4 border-b border-gray-100">{product.slug}</td>
                          <td className="py-3 px-4 border-b border-gray-100">
                            <span className={`px-3 py-1 rounded-full text-sm ${product.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {product.is_active ? 'Ativo' : 'Inativo'}
                            </span>
                          </td>
                          <td className="py-3 px-4 border-b border-gray-100">{new Date(product.created_at).toLocaleDateString()}</td>
                          <td className="py-3 px-4 border-b border-gray-100">
                            <button 
                              onClick={() => toggleProductStatus(product.id, product.is_active)}
                              className={`mr-2 px-4 py-1 rounded-lg text-sm ${product.is_active ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'} text-white transition-colors duration-200`}
                              disabled={isLoading}
                            >
                              {product.is_active ? 'Desativar' : 'Ativar'}
                            </button>
                            <Link 
                              href={`/admin/edit-product/${product.id}`} 
                              className="mr-2 px-4 py-1 rounded-lg text-sm text-white transition-colors duration-200 inline-block"
                              style={{ background: 'linear-gradient(to right, #6A0FDA, #B45DEB)' }}
                            >
                              Editar
                            </Link>
                            {page && (
                              <Link 
                                href={`/${page.slug}/${product.slug}`} 
                                target="_blank" 
                                className="px-4 py-1 rounded-lg text-sm text-white transition-colors duration-200 inline-block"
                                style={{ background: 'linear-gradient(to right, #6A0FDA, #B45DEB)' }}
                              >
                                Visualizar
                              </Link>
                            )}
                          </td>
                        </tr>
                      );
                    })
                )}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Lista de redirecionamentos por país */}
        <div className="mt-8 bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <h2 className="text-xl font-semibold mb-6 text-gray-800 border-b border-gray-100 pb-3">Redirecionamentos por País</h2>
          
          {/* Configurações de redirecionamento */}
          <div className="mb-8 p-4 border rounded bg-gray-50">
            <h3 className="text-lg font-medium mb-4">Configurações de Redirecionamento</h3>
            
            <div className="mb-6">
              <h4 className="text-base font-medium mb-2">Status do Redirecionamento</h4>
              <p className="mb-2 text-sm text-gray-600">
                Quando ativado, visitantes serão redirecionados para páginas específicas com base no país de origem.
              </p>
              <div className="flex items-center">
                <button
                  onClick={toggleGeoRedirect}
                  className={`px-4 py-2 rounded font-semibold ${
                    geoRedirectEnabled ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-800'
                  }`}
                  disabled={isLoading}
                >
                  {isLoading ? 'Aguarde...' : geoRedirectEnabled ? 'Ativado' : 'Desativado'}
                </button>
                <span className="ml-2 text-sm text-gray-600">
                  {geoRedirectEnabled ? 'Redirecionamento ativo' : 'Redirecionamento desativado'}
                </span>
              </div>
            </div>
            
            <div className="mb-6">
              <h4 className="text-base font-medium mb-2">Página Internacional Padrão</h4>
              <p className="mb-2 text-sm text-gray-600">
                Esta página será usada para visitantes de países que não possuem um redirecionamento específico configurado.
              </p>
              <div className="flex items-center">
                <select 
                  value={defaultInternationalPage}
                  onChange={(e) => updateDefaultInternationalPage(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  disabled={isLoading}
                >
                  {pages.map(page => (
                    <option key={page.id} value={page.slug}>{page.title} ({page.slug})</option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Formulário para criar redirecionamento por país */}
            <div className="border-t border-gray-200 pt-6 mt-6">
              <h4 className="text-base font-medium mb-4">Adicionar/Editar Redirecionamento por País</h4>
              <p className="text-sm text-gray-600 mb-4">
                Configure para qual página cada país será redirecionado. 
                <a 
                  href="https://www.iban.com/country-codes" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="ml-1 text-purple-600 hover:underline"
                >
                  Consultar lista de códigos de país
                </a>
              </p>
              <form onSubmit={handleCreateCountryRedirect} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Código do País (ex: US, CA, BR)</label>
                  <input 
                    type="text" 
                    value={newCountryRedirect.country_code}
                    onChange={(e) => setNewCountryRedirect({...newCountryRedirect, country_code: e.target.value.toUpperCase()})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="US"
                    maxLength={2}
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Nome do País</label>
                  <input 
                    type="text" 
                    value={newCountryRedirect.country_name}
                    onChange={(e) => setNewCountryRedirect({...newCountryRedirect, country_name: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Estados Unidos"
                    disabled={isLoading}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-700 mb-2 font-medium">Página de Destino</label>
                  <select 
                    value={newCountryRedirect.page_slug}
                    onChange={(e) => setNewCountryRedirect({...newCountryRedirect, page_slug: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    disabled={isLoading}
                  >
                    <option value="">Selecione uma página</option>
                    {pages.map(page => (
                      <option key={page.id} value={page.slug}>{page.title} ({page.slug})</option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <button 
                    type="submit"
                    className="w-full text-white py-2 rounded-lg font-medium transition-colors duration-200"
                    style={{ background: 'linear-gradient(to right, #6A0FDA, #B45DEB)' }}
                    disabled={isLoading}
                  >
                    {newCountryRedirect.country_code && countryRedirects.some(r => r.country_code === newCountryRedirect.country_code) 
                      ? 'Atualizar Redirecionamento' 
                      : 'Adicionar Redirecionamento'}
                  </button>
                </div>
              </form>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 border-b border-gray-100 text-left text-gray-700 font-medium">Código do País</th>
                  <th className="py-3 px-4 border-b border-gray-100 text-left text-gray-700 font-medium">Nome do País</th>
                  <th className="py-3 px-4 border-b border-gray-100 text-left text-gray-700 font-medium">Página de Destino</th>
                  <th className="py-3 px-4 border-b border-gray-100 text-left text-gray-700 font-medium">Ações</th>
                </tr>
              </thead>
              <tbody>
                {countryRedirects.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-6 text-center text-purple-500">
                      {isLoading ? 'Carregando redirecionamentos...' : 'Nenhum redirecionamento configurado ainda'}
                    </td>
                  </tr>
                ) : (
                  countryRedirects.map(redirect => {
                    const page = pages.find(p => p.slug === redirect.page_slug);
                    return (
                      <tr key={redirect.id} className="hover:bg-gray-50 transition-colors duration-150">
                        <td className="py-3 px-4 border-b border-gray-100">{redirect.country_code}</td>
                        <td className="py-3 px-4 border-b border-gray-100">{redirect.country_name}</td>
                        <td className="py-3 px-4 border-b border-gray-100">
                          {page ? `${page.title} (${page.slug})` : redirect.page_slug}
                        </td>
                        <td className="py-3 px-4 border-b border-gray-100">
                          <button 
                            onClick={() => {
                              setNewCountryRedirect({
                                country_code: redirect.country_code,
                                country_name: redirect.country_name,
                                page_slug: redirect.page_slug
                              });
                              // Rolar para a seção de configuração
                              document.querySelector('.border-t')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="mr-2 px-4 py-1 rounded-lg text-sm text-white transition-colors duration-200 inline-block"
                            style={{ background: 'linear-gradient(to right, #6A0FDA, #B45DEB)' }}
                          >
                            Editar
                          </button>
                          <button 
                            onClick={() => handleDeleteCountryRedirect(redirect.country_code, redirect.country_name)}
                            className="px-4 py-1 rounded-lg text-sm bg-red-500 hover:bg-red-600 text-white transition-colors duration-200"
                            disabled={isLoading}
                          >
                            Excluir
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
} 