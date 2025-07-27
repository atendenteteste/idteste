import { createClient } from '@supabase/supabase-js';

// Definir os tipos para as tabelas do Supabase
export type Page = {
  id: string;
  slug: string;
  title: string;
  is_active: boolean;
  created_at: string;
};

export type Product = {
  id: string;
  page_id: string;
  slug: string;
  title: string;
  is_active: boolean;
  created_at: string;
};

export type SiteConfig = {
  id: string;
  key: string;
  value: string;
  created_at: string;
  updated_at: string;
};

export type CountryRedirect = {
  id: string;
  country_code: string;
  country_name: string;
  page_slug: string;
  created_at: string;
  updated_at: string;
};

// Definir tipo para conteúdo personalizado
export type ContentCustomization = {
  id: string;
  entity_id: string;    // ID da página ou produto
  entity_type: 'page' | 'product';  // Tipo de entidade (página ou produto)
  component: string;    // Nome do componente (ex: 'HeroSection', 'Header')
  element_type: string; // Tipo do elemento (ex: 'text', 'button', 'link')
  element_id: string;   // ID do elemento no componente
  original_value: string; // Valor original
  custom_value: string;   // Valor personalizado
  created_at: string;
  updated_at: string;
};

// Database interface - com os tipos específicos para nossas tabelas
export interface Database {
  public: {
    Tables: {
      pages: {
        Row: Page;
        Insert: Omit<Page, 'id' | 'created_at'>;
        Update: Partial<Omit<Page, 'id' | 'created_at'>>;
      };
      products: {
        Row: Product;
        Insert: Omit<Product, 'id' | 'created_at'>;
        Update: Partial<Omit<Product, 'id' | 'created_at'>>;
      };
      content_customizations: {
        Row: ContentCustomization;
        Insert: Omit<ContentCustomization, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<ContentCustomization, 'id' | 'created_at' | 'updated_at'>>;
      };
      site_config: {
        Row: SiteConfig;
        Insert: Omit<SiteConfig, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<SiteConfig, 'id' | 'created_at' | 'updated_at'>>;
      };
      country_redirects: {
        Row: CountryRedirect;
        Insert: Omit<CountryRedirect, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<CountryRedirect, 'id' | 'created_at' | 'updated_at'>>;
      };
    };
    Views: {
      active_pages: {
        Row: Page;
      };
      active_products: {
        Row: Product;
      };
    };
  };
}

// Verificar se as variáveis de ambiente estão definidas
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('URL do Supabase não definida na variável de ambiente NEXT_PUBLIC_SUPABASE_URL');
}

if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Chave anônima do Supabase não definida na variável de ambiente NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

// Criar cliente Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Funções de utilidade para acessar dados

// Buscar todas as páginas ativas
export async function getActivePages() {
  const { data, error } = await supabase
    .from('active_pages')
    .select('*')
    .order('created_at', { ascending: true });
  
  if (error) {
    console.error('Erro ao buscar páginas ativas:', error);
    return [];
  }
  
  return data || [];
}

// Buscar todas as páginas (para admin)
export async function getAllPages() {
  const { data, error } = await supabase
    .from('pages')
    .select('*')
    .order('created_at', { ascending: true });
  
  if (error) {
    console.error('Erro ao buscar todas as páginas:', error);
    return [];
  }
  
  return data || [];
}

// Buscar todos os produtos ativos
export async function getActiveProducts() {
  const { data, error } = await supabase
    .from('active_products')
    .select('*')
    .order('created_at', { ascending: true });
  
  if (error) {
    console.error('Erro ao buscar produtos ativos:', error);
    return [];
  }
  
  return data || [];
}

// Buscar todos os produtos (para admin)
export async function getAllProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: true });
  
  if (error) {
    console.error('Erro ao buscar todos os produtos:', error);
    return [];
  }
  
  return data || [];
}

// Buscar produtos para uma página específica
export async function getProductsByPage(pageId: string) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('page_id', pageId)
    .eq('is_active', true)
    .order('created_at', { ascending: true });
  
  if (error) {
    console.error(`Erro ao buscar produtos para a página ${pageId}:`, error);
    return [];
  }
  
  return data || [];
}

// Buscar produtos por slug da página
export async function getProductsByPageSlug(pageSlug: string) {
  // Primeiro buscar a página
  const { data: page, error: pageError } = await supabase
    .from('pages')
    .select('id')
    .eq('slug', pageSlug)
    .eq('is_active', true)
    .single();
  
  if (pageError || !page) {
    console.error(`Erro ao buscar página com slug ${pageSlug}:`, pageError);
    return [];
  }
  
  // Depois buscar os produtos
  return getProductsByPage(page.id);
}

// Verificar se uma página existe
export async function pageExists(pageSlug: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('pages')
    .select('id')
    .eq('slug', pageSlug)
    .eq('is_active', true)
    .single();
  
  if (error || !data) {
    return false;
  }
  
  return true;
}

// Verificar se um produto existe
export async function productExists(pageSlug: string, productSlug: string): Promise<boolean> {
  // Primeiro buscar a página
  const { data: page, error: pageError } = await supabase
    .from('pages')
    .select('id')
    .eq('slug', pageSlug)
    .eq('is_active', true)
    .single();
  
  if (pageError || !page) {
    return false;
  }
  
  // Depois verificar se o produto existe
  const { data, error } = await supabase
    .from('products')
    .select('id')
    .eq('page_id', page.id)
    .eq('slug', productSlug)
    .eq('is_active', true)
    .single();
  
  if (error || !data) {
    return false;
  }
  
  return true;
}

// Funções para conteúdo personalizado

// Buscar customizações de conteúdo para uma página
export async function getPageContentCustomizations(pageSlug: string) {
  // Primeiro buscar a página
  const { data: page, error: pageError } = await supabase
    .from('pages')
    .select('id')
    .eq('slug', pageSlug)
    .single();
  
  if (pageError || !page) {
    console.error(`Erro ao buscar página com slug ${pageSlug}:`, pageError);
    return [];
  }
  
  // Depois buscar as customizações
  const { data, error } = await supabase
    .from('content_customizations')
    .select('*')
    .eq('entity_id', page.id)
    .eq('entity_type', 'page');
  
  if (error) {
    console.error(`Erro ao buscar customizações para a página ${pageSlug}:`, error);
    return [];
  }
  
  return data || [];
}

// Buscar customizações de conteúdo para um produto
export async function getProductContentCustomizations(productId: string) {
  const { data, error } = await supabase
    .from('content_customizations')
    .select('*')
    .eq('entity_id', productId)
    .eq('entity_type', 'product');
  
  if (error) {
    console.error(`Erro ao buscar customizações para o produto ${productId}:`, error);
    return [];
  }
  
  return data || [];
}

// Salvar uma customização de conteúdo
export async function saveContentCustomization(customization: Omit<ContentCustomization, 'id' | 'created_at' | 'updated_at'>) {
  // Verificar se já existe uma customização para este elemento
  const { data: existingCustomization, error: fetchError } = await supabase
    .from('content_customizations')
    .select('id')
    .eq('entity_id', customization.entity_id)
    .eq('entity_type', customization.entity_type)
    .eq('component', customization.component)
    .eq('element_id', customization.element_id)
    .single();
  
  if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 é o código para "não encontrado"
    console.error('Erro ao verificar customização existente:', fetchError);
    return null;
  }
  
  if (existingCustomization) {
    // Atualizar customização existente
    const { data, error } = await supabase
      .from('content_customizations')
      .update({ custom_value: customization.custom_value })
      .eq('id', existingCustomization.id)
      .select()
      .single();
    
    if (error) {
      console.error('Erro ao atualizar customização:', error);
      return null;
    }
    
    return data;
  } else {
    // Criar nova customização
    const { data, error } = await supabase
      .from('content_customizations')
      .insert([customization])
      .select()
      .single();
    
    if (error) {
      console.error('Erro ao criar customização:', error);
      return null;
    }
    
    return data;
  }
}

// Obter todos os componentes disponíveis para personalização
export function getAvailableComponents() {
  return [
    { id: 'HeroSection', name: 'Seção Principal', elements: [
      { id: 'mainTitle', type: 'text', name: 'Título Principal' },
      { id: 'mainSubtitle', type: 'text', name: 'Subtítulo' },
      { id: 'ctaButton', type: 'button', name: 'Botão CTA' },
      { id: 'ctaButtonLink', type: 'link', name: 'Link do Botão CTA' },
      { id: 'secondaryButton', type: 'button', name: 'Botão Secundário' },
      { id: 'secondaryButtonLink', type: 'link', name: 'Link do Botão Secundário' },
      { id: 'ratingText', type: 'text', name: 'Texto de Avaliação' },
      { id: 'usersText', type: 'text', name: 'Texto de Usuários' }
    ]},
    { id: 'Header', name: 'Header', elements: [
      { id: 'howItWorksText', type: 'text', name: 'Texto Como Funciona' },
      { id: 'howItWorksLink', type: 'link', name: 'Link Como Funciona' },
      { id: 'documentsText', type: 'text', name: 'Texto Documentos Populares' },
      { id: 'questionsText', type: 'text', name: 'Texto Dúvidas' },
      { id: 'questionsLink', type: 'link', name: 'Link Dúvidas' },
      { id: 'ctaButtonText', type: 'text', name: 'Texto Botão CTA' },
      { id: 'ctaButtonLink', type: 'link', name: 'Link Botão CTA' }
    ]},
    { id: 'DocumentSelect', name: 'Seleção de Documentos', elements: [
      { id: 'sectionTitle', type: 'text', name: 'Título da Seção' },
      { id: 'viewMoreButtonText', type: 'text', name: 'Texto do Botão Ver Mais' },
      { id: 'viewMoreButtonLink', type: 'link', name: 'Link do Botão Ver Mais' },
      { id: 'document1Title', type: 'text', name: 'Título Documento 1' },
      { id: 'document1Image', type: 'text', name: 'Imagem Documento 1' },
      { id: 'document1Link', type: 'link', name: 'Link Documento 1' },
      { id: 'document1ButtonText', type: 'text', name: 'Texto Botão Documento 1' },
      { id: 'document2Title', type: 'text', name: 'Título Documento 2' },
      { id: 'document2Image', type: 'text', name: 'Imagem Documento 2' },
      { id: 'document2Link', type: 'link', name: 'Link Documento 2' },
      { id: 'document2ButtonText', type: 'text', name: 'Texto Botão Documento 2' },
      { id: 'document3Title', type: 'text', name: 'Título Documento 3' },
      { id: 'document3Image', type: 'text', name: 'Imagem Documento 3' },
      { id: 'document3Link', type: 'link', name: 'Link Documento 3' },
      { id: 'document3ButtonText', type: 'text', name: 'Texto Botão Documento 3' },
      { id: 'document4Title', type: 'text', name: 'Título Documento 4' },
      { id: 'document4Image', type: 'text', name: 'Imagem Documento 4' },
      { id: 'document4Link', type: 'link', name: 'Link Documento 4' },
      { id: 'document4ButtonText', type: 'text', name: 'Texto Botão Documento 4' },
      { id: 'testimonialsTitle', type: 'text', name: 'Título dos Depoimentos' },
      { id: 'testimonialsSubtitle', type: 'text', name: 'Subtítulo dos Depoimentos' },
      { id: 'testimonial1Name', type: 'text', name: 'Nome Depoimento 1' },
      { id: 'testimonial1Avatar', type: 'text', name: 'Avatar Depoimento 1' },
      { id: 'testimonial1Location', type: 'text', name: 'Localidade Depoimento 1' },
      { id: 'testimonial1Text', type: 'text', name: 'Texto Depoimento 1' },
      { id: 'testimonial2Name', type: 'text', name: 'Nome Depoimento 2' },
      { id: 'testimonial2Avatar', type: 'text', name: 'Avatar Depoimento 2' },
      { id: 'testimonial2Location', type: 'text', name: 'Localidade Depoimento 2' },
      { id: 'testimonial2Text', type: 'text', name: 'Texto Depoimento 2' },
      { id: 'testimonial3Name', type: 'text', name: 'Nome Depoimento 3' },
      { id: 'testimonial3Avatar', type: 'text', name: 'Avatar Depoimento 3' },
      { id: 'testimonial3Location', type: 'text', name: 'Localidade Depoimento 3' },
      { id: 'testimonial3Text', type: 'text', name: 'Texto Depoimento 3' },
      { id: 'testimonial4Name', type: 'text', name: 'Nome Depoimento 4' },
      { id: 'testimonial4Avatar', type: 'text', name: 'Avatar Depoimento 4' },
      { id: 'testimonial4Location', type: 'text', name: 'Localidade Depoimento 4' },
      { id: 'testimonial4Text', type: 'text', name: 'Texto Depoimento 4' },
      { id: 'testimonial5Name', type: 'text', name: 'Nome Depoimento 5' },
      { id: 'testimonial5Avatar', type: 'text', name: 'Avatar Depoimento 5' },
      { id: 'testimonial5Location', type: 'text', name: 'Localidade Depoimento 5' },
      { id: 'testimonial5Text', type: 'text', name: 'Texto Depoimento 5' },
      { id: 'testimonial6Name', type: 'text', name: 'Nome Depoimento 6' },
      { id: 'testimonial6Avatar', type: 'text', name: 'Avatar Depoimento 6' },
      { id: 'testimonial6Location', type: 'text', name: 'Localidade Depoimento 6' },
      { id: 'testimonial6Text', type: 'text', name: 'Texto Depoimento 6' }
    ]},
    { id: 'Benefits', name: 'Benefícios', elements: [
      { id: 'sectionTitle', type: 'text', name: 'Título da Seção' },
      { id: 'sectionDescription', type: 'text', name: 'Descrição da Seção' },
      { id: 'benefit1Title', type: 'text', name: 'Título do Benefício 1' },
      { id: 'benefit1Description', type: 'text', name: 'Descrição do Benefício 1' },
      { id: 'benefit2Title', type: 'text', name: 'Título do Benefício 2' },
      { id: 'benefit2Description', type: 'text', name: 'Descrição do Benefício 2' },
      { id: 'benefit3Title', type: 'text', name: 'Título do Benefício 3' },
      { id: 'benefit3Description', type: 'text', name: 'Descrição do Benefício 3' },
      { id: 'benefit4Title', type: 'text', name: 'Título do Benefício 4' },
      { id: 'benefit4Description', type: 'text', name: 'Descrição do Benefício 4' },
      { id: 'advantagesTitle', type: 'text', name: 'Título das Vantagens' },
      { id: 'advantagesDescription', type: 'text', name: 'Descrição das Vantagens' },
      { id: 'advantage1Title', type: 'text', name: 'Título da Vantagem 1' },
      { id: 'advantage1Subtitle', type: 'text', name: 'Subtítulo da Vantagem 1' },
      { id: 'advantage1Description', type: 'text', name: 'Descrição da Vantagem 1' },
      { id: 'advantage2Title', type: 'text', name: 'Título da Vantagem 2' },
      { id: 'advantage2Subtitle', type: 'text', name: 'Subtítulo da Vantagem 2' },
      { id: 'advantage2Description', type: 'text', name: 'Descrição da Vantagem 2' },
      { id: 'advantage3Title', type: 'text', name: 'Título da Vantagem 3' },
      { id: 'advantage3Subtitle', type: 'text', name: 'Subtítulo da Vantagem 3' },
      { id: 'advantage3Description', type: 'text', name: 'Descrição da Vantagem 3' },
      // Campos da tabela de requisitos - valores
      { id: 'table_tamanho', type: 'text', name: 'Tamanho (Tabela)' },
      { id: 'table_resolucao', type: 'text', name: 'Resolução (Tabela)' },
      { id: 'table_online', type: 'text', name: 'Adequado para envio online (Tabela)' },
      { id: 'table_imprimivel', type: 'text', name: 'Imprimível (Tabela)' },
      { id: 'table_fundo', type: 'text', name: 'Cor do fundo (Tabela)' },
      { id: 'table_altura_cabeca', type: 'text', name: 'Altura da cabeça (Tabela)' },
      { id: 'table_distancia_olhos', type: 'text', name: 'Distância até os olhos (Tabela)' },
      // Campos da tabela de requisitos - títulos
      { id: 'table_titulo_tamanho', type: 'text', name: 'Título: Tamanho' },
      { id: 'table_titulo_resolucao', type: 'text', name: 'Título: Resolução' },
      { id: 'table_titulo_online', type: 'text', name: 'Título: Adequado para envio online' },
      { id: 'table_titulo_imprimivel', type: 'text', name: 'Título: Imprimível' },
      { id: 'table_titulo_fundo', type: 'text', name: 'Título: Cor do fundo' },
      { id: 'table_titulo_parametros', type: 'text', name: 'Título: Parâmetros de definição' },
      { id: 'table_titulo_altura_cabeca', type: 'text', name: 'Título: Altura da cabeça' },
      { id: 'table_titulo_distancia_olhos', type: 'text', name: 'Título: Distância até os olhos' }
    ]},
    { id: 'HowItWorks', name: 'Como Funciona', elements: [
      { id: 'sectionTitle', type: 'text', name: 'Título da Seção' },
      { id: 'sectionSubtitle', type: 'text', name: 'Subtítulo da Seção' },
      { id: 'step1Title', type: 'text', name: 'Título do Passo 1' },
      { id: 'step1Description', type: 'text', name: 'Descrição do Passo 1' },
      { id: 'step2Title', type: 'text', name: 'Título do Passo 2' },
      { id: 'step2Description', type: 'text', name: 'Descrição do Passo 2' },
      { id: 'step3Title', type: 'text', name: 'Título do Passo 3' },
      { id: 'step3Description', type: 'text', name: 'Descrição do Passo 3' }
    ]},
    { id: 'PhotoTutorial', name: 'Tutorial de Fotos', elements: [
      { id: 'title', type: 'text', name: 'Título da Seção' },
      { id: 'description', type: 'text', name: 'Descrição' },
      { id: 'ctaButtonText', type: 'text', name: 'Texto do Botão' },
      { id: 'ctaButtonLink', type: 'link', name: 'Link do Botão' },
      { id: 'step1Title', type: 'text', name: 'Título do Passo 1' },
      { id: 'step1Description', type: 'text', name: 'Descrição do Passo 1' },
      { id: 'step2Title', type: 'text', name: 'Título do Passo 2' },
      { id: 'step2Description', type: 'text', name: 'Descrição do Passo 2' },
      { id: 'step3Title', type: 'text', name: 'Título do Passo 3' },
      { id: 'step3Description', type: 'text', name: 'Descrição do Passo 3' }
    ]},
    { id: 'FAQ', name: 'Perguntas Frequentes', elements: [
      { id: 'sectionTag', type: 'text', name: 'Título Tag' },
      { id: 'sectionTitle', type: 'text', name: 'Título da Seção' },
      { id: 'ctaButtonText', type: 'text', name: 'Texto do Botão' },
      { id: 'ctaButtonLink', type: 'link', name: 'Link do Botão' },
      { id: 'question1', type: 'text', name: 'Pergunta 1' },
      { id: 'answer1', type: 'text', name: 'Resposta 1' },
      { id: 'question2', type: 'text', name: 'Pergunta 2' },
      { id: 'answer2', type: 'text', name: 'Resposta 2' },
      { id: 'question3', type: 'text', name: 'Pergunta 3' },
      { id: 'answer3', type: 'text', name: 'Resposta 3' },
      { id: 'question4', type: 'text', name: 'Pergunta 4' },
      { id: 'answer4', type: 'text', name: 'Resposta 4' },
      { id: 'question5', type: 'text', name: 'Pergunta 5' },
      { id: 'answer5', type: 'text', name: 'Resposta 5' },
      { id: 'question6', type: 'text', name: 'Pergunta 6' },
      { id: 'answer6', type: 'text', name: 'Resposta 6' },
      { id: 'question7', type: 'text', name: 'Pergunta 7' },
      { id: 'answer7', type: 'text', name: 'Resposta 7' }
    ]},
    { id: 'Footer', name: 'Rodapé', elements: [
      { id: 'copyrightText', type: 'text', name: 'Texto de Copyright' },
      { id: 'resourcesTitle', type: 'text', name: 'Título Coluna Recursos' },
      { id: 'documentsTitle', type: 'text', name: 'Título Coluna Documentos' },
      { id: 'usefulLinksTitle', type: 'text', name: 'Título Coluna Links Úteis' },
      
      { id: 'resource1Text', type: 'text', name: 'Texto Recurso 1' },
      { id: 'resource1Url', type: 'link', name: 'URL Recurso 1' },
      { id: 'resource2Text', type: 'text', name: 'Texto Recurso 2' },
      { id: 'resource2Url', type: 'link', name: 'URL Recurso 2' },
      { id: 'resource3Text', type: 'text', name: 'Texto Recurso 3' },
      { id: 'resource3Url', type: 'link', name: 'URL Recurso 3' },
      { id: 'resource4Text', type: 'text', name: 'Texto Recurso 4' },
      { id: 'resource4Url', type: 'link', name: 'URL Recurso 4' },
      { id: 'resource5Text', type: 'text', name: 'Texto Recurso 5' },
      { id: 'resource5Url', type: 'link', name: 'URL Recurso 5' },
      
      { id: 'document1Text', type: 'text', name: 'Texto Documento 1' },
      { id: 'document1Url', type: 'link', name: 'URL Documento 1' },
      { id: 'document2Text', type: 'text', name: 'Texto Documento 2' },
      { id: 'document2Url', type: 'link', name: 'URL Documento 2' },
      { id: 'document3Text', type: 'text', name: 'Texto Documento 3' },
      { id: 'document3Url', type: 'link', name: 'URL Documento 3' },
      { id: 'document4Text', type: 'text', name: 'Texto Documento 4' },
      { id: 'document4Url', type: 'link', name: 'URL Documento 4' },
      { id: 'document5Text', type: 'text', name: 'Texto Documento 5' },
      { id: 'document5Url', type: 'link', name: 'URL Documento 5' },
      
      { id: 'useful1Text', type: 'text', name: 'Texto Link Útil 1' },
      { id: 'useful1Url', type: 'link', name: 'URL Link Útil 1' },
      { id: 'link1Text', type: 'text', name: 'Texto Link 1' },
      { id: 'link1Url', type: 'link', name: 'URL Link 1' },
      { id: 'link2Text', type: 'text', name: 'Texto Link 2' },
      { id: 'link2Url', type: 'link', name: 'URL Link 2' },
      { id: 'useful4Text', type: 'text', name: 'Texto Link Útil 4' },
      { id: 'useful4Url', type: 'link', name: 'URL Link Útil 4' }
    ]},
    { id: 'StickyCTA', name: 'Botão Flutuante', elements: [
      { id: 'buttonText', type: 'text', name: 'Texto do Botão' },
      { id: 'buttonLink', type: 'link', name: 'Link do Botão' },
      { id: 'gradientStartColor', type: 'text', name: 'Cor Inicial do Gradiente' },
      { id: 'gradientEndColor', type: 'text', name: 'Cor Final do Gradiente' },
      { id: 'topLineColor', type: 'text', name: 'Cor da Linha Superior' },
      { id: 'backgroundColor', type: 'text', name: 'Cor de Fundo' }
    ]}
  ];
}

// Obter componentes disponíveis para produtos (exclui o Header)
export function getAvailableProductComponents() {
  const standardComponents = getAvailableComponents().filter(component => 
    !['Header', 'StickyCTA', 'HowItWorks', 'Footer', 'FAQ', 'DocumentSelect', 'PhotoTutorial'].includes(component.id)
  );
  
  // Adicionar componente PassportGuide apenas para produtos
  const passportGuideComponent = {
    id: 'PassportGuide',
    name: 'Guia de Passaporte',
    elements: [
      { id: 'html_content', type: 'html', name: 'Conteúdo HTML Completo' }
    ]
  };
  
  // Adicionar o componente PassportGuide ao array
  return [...standardComponents, passportGuideComponent];
}

// Obter valores padrão para componentes de página
export function getDefaultPageContent() {
  return {
    HeroSection: {
      mainTitle: 'Fotos de Documentos Profissionais',
      mainSubtitle: 'Crie fotos para documentos em segundos com IA',
      ctaButton: 'Comece Agora',
      ctaButtonLink: '/upload',
      ratingText: '4.9 (6.493 avaliações)',
      usersText: 'Mais de 200 mil usuários satisfeitos'
    },
    Header: {
      howItWorksText: 'Como funciona?',
      howItWorksLink: '/#how-it-works',
      documentsText: 'Documentos populares',
      questionsText: 'Dúvidas?',
      questionsLink: '/#faq',
      ctaButtonText: 'Escolha o documento',
      ctaButtonLink: '/upload'
    },
    DocumentSelect: {
      sectionTitle: 'Escolha o documento',
      viewMoreButtonText: 'Ver mais documentos',
      viewMoreButtonLink: '/ver-todos-documentos',
      document1Title: 'Passaporte Brasileiro',
      document1Image: '/images/passaportebrasil.png',
      document1Link: '/pt-br/foto-passaporte',
      document1ButtonText: 'Iniciar',
      document2Title: 'RG Brasileiro',
      document2Image: '/images/passaportebrasil.png',
      document2Link: '/pt-br/foto-rg',
      document2ButtonText: 'Iniciar',
      document3Title: 'Passaporte Bebê',
      document3Image: '/images/passaportebrasil.png',
      document3Link: '/pt-br/foto-passaporte-bebe',
      document3ButtonText: 'Iniciar',
      document4Title: 'CNH Brasileira',
      document4Image: '/images/passaportebrasil.png',
      document4Link: '/pt-br/foto-cnh',
      document4ButtonText: 'Iniciar',
      testimonialsTitle: 'Clientes Reais, Histórias Reais.',
      testimonialsSubtitle: 'Veja o que nossos clientes estão falando e como Photo ID ajudou a aprovar seus vistos com nossas fotos.',
      testimonial1Name: 'Fernando Lima',
      testimonial1Avatar: '/images/avt3.png',
      testimonial1Location: '',
      testimonial1Text: 'Nunca pensei que tirar foto para passaporte seria tão simples! Em apenas alguns minutos consegui fazer minha foto digital em casa.',
      testimonial2Name: 'Roberto Barros',
      testimonial2Avatar: '/images/avt2.png',
      testimonial2Location: 'Santa Catarina - SC',
      testimonial2Text: 'Estava com receio de usar um serviço online, mas fiquei impressionada com a qualidade e rapidez na entrega. Recomendo!',
      testimonial3Name: 'Vânia Santana',
      testimonial3Avatar: '/images/avt1.png',
      testimonial3Location: 'Campinas - SC',
      testimonial3Text: 'Usei o PhotoID para tirar a foto do passaporte dos meus filhos. Incrível como o resultado ficou profissional e foi aceito sem problemas.',
      testimonial4Name: 'Carlos Andrade',
      testimonial4Avatar: '/images/testimonial-placeholder-c.png',
      testimonial4Location: 'Rio de Janeiro - RJ',
      testimonial4Text: 'Processo muito intuitivo e o suporte foi ágil quando precisei. A foto ficou ótima e atendeu todas as exigências.',
      testimonial5Name: 'Beatriz Costa',
      testimonial5Avatar: '/images/testimonial-placeholder-b.png',
      testimonial5Location: 'Belo Horizonte - MG',
      testimonial5Text: 'Excelente! Economizei tempo e evitei filas. A qualidade da foto digital é perfeita para documentos oficiais.',
      testimonial6Name: 'Paulo Mendes',
      testimonial6Avatar: '/images/testimonial-placeholder-p.png',
      testimonial6Location: 'Salvador - BA',
      testimonial6Text: 'Serviço fantástico! Consegui a foto para minha CNH rapidamente e sem sair de casa. Recomendo a todos.'
    },
    Benefits: {
      sectionTitle: 'Principais benefícios de usar<br />nossa ferramenta de foto<br />para passaporte',
      sectionDescription: 'Fique à vontade em casa, pegue seu celular e tire algumas fotos. Termine com um resultado com o qual você esteja 100% satisfeito!',
      benefit1Title: 'Independência',
      benefit1Description: 'Não há necessidade de dirigir ou esperar na fila. Tire uma boa onde quer que você esteja, usando apenas seu telefone.',
      benefit2Title: 'Serviço confiável',
      benefit2Description: 'Mais de um milhão de usuários em todo o mundo. Fotos para passaporte e milhões de documentos gerados no TrustPilot.',
      benefit3Title: 'Suporte profissional',
      benefit3Description: 'Perguntas ou dúvidas sobre suas fotos? Nossos especialistas em fotografia e agentes de suporte estão prontos em ajudá-lo.',
      benefit4Title: 'Garantia de aceitação',
      benefit4Description: 'Depois que você fizer o pedido, nossa IA e um especialista humano verificarão sua foto para garantir que ela esteja 100% em conformidade.',
      advantagesTitle: 'Vantagens de usar a PhotoID',
      advantagesDescription: 'Nós verificamos e garantimos que ela passe em todos os testes de conformidade.',
      advantage1Title: 'Foto em',
      advantage1Subtitle: '3 segundos',
      advantage1Description: 'Tire sua foto em casa, sem esperar em filas ou se locomover até o local.',
      advantage2Title: 'Serviço',
      advantage2Subtitle: 'profissional',
      advantage2Description: 'Tecnologia IA + feedback instantâneo e profissional.',
      advantage3Title: '100% em',
      advantage3Subtitle: 'confirmidade',
      advantage3Description: 'Garante que sua foto será aceita conforme diretrizes e legislação.'
    },
    HowItWorks: {
      sectionTitle: 'Como Funciona o PhotoID',
      sectionSubtitle: 'Tire a foto biométrica perfeita para passaporte em menos de 30 segundos!',
      step1Title: 'Tire ou carregue uma foto',
      step1Description: 'Use uma foto que você já tem ou tire uma nova. Nós verificaremos e garantimos que ela passe em todos os testes de conformidade.',
      step2Title: 'Ajustamos a sua foto com IA',
      step2Description: 'Nosso sistema de IA cortará, redimensionará e ajustará o fundo da sua imagem.',
      step3Title: 'Verificação especializada',
      step3Description: 'Nossa IA analisará cuidadosamente sua foto de passaporte, fornecendo feedback em menos de um minuto!'
    },
    PhotoTutorial: {
      title: 'Como tirar uma foto para documento<br />em casa usando seu celular',
      description: 'Siga estas diretrizes para criar a foto perfeita para passaporte.',
      ctaButtonText: 'Escolha o documento',
      ctaButtonLink: '/upload',
      step1Title: 'Mantenha uma distância segura',
      step1Description: 'Mantenha sua câmera frontal a 40-50 cm de distância do rosto. Para câmeras traseiras, mantenha uma distância de 1-2 metros.',
      step2Title: 'Mantenha a cabeça e o corpo retos',
      step2Description: 'Olhe diretamente para a câmera e evite inclinar seu corpo. Lembre-se de manter uma expressão neutra ao tirar a foto.',
      step3Title: 'Prepare uma boa iluminação',
      step3Description: 'Tire suas fotos para passaporte em um ambiente com luz do dia, como perto de uma janela em um dia ensolarado.'
    },
    FAQ: {
      sectionTag: 'FAQ',
      sectionTitle: 'Tire suas dúvidas nas perguntas frequentes',
      ctaButtonText: 'Escolha o documento',
      ctaButtonLink: '/upload',
      question1: 'O PhotoID está em conformidade com os requisitos de fotos para passaporte Brasileiro?',
      answer1: 'Sim, nosso serviço está totalmente em conformidade com todos os requisitos oficiais para fotos de passaporte brasileiro. Garantimos que suas fotos serão aceitas pelas autoridades.',
      question2: 'E quanto a outros documentos de identificação com foto e papel?',
      answer2: 'Nosso serviço suporta vários tipos de documentos, incluindo RG, CNH, vistos, carteiras profissionais e outros documentos de identificação com foto. Temos padrões específicos para cada tipo de documento.',
      question3: 'Onde posso imprimir as fotos do meu passaporte?',
      answer3: 'Você pode imprimir suas fotos em qualquer gráfica, papelaria ou loja de fotografia. Fornecemos arquivos em alta resolução que podem ser impressos no formato correto para seu documento.',
      question4: 'O que está incluso na garantia pós-projeto?',
      answer4: 'Nossa garantia inclui o compromisso de que suas fotos serão aceitas pelas autoridades. Se sua foto for rejeitada por qualquer razão técnica que seja nossa responsabilidade, oferecemos reembolso total ou fazemos os ajustes necessários gratuitamente.',
      question5: 'O que é um criador de foto para passaporte?',
      answer5: 'Um criador de foto para passaporte é uma ferramenta que permite que você tire, ajuste e prepare fotos que atendam aos requisitos específicos de documentos oficiais, como passaportes, vistos e outros documentos de identificação.',
      question6: 'O PhotoID é seguro?',
      answer6: 'Sim, o PhotoID é 100% seguro. Utilizamos conexões criptografadas para transferência de dados e não armazenamos suas fotos permanentemente após o processamento. Sua privacidade e segurança são nossas prioridades.',
      question7: 'Como funciona o processo de compra?',
      answer7: 'O processo é simples: faça o upload de sua foto, nossa IA ajustará automaticamente para atender aos requisitos, você receberá uma versão prévia para aprovação e, após o pagamento, receberá os arquivos finais em alta resolução prontos para impressão.'
    },
    Footer: {
      copyrightText: '© 2024 PhotoID. Todos os direitos reservados.',
      resourcesTitle: 'Recursos',
      documentsTitle: 'Documentos',
      usefulLinksTitle: 'Links Úteis',
      
      resource1Text: 'Guia de Uso',
      resource1Url: '/guia',
      resource2Text: 'Tutoriais',
      resource2Url: '/tutoriais',
      resource3Text: 'Suporte',
      resource3Url: '/suporte',
      resource4Text: 'Treinamento',
      resource4Url: '/treinamento',
      resource5Text: 'FAQ',
      resource5Url: '/faq',
      
      document1Text: 'Termos de Uso',
      document1Url: '/termos',
      document2Text: 'Política de Privacidade',
      document2Url: '/privacidade',
      document3Text: 'Licença',
      document3Url: '/licenca',
      document4Text: 'Certificações',
      document4Url: '/certificacoes',
      document5Text: 'Conformidade',
      document5Url: '/conformidade',
      
      useful1Text: 'Blog',
      useful1Url: '/blog',
      link1Text: 'Contato',
      link1Url: '/contato',
      link2Text: 'Sobre nós',
      link2Url: '/sobre',
      useful4Text: 'Parceiros',
      useful4Url: '/parceiros'
    },
    StickyCTA: {
      buttonText: 'Escolha o documento',
      buttonLink: '/upload',
      gradientStartColor: '#6A0FDA',
      gradientEndColor: '#B45DEB',
      topLineColor: 'linear-gradient(to right, #6A0FDA, #B45DEB)',
      backgroundColor: '#F1F6FA'
    }
  };
}

// Obter valores padrão para componentes de produto
export function getDefaultProductContent() {
  return {
    HeroSection: {
      mainTitle: 'Foto para Passaporte',
      mainSubtitle: 'Fotos perfeitas para seu passaporte em minutos',
      ctaButton: 'Criar Foto de Passaporte',
      ctaButtonLink: '/upload',
      secondaryButton: 'Faça o upload da sua imagem',
      secondaryButtonLink: '/upload',
      ratingText: '4.9 (6.493 avaliações)',
      usersText: 'Mais de 200 mil usuários satisfeitos'
    },
    Header: {
      howItWorksText: 'Como funciona?',
      howItWorksLink: '/#how-it-works',
      documentsText: 'Documentos populares',
      questionsText: 'Dúvidas?',
      questionsLink: '/#faq',
      ctaButtonText: 'Escolha o documento',
      ctaButtonLink: '/upload'
    },
    Benefits: {
      sectionTitle: 'Fotos para o passaporte Brasileiro',
      sectionDescription: 'Para solicitar um passaporte brasileiro, a foto deve atender aos seguintes requisitos:',
      benefit1Title: 'Conforme Padrões Oficiais',
      benefit1Description: 'Atende a todos os requisitos de tamanho e formato',
      advantage1Title: 'Foto em',
      advantage1Subtitle: '3 segundos',
      advantage1Description: 'Tire sua foto em casa, sem esperar em filas ou se locomover até o local.',
      advantage2Title: 'Serviço',
      advantage2Subtitle: 'profissional',
      advantage2Description: 'Tecnologia IA + feedback instantâneo e profissional.',
      advantage3Title: '100% em',
      advantage3Subtitle: 'confirmidade',
      advantage3Description: 'Garante que sua foto será aceita conforme diretrizes e legislação.',
      // Valores da tabela
      table_tamanho: '5,08 cm x 5,08 cm',
      table_resolucao: '300 dpi',
      table_online: 'Sim',
      table_imprimivel: 'Sim',
      table_fundo: 'Branco',
      table_altura_cabeca: '1.29 polegada → 3.28 cm',
      table_distancia_olhos: '1.18 polegada → 3.00 cm',
      // Títulos da tabela
      table_titulo_tamanho: 'Tamanho',
      table_titulo_resolucao: 'Resolução',
      table_titulo_online: 'É adequado para envio on-line?',
      table_titulo_imprimivel: 'É imprimível?',
      table_titulo_fundo: 'Cor do fundo',
      table_titulo_parametros: 'Parâmetros de definição de imagem',
      table_titulo_altura_cabeca: 'Altura da cabeça:',
      table_titulo_distancia_olhos: 'Do fundo da foto até a linha dos olhos:'
    },
    HowItWorks: {
      sectionTitle: 'Como Obter sua Foto de Passaporte',
      step1Title: 'Faça upload da sua foto',
      step1Description: 'Use uma selfie ou foto existente',
      step2Title: 'Nossa IA ajusta tudo',
      step2Description: 'Formato, tamanho e fundo são ajustados automaticamente',
      step3Title: 'Baixe o resultado',
      step3Description: 'Sua foto estará pronta para impressão ou envio digital'
    },
    PassportGuide: {
      html_content: `<section class="relative bg-white font-montserrat">
        <!-- Gradient overlay -->
        <div 
          class="absolute top-0 left-0 right-0 h-[300px] bg-gradient-to-b from-[#D1E6F8] to-white"
          style="z-index: 0"
        ></div>
        
        <div class="relative max-w-4xl mx-auto px-4 pt-[120px]" style="z-index: 1">
          <h1 class="text-3xl font-bold mb-6">Gerador de fotos de passaporte</h1>
          
          <p class="text-gray-600 mb-8">
            Em algum ponto da nossa vida, todos nós precisamos de uma foto para o passaporte. Agora você não precisa mais se estressar ou procurar os serviços de uma fotografia profissional para obter essas fotos. Uma solução mais fácil é simplesmente você aproveitar e utilizar o nosso verificador e ajustador de fotos online, que verifica e ajusta a mesma à especificações corretas. É mais rápido e barato.
          </p>

          <p class="text-gray-600 mb-8">
            Neste artigo você encontrará informações relevantessobre:
          </p>

          <ul class="list-disc pl-6 mb-12 text-gray-600">
            <li>os requisitos da foto para o passaporte brasileiro</li>
            <li>como tirar uma foto perfeita para o passaporte do visto em casa</li>
            <li>qual tipo de roupa você deve usar quando tirar a foto para o passaporte</li>
            <li>erros comuns cometidos</li>
          </ul>

          <h2 class="text-2xl font-bold mb-4">Fotos para o passaporte</h2>
          <p class="text-gray-600 mb-8">
            Hoje em dia são utilizadas fotos biométricas na maioria dos documentos de identificação. A pessoa deve estar posicionada em frente à câmera e olhar diretamente para a lente. Não pode sorrir, pois deve manter uma expressão facial neutra. Uma foto para um passaporte brasileiro deve ter 5x7 cm.
          </p>
          <p class="text-gray-600 mb-8">
            A foto deve ser tirada a cores com fundo branco. Todo o seu rosto deve estar bem visível, ou seja, o uso de óculos não é permitido. O uso de lenços por motivos religiosos é permitido. Precisa garantir uma boa iluminação no seu rosto, não pode conter um fundo preto.
          </p>

          <h2 class="text-2xl font-bold mb-4">Fotos para o visto</h2>
          <p class="text-gray-600 mb-8">
            Em algum ponto da nossa vida, todos nós precisamos de uma foto para o passaporte. Não precisa de solicitar os serviços de uma fotografo profissional para obter tal foto. Uma solução mais fácil é pedir a alguém que tire uma foto sua utilizando o nosso verificador e validador de fotos online, que verifica e ajusta a mesma à especificação do Brasil. É mais rápido e barato.
          </p>

          <h2 class="text-2xl font-bold mb-4">Fotos para a CNH</h2>
          <p class="text-gray-600 mb-8">
            Você não precisa ir a um estúdio para tirar foto biométrica, a foto do fotógrafo é exigida onde quer que precise ou carteira de motorista. A nossa ferramenta fotográfica irá ajudá-lo a tirar uma foto para CNH ou acordo com os requisitos oficiais de uma grande variedade de países. Pode o alguém que tem uma foto para o e entregá-la no aplicativo. Finalizamos-lhe a mesma para o uso em até nem curto espaço de tempo.
          </p>

          <h2 class="text-2xl font-bold mb-4">Fotos para o RG e outros documentos</h2>
          <p class="text-gray-600 mb-8">
            No longo da sua vida, irá sem dúvida precisar de uma foto para o seu RG, carteira de estudante, carteira de trabalho ou outro tipo de documento. Muitas pessoas acabar de ter medo de não respeitar os requisitos, também tirar a foto em casa o que é uma ótima ideia! Em primeiro lugar, veja se o tipo de foto que precisa e pergunta a alguém que tire a mesma por si. A seguir, carregue a foto no nosso editor e o qual adapta a foto aos requisitos oficiais de determinado país.
          </p>

          <h2 class="text-2xl font-bold mb-4">Como tirar uma foto perfeita para o passaporte em casa?</h2>
          <p class="text-gray-600 mb-8">
            Se decidir tirar uma fotografia para o seu passaporte em casa, deve ter este guia, pois irá ajudá-lo a tirar uma foto perfeita:
          </p>

          <div class="space-y-6 mb-12">
            <div class="flex items-start gap-4">
              <div 
                class="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center"
                style="width: 32px; height: 32px; background-color: #F3E8FF; color: #9333EA"
              >
                <span class="font-semibold text-base">1</span>
              </div>
              <p class="text-gray-600 flex-grow">Peça a alguém para tirar a foto por si. Não tire uma selfie, pois resultará na rejeição da foto pelas autoridades.</p>
            </div>
            <div class="flex items-start gap-4">
              <div 
                class="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center"
                style="width: 32px; height: 32px; background-color: #F3E8FF; color: #9333EA"
              >
                <span class="font-semibold text-base">2</span>
              </div>
              <p class="text-gray-600 flex-grow">Escolha um lugar em casa onde há uma boa iluminação. Mantenha-se a cerca de 0,5m da parede e a 1,5m da máquina fotográfica.</p>
            </div>
            <div class="flex items-start gap-4">
              <div 
                class="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center"
                style="width: 32px; height: 32px; background-color: #F3E8FF; color: #9333EA"
              >
                <span class="font-semibold text-base">3</span>
              </div>
              <p class="text-gray-600 flex-grow">A foto deve ser tirada de frente e deve olhar diretamente para a câmera. Não incline a sua cabeça. Mantenha os olhos abertos e a boca fechada e uma expressão facial neutra. O seu rosto deve estar visível a 100%.</p>
            </div>
            <div class="flex items-start gap-4">
              <div 
                class="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center"
                style="width: 32px; height: 32px; background-color: #F3E8FF; color: #9333EA"
              >
                <span class="font-semibold text-base">4</span>
              </div>
              <p class="text-gray-600 flex-grow">Escolha a foto que mais lhe agrada e carregue-a na nossa ferramenta, a qual irá adaptar a foto aos requisitos oficiais. Uma foto perfeita é enviada para o seu email, pronta a ser usada.</p>
            </div>
          </div>

          <h2 class="text-2xl font-bold mb-4">Que tipo de roupa devo usar quando tiro uma foto para o passaporte brasileiro?</h2>
          <p class="text-gray-600 mb-8">
            Um vestuário que deve respeitar é o fundo branco, ou seja, deve evitar usar roupas brancas pois poderá causar confusão. Deve também evitar o uso de roupa escura, roupas com motivos ou roupa com duas ou três cores.
          </p>

          <h2 class="text-2xl font-bold mb-4">Os erros mais comuns nas fotos de passaporte</h2>
          <p class="text-gray-600 mb-4">
            Existem alguns erros comuns que deve evitar. Se estiver a pensar tirar uma foto para o passaporte na rede em casa, leia isto cuidadosamente:
          </p>

          <ul class="list-disc pl-6 mb-12 text-gray-600">
            <li><span class="font-semibold">Má postura</span> - Fotos não biométricas deve mostrar uma expressão facial neutra.</li>
            <li><span class="font-semibold">A foto tirada há muito tempo antes de solicitar o documento</span> - Não use uma mudança visível na sua aparência.</li>
            <li><span class="font-semibold">Baixa resolução e má qualidade é um erro comum</span> - A foto não pode estar pixelada, desfocada ou deficiente.</li>
            <li><span class="font-semibold">Não respeito às dúvidas</span> - Não tire a foto para o passaporte brasileiro.</li>
            <li><span class="font-semibold">Formato ou dimensões incorretas</span> - Existem requisitos especificamente às dimensões da foto para o passaporte brasileiro. Deve ter 5x7cm.</li>
          </ul>

          <h2 class="text-2xl font-bold mb-4">Ferramenta de foto para passaporte</h2>
          <p class="text-gray-600 mb-8">
            O nosso aplicativo de passaporte em linha ajudá-lo com a fotografia para o passaporte. Use as regras que deve seguir após utilização da foto em fotos compatíveis. Carregue a mesma no nosso aplicativo e aguarde um momento. Durante esse tempo, a ferramenta:
          </p>

          <ul class="list-disc pl-6 mb-12 text-gray-600">
            <li>ajustará o tamanho da foto até aos requisitos oficiais, ajustando a resolução e as dimensões;</li>
            <li>substituirá o fundo por um adequado;</li>
            <li>testará a qualidade e fotografia de forma a que a sua a seu rosto esteja centrado;</li>
            <li>verifica se a foto está de acordo com os requisitos oficiais - utilizando a melhor-a verificar, isto permite à ferramenta ver se existe qualquer tipo de serviços na foto, se a mesma está centrada (não tem ruído), se olhos bem visíveis, e muito mais.</li>
          </ul>

          <h2 class="text-2xl font-bold mb-4">Aplicativo de foto para passaporte para iPhone</h2>
          <p class="text-gray-600 mb-8">
            Se você um iPhone e precisa de uma foto para o passaporte, prepare-se para o sistema operativo iOS. Se a sua não é conveniente, de acordo com todos tem requisitos, não tem direito à verificação. Você pode resolver isso em casa. A foto pode também ser com o seu para os seus documentos de identificação a um preço acessível. Para se no App Store e faça download do aplicativo para seu iPhone.
          </p>

          <h2 class="text-2xl font-bold mb-4">Aplicação de foto para passaporte para Android</h2>
          <p class="text-gray-600 mb-8">
            Se tem um smartphone com sistema operativo Android, como por exemplo um Samsung, Huawei, HTC, Sony, Motorola ou outros modelos, pode utilizar o aplicativo passaporte grátis para obter uma foto profissional para o seu passaporte! Clique se no Google Store e descarregue o aplicativo na hora, na sua Android.
          </p>

          <h2 class="text-2xl font-bold mb-4">5 razões pelas quais a ferramenta de fotografia é a melhor opção para tirar fotos para o passaporte</h2>
          <p class="text-gray-600 mb-4">
            A nossa ferramenta pode pode-lhes tirar uma foto para os seus documentos em casa utilizando o nosso aplicativo:
          </p>

          <ul class="list-disc pl-6 mb-12 text-gray-600">
            <li><span class="font-semibold">É super fácil de usar</span> e não tem de sair de casa;</li>
            <li><span class="font-semibold">Pode tirar uma quantidade ilimitada de fotos</span> o que lhe permite escolher a melhor;</li>
            <li><span class="font-semibold">Qualidade profissional</span> verifica se a foto está de acordo com os requisitos do aplicativo país;</li>
            <li><span class="font-semibold">Poupa tempo e dinheiro</span></li>
            <li><span class="font-semibold">Garantimos que a sua foto</span> será aceite pelas autoridades.</li>
          </ul>
        </div>
      </section>`
    },
    FAQ: {
      sectionTitle: 'Dúvidas sobre Fotos de Passaporte',
      question1: 'Quais são os requisitos para fotos de passaporte?',
      answer1: 'As fotos devem ter fundo branco, iluminação uniforme e expressão neutra. Nossa IA garante que todos esses requisitos sejam atendidos.',
      question2: 'Posso usar óculos na foto do passaporte?',
      answer2: 'Em geral, não é recomendado usar óculos na foto do passaporte, a menos que haja necessidade médica.',
      question3: 'Quanto tempo a foto de passaporte é válida?',
      answer3: 'A validade da foto depende do país, mas geralmente as fotos devem ser recentes (menos de 6 meses).'
    },
    Footer: {
      copyrightText: '© 2023 SiteID - Todos os direitos reservados',
      link1Text: 'Termos de Uso',
      link1Url: '/termos',
      link2Text: 'Política de Privacidade',
      link2Url: '/privacidade'
    }
  };
}

// Buscar um produto pelo slug e página
export async function getProductBySlug(productSlug: string, pageSlug: string) {
  try {
    // Primeiro, buscar o ID da página
    const { data: pageData, error: pageError } = await supabase
      .from('pages')
      .select('id')
      .eq('slug', pageSlug)
      .single();
    
    if (pageError) {
      console.error('Erro ao buscar página:', pageError);
      return null;
    }
    
    // Depois, buscar o produto usando o ID da página e o slug do produto
    const { data: productData, error: productError } = await supabase
      .from('products')
      .select('*')
      .eq('page_id', pageData.id)
      .eq('slug', productSlug)
      .single();
    
    if (productError) {
      console.error('Erro ao buscar produto:', productError);
      return null;
    }
    
    return productData;
  } catch (err) {
    console.error('Erro ao buscar produto por slug:', err);
    return null;
  }
}

// Buscar customizações de conteúdo para um produto por slug
export async function getProductContentCustomizationsBySlug(productSlug: string, pageSlug: string) {
  try {
    const product = await getProductBySlug(productSlug, pageSlug);
    
    if (!product) {
      return [];
    }
    
    return getProductContentCustomizations(product.id);
  } catch (err) {
    console.error('Erro ao buscar customizações por slug:', err);
    return [];
  }
}

// Funções para configurações do site
export async function getSiteConfig(key: string): Promise<string | null> {
  const { data, error } = await supabase
    .from('site_config')
    .select('value')
    .eq('key', key)
    .single();
  
  if (error || !data) {
    console.error(`Erro ao buscar configuração ${key}:`, error);
    return null;
  }
  
  return data.value;
}

export async function updateSiteConfig(key: string, value: string): Promise<boolean> {
  // Verificar se a configuração já existe
  const { data: existingConfig } = await supabase
    .from('site_config')
    .select('id')
    .eq('key', key)
    .single();
  
  if (existingConfig) {
    // Atualizar configuração existente
    const { error } = await supabase
      .from('site_config')
      .update({ value, updated_at: new Date().toISOString() })
      .eq('key', key);
    
    if (error) {
      console.error(`Erro ao atualizar configuração ${key}:`, error);
      return false;
    }
    
    return true;
  } else {
    // Criar nova configuração
    const { error } = await supabase
      .from('site_config')
      .insert([{ key, value }]);
    
    if (error) {
      console.error(`Erro ao criar configuração ${key}:`, error);
      return false;
    }
    
    return true;
  }
}

// Funções para redirecionamentos por país
export async function getAllCountryRedirects(): Promise<CountryRedirect[]> {
  const { data, error } = await supabase
    .from('country_redirects')
    .select('*')
    .order('country_name', { ascending: true });
  
  if (error) {
    console.error('Erro ao buscar redirecionamentos por país:', error);
    return [];
  }
  
  return data || [];
}

export async function getRedirectForCountry(countryCode: string): Promise<string | null> {
  const { data, error } = await supabase
    .from('country_redirects')
    .select('page_slug')
    .eq('country_code', countryCode)
    .single();
  
  if (error || !data) {
    return null;
  }
  
  return data.page_slug;
}

export async function createOrUpdateCountryRedirect(countryCode: string, countryName: string, pageSlug: string): Promise<boolean> {
  // Verificar se o redirecionamento já existe
  const { data: existingRedirect } = await supabase
    .from('country_redirects')
    .select('id')
    .eq('country_code', countryCode)
    .single();
  
  if (existingRedirect) {
    // Atualizar redirecionamento existente
    const { error } = await supabase
      .from('country_redirects')
      .update({ 
        country_name: countryName, 
        page_slug: pageSlug,
        updated_at: new Date().toISOString() 
      })
      .eq('country_code', countryCode);
    
    if (error) {
      console.error(`Erro ao atualizar redirecionamento para ${countryCode}:`, error);
      return false;
    }
    
    return true;
  } else {
    // Criar novo redirecionamento
    const { error } = await supabase
      .from('country_redirects')
      .insert([{ 
        country_code: countryCode,
        country_name: countryName,
        page_slug: pageSlug
      }]);
    
    if (error) {
      console.error(`Erro ao criar redirecionamento para ${countryCode}:`, error);
      return false;
    }
    
    return true;
  }
}

export async function deleteCountryRedirect(countryCode: string): Promise<boolean> {
  const { error } = await supabase
    .from('country_redirects')
    .delete()
    .eq('country_code', countryCode);
  
  if (error) {
    console.error(`Erro ao excluir redirecionamento para ${countryCode}:`, error);
    return false;
  }
  
  return true;
}

export async function getDefaultInternationalPage(): Promise<string> {
  const defaultPage = await getSiteConfig('default_international_page');
  return defaultPage || 'en-us'; // 'en-us' como fallback se não estiver configurado
} 