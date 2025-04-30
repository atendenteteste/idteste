"use client"

import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { usePageContent } from '../lib/hooks';
import { useState, useEffect } from 'react';

export default function Footer() {
  // Get the current locale from the URL
  const params = useParams();
  const locale = params?.locale as string || 'pt-br';
  
  // State to track if content is fully ready
  const [contentReady, setContentReady] = useState(false);
  
  // Get customized content based on the current locale
  const { content, loading } = usePageContent(locale);
  
  // Get Footer content with fallback to default values
  const footerContent = content.Footer || {
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
  };
  
  // Set content as ready when loading is complete
  useEffect(() => {
    if (!loading) {
      setContentReady(true);
    }
  }, [loading]);

  return (
    <footer className="bg-gray-50 py-8 sm:py-16 relative overflow-hidden font-montserrat">
      <div className="absolute top-0 left-0 z-0" style={{ 
        transform: 'translate(-10px, -10px)',
        clipPath: 'inset(10px 10px 10px 10px)'
      }}>
        <Image 
          src="/images/herotopleft.png" 
          alt="Background design" 
          width={620} 
          height={620} 
          className="object-contain opacity-50"
        />
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 relative z-10">
        {/* Logo section - full width on mobile */}
        <div className="flex justify-center mb-6 md:mb-0">
          <div className="md:hidden flex flex-col items-center">
            <Link href="/" className="mb-2 block">
              <div className="relative h-auto w-36 mb-1">
                <Image 
                  src="/images/logogrande.png"
                  alt="photoID" 
                  width={144}
                  height={38}
                  className="object-contain" 
                />
              </div>
            </Link>
            <p className="text-gray-500 text-[10px] sm:text-xs">
              {footerContent.copyrightText}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-5 md:gap-8">
          {/* Logo section - hidden on mobile, visible on md+ */}
          <div className="hidden md:flex md:col-span-1 flex-col items-center justify-center">
            <Link href="/" className="mb-2 block">
              <div className="relative h-auto w-48 mb-1">
                <Image 
                  src="/images/logogrande.png"
                  alt="photoID" 
                  width={192}
                  height={50}
                  className="object-contain" 
                />
              </div>
            </Link>
            <p className="text-gray-500 text-xs">
              {footerContent.copyrightText}
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2 md:mb-4 text-gray-800 text-[11px] sm:text-xs md:text-sm">{footerContent.resourcesTitle}</h4>
            <ul className="space-y-1 md:space-y-2">
              <li><Link href={footerContent.resource1Url} className="text-gray-600 hover:text-gray-900 text-[10px] sm:text-xs">{footerContent.resource1Text}</Link></li>
              <li><Link href={footerContent.resource2Url} className="text-gray-600 hover:text-gray-900 text-[10px] sm:text-xs">{footerContent.resource2Text}</Link></li>
              <li><Link href={footerContent.resource3Url} className="text-gray-600 hover:text-gray-900 text-[10px] sm:text-xs">{footerContent.resource3Text}</Link></li>
              <li><Link href={footerContent.resource4Url} className="text-gray-600 hover:text-gray-900 text-[10px] sm:text-xs">{footerContent.resource4Text}</Link></li>
              <li><Link href={footerContent.resource5Url} className="text-gray-600 hover:text-gray-900 text-[10px] sm:text-xs">{footerContent.resource5Text}</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2 md:mb-4 text-gray-800 text-[11px] sm:text-xs md:text-sm">{footerContent.documentsTitle}</h4>
            <ul className="space-y-1 md:space-y-2">
              <li><Link href={footerContent.document1Url} className="text-gray-600 hover:text-gray-900 text-[10px] sm:text-xs">{footerContent.document1Text}</Link></li>
              <li><Link href={footerContent.document2Url} className="text-gray-600 hover:text-gray-900 text-[10px] sm:text-xs">{footerContent.document2Text}</Link></li>
              <li><Link href={footerContent.document3Url} className="text-gray-600 hover:text-gray-900 text-[10px] sm:text-xs">{footerContent.document3Text}</Link></li>
              <li><Link href={footerContent.document4Url} className="text-gray-600 hover:text-gray-900 text-[10px] sm:text-xs">{footerContent.document4Text}</Link></li>
              <li><Link href={footerContent.document5Url} className="text-gray-600 hover:text-gray-900 text-[10px] sm:text-xs">{footerContent.document5Text}</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2 md:mb-4 text-gray-800 text-[11px] sm:text-xs md:text-sm">{footerContent.usefulLinksTitle}</h4>
            <ul className="space-y-1 md:space-y-2">
              <li><Link href={footerContent.useful1Url} className="text-gray-600 hover:text-gray-900 text-[10px] sm:text-xs">{footerContent.useful1Text}</Link></li>
              <li><Link href={footerContent.link1Url} className="text-gray-600 hover:text-gray-900 text-[10px] sm:text-xs">{footerContent.link1Text}</Link></li>
              <li><Link href={footerContent.link2Url} className="text-gray-600 hover:text-gray-900 text-[10px] sm:text-xs">{footerContent.link2Text}</Link></li>
              <li><Link href={footerContent.useful4Url} className="text-gray-600 hover:text-gray-900 text-[10px] sm:text-xs">{footerContent.useful4Text}</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
} 