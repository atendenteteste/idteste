"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  supabase, 
  getPageContentCustomizations, 
  saveContentCustomization, 
  getAvailableComponents, 
  getDefaultPageContent
} from '../../../../lib/supabase';

export default function EditPagePage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [pageDetails, setPageDetails] = useState<any>(null);
  const [customizations, setCustomizations] = useState<any[]>([]);
  const [availableComponents, setAvailableComponents] = useState<any[]>([]);
  const [selectedComponent, setSelectedComponent] = useState('');
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [defaultContent, setDefaultContent] = useState<any>({});

  // Verificar autenticação ao carregar
  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    } else {
      router.push('/admin');
    }
  }, [router]);

  // Carregar dados quando autenticado
  useEffect(() => {
    if (isAuthenticated && slug) {
      loadData();
    }
  }, [isAuthenticated, slug]);

  // Carregar dados do Supabase
  const loadData = async () => {
    setIsLoading(true);
    try {
      // Buscar detalhes da página
      const { data: pageData, error: pageError } = await supabase
        .from('pages')
        .select('*')
        .eq('slug', slug)
        .single();
      
      if (pageError) throw pageError;
      
      setPageDetails(pageData);
      
      // Buscar customizações existentes
      const customizationsData = await getPageContentCustomizations(slug);
      setCustomizations(customizationsData);
      
      // Obter componentes disponíveis
      const componentsData = getAvailableComponents();
      setAvailableComponents(componentsData);
      
      // Obter conteúdo padrão
      const defaultContentData = getDefaultPageContent();
      setDefaultContent(defaultContentData);
      
      // Se já existe um componente selecionado, carregar seus valores
      if (componentsData.length > 0) {
        setSelectedComponent(componentsData[0].id);
        loadComponentValues(componentsData[0].id, customizationsData, defaultContentData);
      }
    } catch (err: any) {
      console.error('Erro ao carregar dados:', err);
      setError(err.message || 'Erro ao carregar dados');
    } finally {
      setIsLoading(false);
    }
  };

  // Carregar valores do componente selecionado
  const loadComponentValues = (componentId: string, customizationsData: any[], defaultContentData: any) => {
    const componentData = defaultContentData[componentId] || {};
    const newFormData: Record<string, string> = {};
    
    // Carregar valores padrão
    Object.entries(componentData).forEach(([key, value]) => {
      newFormData[key] = value as string;
    });
    
    // Sobrescrever com customizações existentes
    customizationsData
      .filter(custom => custom.component === componentId)
      .forEach(custom => {
        newFormData[custom.element_id] = custom.custom_value;
      });
    
    setFormData(newFormData);
  };

  // Alterar componente selecionado
  const handleComponentChange = (componentId: string) => {
    setSelectedComponent(componentId);
    loadComponentValues(componentId, customizations, defaultContent);
  };

  // Atualizar valor do campo
  const handleInputChange = (elementId: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [elementId]: value
    }));
  };

  // Salvar customizações
  const handleSave = async () => {
    setIsLoading(true);
    setError('');
    setMessage('');
    
    try {
      // Obter elementos do componente selecionado
      const component = availableComponents.find(comp => comp.id === selectedComponent);
      if (!component) throw new Error('Componente não encontrado');
      
      const savePromises = component.elements.map(async (element: any) => {
        const value = formData[element.id];
        if (value === undefined) return null;
        
        // Verificar se é diferente do valor padrão
        const defaultValue = defaultContent[selectedComponent]?.[element.id];
        if (value === defaultValue) {
          // Se for igual ao padrão, remover customização existente
          const existingCustom = customizations.find(
            c => c.component === selectedComponent && c.element_id === element.id
          );
          
          if (existingCustom) {
            await supabase
              .from('content_customizations')
              .delete()
              .eq('id', existingCustom.id);
          }
          
          return null;
        }
        
        // Salvar customização
        const customization = {
          entity_id: pageDetails.id,
          entity_type: 'page' as 'page' | 'product',
          component: selectedComponent,
          element_type: element.type,
          element_id: element.id,
          original_value: defaultContent[selectedComponent]?.[element.id] || '',
          custom_value: value
        };
        
        return saveContentCustomization(customization);
      });
      
      await Promise.all(savePromises);
      
      // Atualizar customizações
      const updatedCustomizations = await getPageContentCustomizations(slug);
      setCustomizations(updatedCustomizations);
      
      setMessage('Alterações salvas com sucesso!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err: any) {
      console.error('Erro ao salvar customizações:', err);
      setError(err.message || 'Erro ao salvar customizações');
    } finally {
      setIsLoading(false);
    }
  };

  // Resetar para valores padrão
  const handleReset = () => {
    if (selectedComponent && defaultContent[selectedComponent]) {
      const defaultValues = defaultContent[selectedComponent];
      setFormData(defaultValues);
    }
  };

  if (!isAuthenticated) {
    return null; // Redirecionando para /admin
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-xl shadow-md">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Editar Conteúdo da Página</h1>
            {pageDetails && (
              <p className="text-purple-600 mt-1">
                {pageDetails.title} ({pageDetails.slug})
              </p>
            )}
          </div>
          <div className="flex gap-3">
            <Link 
              href="/admin" 
              className="text-white px-5 py-2 rounded-lg font-medium transition-colors duration-200"
              style={{ background: 'linear-gradient(to right, #6A0FDA, #B45DEB)' }}
            >
              Voltar
            </Link>
            {pageDetails && (
              <Link 
                href={`/${pageDetails.slug}`} 
                target="_blank" 
                className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                Visualizar Página
              </Link>
            )}
          </div>
        </div>
        
        {message && <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-md shadow-sm">{message}</div>}
        {error && <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md shadow-sm">{error}</div>}
        {isLoading && <div className="bg-blue-50 border-l-4 border-purple-500 text-purple-700 p-4 mb-6 rounded-md shadow-sm">Carregando...</div>}
        
        {!isLoading && pageDetails && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 md:col-span-1">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b border-gray-100 pb-3">Componentes</h2>
              <div className="space-y-2">
                {availableComponents.map(component => (
                  <button
                    key={component.id}
                    onClick={() => handleComponentChange(component.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 ${
                      selectedComponent === component.id
                        ? 'text-white'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                    style={selectedComponent === component.id ? { background: 'linear-gradient(to right, #6A0FDA, #B45DEB)' } : {}}
                  >
                    {component.name}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 md:col-span-3">
              {selectedComponent && (
                <>
                  <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-3">
                    <h2 className="text-xl font-semibold text-gray-800">
                      {availableComponents.find(c => c.id === selectedComponent)?.name}
                    </h2>
                    <div className="flex gap-3">
                      <button
                        onClick={handleReset}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                        disabled={isLoading}
                      >
                        Restaurar Padrões
                      </button>
                      <button
                        onClick={handleSave}
                        className="text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                        style={{ background: 'linear-gradient(to right, #6A0FDA, #B45DEB)' }}
                        disabled={isLoading}
                      >
                        Salvar Alterações
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    {availableComponents
                      .find(c => c.id === selectedComponent)
                      ?.elements.map((element: any) => {
                        const value = formData[element.id] || '';
                        const defaultValue = defaultContent[selectedComponent]?.[element.id] || '';
                        const isCustomized = value !== defaultValue;
                        
                        return (
                          <div key={element.id} className="border-b border-gray-50 pb-6 last:border-b-0">
                            <label className="block text-gray-700 mb-2 font-medium flex justify-between">
                              <span>{element.name}</span>
                              {isCustomized && (
                                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                                  Personalizado
                                </span>
                              )}
                            </label>
                            
                            {element.type === 'text' && (
                              <>
                                <textarea
                                  value={value}
                                  onChange={(e) => handleInputChange(element.id, e.target.value)}
                                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                                    isCustomized ? 'border-purple-400 bg-purple-50' : 'border-gray-200'
                                  }`}
                                  rows={3}
                                  disabled={isLoading}
                                />
                                {defaultValue && (
                                  <div className="mt-2 text-sm text-gray-500">
                                    <span className="font-medium">Valor padrão:</span> {defaultValue}
                                  </div>
                                )}
                              </>
                            )}
                            
                            {element.type === 'link' && (
                              <>
                                <input
                                  type="text"
                                  value={value}
                                  onChange={(e) => handleInputChange(element.id, e.target.value)}
                                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                                    isCustomized ? 'border-purple-400 bg-purple-50' : 'border-gray-200'
                                  }`}
                                  disabled={isLoading}
                                />
                                {defaultValue && (
                                  <div className="mt-2 text-sm text-gray-500">
                                    <span className="font-medium">Valor padrão:</span> {defaultValue}
                                  </div>
                                )}
                              </>
                            )}
                            
                            {element.type === 'button' && (
                              <>
                                <input
                                  type="text"
                                  value={value}
                                  onChange={(e) => handleInputChange(element.id, e.target.value)}
                                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                                    isCustomized ? 'border-purple-400 bg-purple-50' : 'border-gray-200'
                                  }`}
                                  disabled={isLoading}
                                />
                                <div className="mt-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
                                  <div className="text-sm text-gray-500 mb-2">Prévia:</div>
                                  <button 
                                    className="text-white px-4 py-2 rounded-lg cursor-default"
                                    style={{ background: 'linear-gradient(to right, #6A0FDA, #B45DEB)' }}
                                  >
                                    {value || defaultValue}
                                  </button>
                                </div>
                                {defaultValue && (
                                  <div className="mt-2 text-sm text-gray-500">
                                    <span className="font-medium">Valor padrão:</span> {defaultValue}
                                  </div>
                                )}
                              </>
                            )}
                          </div>
                        );
                      })}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 