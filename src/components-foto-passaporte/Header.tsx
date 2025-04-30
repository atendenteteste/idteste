"use client"

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getActivePages, getProductsByPageSlug, Page, Product } from '../lib/supabase';
import { usePageContent } from '../lib/hooks';

// Helper function for custom smooth scrolling
const customSmoothScrollTo = (targetY: number, duration: number) => {
  const startY = window.pageYOffset;
  const distanceY = targetY - startY;
  let startTime: number | null = null;

  // Easing function (ease-in-out)
  const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  };

  const animation = (currentTime: number) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const nextY = easeInOutQuad(timeElapsed, startY, distanceY, duration);

    window.scrollTo(0, nextY);

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  };

  requestAnimationFrame(animation);
};

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [pages, setPages] = useState<Page[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [currentLocale, setCurrentLocale] = useState('pt-br');
  const [currentProduct, setCurrentProduct] = useState('foto-passaporte');
  const [isLoading, setIsLoading] = useState(true);
  const [contentReady, setContentReady] = useState(false);

  // Obter a localidade atual e carregar páginas e produtos
  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      setContentReady(false);
      try {
        // Obtém a localidade atual da URL
        const pathname = window.location.pathname;
        const segments = pathname.split('/').filter(Boolean);
        const locale = segments.length > 0 ? segments[0] : 'pt-br';
        setCurrentLocale(locale);
        
        if (segments.length > 1) {
          setCurrentProduct(segments[1]);
        }

        // Carregar páginas ativas do Supabase
        const activePagesData = await getActivePages();
        setPages(activePagesData);

        // Carregar produtos para a localidade atual
        if (locale === 'pt-br') {
          // Para pt-br, não precisamos buscar do banco de dados ainda,
          // pois os produtos estão hardcoded na função getCurrentLocaleProducts
        } else {
          // Para outras localidades, buscar produtos específicos
          const localeProductsData = await getProductsByPageSlug(locale);
          setProducts(localeProductsData);
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  // Get customized content based on the current locale
  const { content, loading } = usePageContent(currentLocale);
  
  // Get Header content with fallback to default values
  const headerContent = content.Header || {
    howItWorksText: 'Como funciona?',
    howItWorksLink: '/#how-it-works',
    documentsText: 'Documentos populares',
    questionsText: 'Dúvidas?',
    questionsLink: '/#faq',
    ctaButtonText: 'Escolha o documento',
    ctaButtonLink: '/upload'
  };
  
  // Marcar como pronto apenas quando o conteúdo for carregado
  useEffect(() => {
    if (!isLoading && !loading) {
      setContentReady(true);
    }
  }, [isLoading, loading]);

  useEffect(() => {
    // Check if we're on mobile and update state
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Close mobile menu when window is resized to desktop size
  useEffect(() => {
    if (!isMobile) {
      setMobileMenuOpen(false);
    }
  }, [isMobile]);

  const handleScrollToFaq = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault(); 
    setDropdownOpen(false); // Close dropdown first
    setMobileMenuOpen(false); // Close mobile menu if open
    const faqElement = document.getElementById('faq');
    if (faqElement) {
      const headerOffset = 80; // Adjust this value based on your header height if needed
      const elementPosition = faqElement.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;
      const finalPosition = offsetPosition + 100; // Add 100px offset
      
      // Use custom scroll function with the adjusted final position
      customSmoothScrollTo(finalPosition, 800); 
    }
  };

  const handleScrollToHowItWorks = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault(); 
    setDropdownOpen(false); // Close dropdown first
    setMobileMenuOpen(false); // Close mobile menu if open
    const howItWorksElement = document.getElementById('how-it-works');
    if (howItWorksElement) {
      const headerOffset = 80; 
      const elementPosition = howItWorksElement.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;
      const finalPosition = offsetPosition + 80; // Add 80px offset
      
      // Use custom scroll function with the adjusted final position
      customSmoothScrollTo(finalPosition, 800); 
    }
  };

  // Filtrar produtos para a localidade atual
  const getCurrentLocaleProducts = () => {
    // Caso especial para pt-br (produtos padrão hardcoded)
    if (currentLocale === 'pt-br') {
      return [
        { slug: 'foto-passaporte', title: 'Foto para Passaporte' },
        { slug: 'foto-rg', title: 'Foto para RG' },
        { slug: 'foto-passaporte-bebe', title: 'Foto de Passaporte Bebê' },
        { slug: 'foto-cnh', title: 'Foto para CNH' }
      ];
    }
    
    // Para outras localidades, usar os produtos carregados do Supabase
    return products.map(p => ({ slug: p.slug, title: p.title }));
  };

  const localeProducts = getCurrentLocaleProducts();

  // Renderizar um header placeholder durante o carregamento
  if (!contentReady && loading) {
    return (
      <header className="relative w-full py-4 md:py-4 px-4 md:px-6 z-50 font-montserrat">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-[85%] md:h-auto">
          {/* Logo placeholder */}
          <div className="relative h-8 md:h-10 w-32 md:w-40 bg-gray-100 animate-pulse rounded"></div>
          
          {/* Desktop Navigation placeholder */}
          <div className="hidden md:flex md:items-center">
            <div className="mr-6 w-24 h-4 bg-gray-100 animate-pulse rounded"></div>
            <div className="mr-6 w-40 h-4 bg-gray-100 animate-pulse rounded"></div>
            <div className="mr-6 w-20 h-4 bg-gray-100 animate-pulse rounded"></div>
            <div className="ml-6 w-40 h-10 bg-gray-100 animate-pulse rounded-full"></div>
          </div>
          
          {/* Mobile menu button placeholder */}
          <div className="md:hidden w-8 h-8 bg-gray-100 animate-pulse rounded"></div>
        </div>
      </header>
    );
  }

  return (
    <header className="relative w-full py-4 md:py-4 px-4 md:px-6 z-50 bg-white shadow-sm font-montserrat">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-[85%] md:h-auto">
        {/* Logo */}
        <Link href={`/${currentLocale}`} className="relative h-8 md:h-10 w-32 md:w-40">
          <Image 
            src="/images/headerlogo.png" 
            alt="photoID" 
            width={144} 
            height={38} 
            className="object-contain" 
          />
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center">
          <Link 
            href={`/${currentLocale}${headerContent.howItWorksLink}`} 
            className="mr-6 text-sm font-medium text-gray-700 hover:text-gray-900"
            onClick={handleScrollToHowItWorks}
          >
            {headerContent.howItWorksText}
          </Link>
          <div className="relative mr-6">
            <button 
              className="text-sm font-medium text-gray-700 hover:text-gray-900 flex items-center gap-1"
              onMouseEnter={() => setDropdownOpen(true)}
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {headerContent.documentsText}
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </button>
            
            {/* Dropdown Menu - Desktop */}
            {dropdownOpen && (
              <>
                {/* Overlay */}
                <div 
                  className="fixed inset-0 top-[80px] bg-black/[0.1] backdrop-blur-[2px] z-40"
                  onClick={() => setDropdownOpen(false)}
                  style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}
                ></div>
                
                {/* Dropdown content */}
                <div 
                  className="absolute left-0 mt-2 w-64 rounded-md shadow-lg bg-white z-50 py-2 border border-gray-100"
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  {isLoading ? (
                    <div className="py-2 px-4 flex justify-center">
                      <div className="w-5 h-5 border-2 border-t-purple-600 border-r-purple-300 border-b-purple-100 border-l-purple-600 rounded-full animate-spin"></div>
                    </div>
                  ) : localeProducts.length > 0 ? (
                    localeProducts.map((product, index) => (
                      <div key={index} className={`py-1 border-l-4 ${currentProduct === product.slug ? 'border-purple-600 bg-purple-50' : 'border-transparent hover:border-purple-600'} transition-all`}>
                        <Link 
                          href={`/${currentLocale}/${product.slug}`} 
                          className={`block px-4 py-3 text-sm ${currentProduct === product.slug ? 'text-purple-700 font-medium' : 'text-gray-700 hover:bg-purple-50'}`}
                        >
                          {product.title}
                        </Link>
                      </div>
                    ))
                  ) : (
                    <div className="py-1">
                      <span className="block px-4 py-3 text-sm text-gray-500">
                        Nenhum produto disponível
                      </span>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
          <Link 
            href={`/${currentLocale}${headerContent.questionsLink}`}
            className="mr-6 text-sm font-medium text-gray-700 hover:text-gray-900"
            onClick={handleScrollToFaq}
          >
            {headerContent.questionsText}
          </Link>

          {/* Button - Right for Desktop */}
          <Link 
            href={headerContent.ctaButtonLink}
            className="px-6 py-2 rounded-full border-2 border-purple-600 text-purple-600 bg-white text-[13px] font-bold tracking-tight hover:bg-purple-600 hover:text-white transition-colors"
          >
            {headerContent.ctaButtonText}
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="sr-only">Abrir menu</span>
          {mobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu - Slide from right to left */}
      <div className={`fixed inset-y-0 right-0 w-64 bg-white shadow-xl transition-transform transform z-50 duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="relative h-8 w-32">
              <Image 
                src="/images/headerlogo.png" 
                alt="photoID" 
                width={120} 
                height={30} 
                className="object-contain" 
              />
            </div>
            <button 
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <nav className="mt-6 space-y-4">
            <Link 
              href={`/${currentLocale}${headerContent.howItWorksLink}`} 
              className="block py-2.5 px-4 rounded text-base font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-600"
              onClick={handleScrollToHowItWorks}
            >
              {headerContent.howItWorksText}
            </Link>
            
            <div>
              <button 
                className="flex w-full items-center justify-between py-2.5 px-4 rounded text-base font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span>{headerContent.documentsText}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transform transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}>
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </button>
              
              {/* Mobile Dropdown Items */}
              {dropdownOpen && (
                <div className="pl-4 mt-2 space-y-2">
                  {isLoading ? (
                    <div className="py-2 px-4 flex justify-center">
                      <div className="w-5 h-5 border-2 border-t-purple-600 border-r-purple-300 border-b-purple-100 border-l-purple-600 rounded-full animate-spin"></div>
                    </div>
                  ) : localeProducts.length > 0 ? (
                    localeProducts.map((product, index) => (
                      <Link 
                        key={index}
                        href={`/${currentLocale}/${product.slug}`}
                        className={`block py-2 px-4 text-sm ${currentProduct === product.slug ? 'text-purple-700 font-medium' : 'text-gray-700 hover:text-purple-600'}`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {product.title}
                      </Link>
                    ))
                  ) : (
                    <span className="block py-2 px-4 text-sm text-gray-500">
                      Nenhum produto disponível
                    </span>
                  )}
                </div>
              )}
            </div>
            
            <Link 
              href={`/${currentLocale}${headerContent.questionsLink}`}
              className="block py-2.5 px-4 rounded text-base font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-600"
              onClick={handleScrollToFaq}
            >
              {headerContent.questionsText}
            </Link>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <Link 
                href={headerContent.ctaButtonLink}
                className="block w-full py-3 px-4 rounded-full bg-purple-600 text-white text-center font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {headerContent.ctaButtonText}
              </Link>
            </div>
          </nav>
        </div>
      </div>

      {/* Overlay when mobile menu is open */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/[0.3] backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}

      {/* Language Selector - Desktop - Float right fixed */}
      {!isLoading && pages.length > 0 && (
        <div className="hidden md:block fixed top-4 right-4 z-50">
          <div className="relative">
            <button 
              className="flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-gray-900 bg-white py-1 px-3 rounded-full shadow-sm border border-gray-200"
            >
              <span>{currentLocale === 'pt-br' ? 'Português (Brasil)' : pages.find(p => p.slug === currentLocale)?.title || currentLocale}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </button>
            
            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white z-50 py-1 border border-gray-100 hidden group-hover:block">
              <Link 
                href={`/pt-br/${currentProduct}`}
                className={`block px-4 py-2 text-sm ${currentLocale === 'pt-br' ? 'text-purple-600 bg-purple-50 font-medium' : 'text-gray-700 hover:bg-purple-50 hover:text-purple-600'}`}
              >
                Português (Brasil)
              </Link>
              {pages.map((page) => (
                <Link 
                  key={page.id}
                  href={`/${page.slug}/${currentProduct}`}
                  className={`block px-4 py-2 text-sm ${currentLocale === page.slug ? 'text-purple-600 bg-purple-50 font-medium' : 'text-gray-700 hover:bg-purple-50 hover:text-purple-600'}`}
                >
                  {page.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
} 