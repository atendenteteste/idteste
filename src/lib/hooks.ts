import { useState, useEffect } from 'react';
import { getPageContentCustomizations, getDefaultPageContent, getDefaultProductContent, ContentCustomization, getProductContentCustomizations, getProductContentCustomizationsBySlug } from './supabase';

type ContentRecord = Record<string, Record<string, string>>;

// Cache of content by page slug to avoid repeated fetches
const contentCache: Record<string, ContentRecord> = {};
// Cache of content by product ID to avoid repeated fetches
const productContentCache: Record<string, ContentRecord> = {};

// Hook to use customized content for a page
export function usePageContent(pageSlug: string) {
  const [content, setContent] = useState<ContentRecord>(
    contentCache[pageSlug] || getDefaultPageContent()
  );
  const [loading, setLoading] = useState(!contentCache[pageSlug]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If we already have cached content for this page, use it immediately
    if (contentCache[pageSlug]) {
      setContent(contentCache[pageSlug]);
      setLoading(false);
      return;
    }

    async function loadCustomizations() {
      try {
        setLoading(true);
        // Get default content first
        const defaultContent = getDefaultPageContent();
        
        // Get customizations from Supabase
        const customizations = await getPageContentCustomizations(pageSlug);
        
        // Apply customizations over default content
        const customizedContent: ContentRecord = JSON.parse(JSON.stringify(defaultContent));
        
        customizations.forEach((customization: ContentCustomization) => {
          const { component, element_id, custom_value } = customization;
          
          if (!customizedContent[component]) {
            customizedContent[component] = {};
          }
          
          customizedContent[component][element_id] = custom_value;
        });
        
        // Cache the content for future use
        contentCache[pageSlug] = customizedContent;
        
        setContent(customizedContent);
      } catch (err) {
        console.error('Error loading customizations:', err);
        setError('Failed to load customizations');
      } finally {
        setLoading(false);
      }
    }
    
    loadCustomizations();
  }, [pageSlug]);
  
  return { content, loading, error };
} 

// Hook to use customized content for a product
export function useProductContent(productSlug: string) {
  const [content, setContent] = useState<ContentRecord>(
    productContentCache[productSlug] || getDefaultProductContent()
  );
  const [loading, setLoading] = useState(!productContentCache[productSlug]);
  const [error, setError] = useState<string | null>(null);
  
  // Get current locale from URL
  const getLocale = () => {
    if (typeof window === 'undefined') return 'pt-br';
    
    const path = window.location.pathname;
    if (!path || path === '/') return 'pt-br';
    
    const segments = path.substring(1).split('/');
    return segments[0] || 'pt-br';
  };

  useEffect(() => {
    // If we already have cached content for this product, use it immediately
    if (productContentCache[productSlug]) {
      setContent(productContentCache[productSlug]);
      setLoading(false);
      return;
    }

    async function loadCustomizations() {
      try {
        setLoading(true);
        // Get default content first
        const defaultContent = getDefaultProductContent();
        
        // Get locale from URL
        const locale = getLocale();
        
        // Get customizations from Supabase using the product slug and page slug (locale)
        const customizations = await getProductContentCustomizationsBySlug(productSlug, locale);
        
        // Apply customizations over default content
        const customizedContent: ContentRecord = JSON.parse(JSON.stringify(defaultContent));
        
        customizations.forEach((customization: ContentCustomization) => {
          const { component, element_id, custom_value } = customization;
          
          if (!customizedContent[component]) {
            customizedContent[component] = {};
          }
          
          customizedContent[component][element_id] = custom_value;
        });
        
        // Cache the content for future use
        productContentCache[productSlug] = customizedContent;
        
        setContent(customizedContent);
      } catch (err) {
        console.error('Error loading product customizations:', err);
        setError('Failed to load product customizations');
      } finally {
        setLoading(false);
      }
    }
    
    loadCustomizations();
  }, [productSlug]);
  
  return { content, loading, error };
}

// Hook para usar as customizações de um componente específico
export function useCustomizations(componentId: string) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Obter customizações da página atual
    const loadCustomizations = async () => {
      try {
        setLoading(true);
        
        // Obter o slug da página atual pela URL
        const path = window.location.pathname;
        let pageSlug = 'pt-br';
        
        // Extrair o slug da URL
        if (path.startsWith('/')) {
          // Remover a primeira barra
          const segments = path.substring(1).split('/');
          if (segments.length > 0) {
            // Usar o primeiro segmento como slug
            pageSlug = segments[0];
            
            // Se o primeiro segmento for vazio (URL é apenas "/"), usar padrão
            if (!pageSlug) {
              pageSlug = 'pt-br';
            }
          }
        }
        
        // Obter valores padrão
        const defaultContent = getDefaultPageContent();
        const defaultValues = (defaultContent as Record<string, Record<string, string>>)[componentId] || {};
        
        // Obter customizações do Supabase
        const customizations = await getPageContentCustomizations(pageSlug);
        
        // Filtrar apenas as customizações do componente desejado
        const componentCustomizations = customizations.filter(
          (custom: ContentCustomization) => custom.component === componentId
        );
        
        // Aplicar customizações sobre valores padrão
        const customizedValues = { ...defaultValues };
        
        componentCustomizations.forEach((customization: ContentCustomization) => {
          const { element_id, custom_value } = customization;
          customizedValues[element_id] = custom_value;
        });
        
        setValues(customizedValues);
      } catch (err) {
        console.error('Erro ao carregar customizações:', err);
      } finally {
        setLoading(false);
      }
    };
    
    loadCustomizations();
  }, [componentId]);
  
  return values;
} 