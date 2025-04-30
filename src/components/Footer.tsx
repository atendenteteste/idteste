"use client"

import Link from 'next/link';
import Image from 'next/image';
import { useCustomizations } from '../lib/hooks';

export default function Footer() {
  // Obter customizações do Supabase
  const customizations = useCustomizations('Footer');
  
  // Valor padrão para copyright e títulos das colunas
  const copyrightText = customizations.copyrightText || '© 2023 SiteID - Todos os direitos reservados';
  const resourcesTitle = customizations.resourcesTitle || 'Recursos';
  const documentsTitle = customizations.documentsTitle || 'Documentos';
  const usefulLinksTitle = customizations.usefulLinksTitle || 'Links úteis';
  
  // Recursos - Links
  const resource1Text = customizations.resource1Text || 'Foto para passaporte';
  const resource1Url = customizations.resource1Url || '#';
  const resource2Text = customizations.resource2Text || 'Como Tirar Foto Passaporte';
  const resource2Url = customizations.resource2Url || '#';
  const resource3Text = customizations.resource3Text || 'Como tirar com celular';
  const resource3Url = customizations.resource3Url || '#';
  const resource4Text = customizations.resource4Text || 'Foto Passaporte Android';
  const resource4Url = customizations.resource4Url || '#';
  const resource5Text = customizations.resource5Text || 'Foto Passaporte iPhone';
  const resource5Url = customizations.resource5Url || '#';
  
  // Documentos - Links
  const document1Text = customizations.document1Text || 'Passaporte Brasileiro';
  const document1Url = customizations.document1Url || '#';
  const document2Text = customizations.document2Text || 'RG Nacional';
  const document2Url = customizations.document2Url || '#';
  const document3Text = customizations.document3Text || 'CNH Digital';
  const document3Url = customizations.document3Url || '#';
  const document4Text = customizations.document4Text || 'Visto Americano';
  const document4Url = customizations.document4Url || '#';
  const document5Text = customizations.document5Text || 'Visto Canadense';
  const document5Url = customizations.document5Url || '#';
  
  // Links úteis
  const useful1Text = customizations.useful1Text || 'Sobre a PhotoID';
  const useful1Url = customizations.useful1Url || '/sobre';
  const link1Text = customizations.link1Text || 'Termos de Uso';
  const link1Url = customizations.link1Url || '/termos-de-uso';
  const link2Text = customizations.link2Text || 'Política de Privacidade';
  const link2Url = customizations.link2Url || '/politica-de-privacidade';
  const useful4Text = customizations.useful4Text || 'Contato';
  const useful4Url = customizations.useful4Url || '/contato';

  // Console para debug de customizações
  console.log('Footer Customizations:', customizations);

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
              {copyrightText}
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
              {copyrightText}
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2 md:mb-4 text-gray-800 text-[11px] sm:text-xs md:text-sm">{resourcesTitle}</h4>
            <ul className="space-y-1 md:space-y-2">
              <li><Link href={resource1Url} className="text-gray-600 hover:text-gray-900 text-[10px] sm:text-xs">{resource1Text}</Link></li>
              <li><Link href={resource2Url} className="text-gray-600 hover:text-gray-900 text-[10px] sm:text-xs">{resource2Text}</Link></li>
              <li><Link href={resource3Url} className="text-gray-600 hover:text-gray-900 text-[10px] sm:text-xs">{resource3Text}</Link></li>
              <li><Link href={resource4Url} className="text-gray-600 hover:text-gray-900 text-[10px] sm:text-xs">{resource4Text}</Link></li>
              <li><Link href={resource5Url} className="text-gray-600 hover:text-gray-900 text-[10px] sm:text-xs">{resource5Text}</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2 md:mb-4 text-gray-800 text-[11px] sm:text-xs md:text-sm">{documentsTitle}</h4>
            <ul className="space-y-1 md:space-y-2">
              <li><Link href={document1Url} className="text-gray-600 hover:text-gray-900 text-[10px] sm:text-xs">{document1Text}</Link></li>
              <li><Link href={document2Url} className="text-gray-600 hover:text-gray-900 text-[10px] sm:text-xs">{document2Text}</Link></li>
              <li><Link href={document3Url} className="text-gray-600 hover:text-gray-900 text-[10px] sm:text-xs">{document3Text}</Link></li>
              <li><Link href={document4Url} className="text-gray-600 hover:text-gray-900 text-[10px] sm:text-xs">{document4Text}</Link></li>
              <li><Link href={document5Url} className="text-gray-600 hover:text-gray-900 text-[10px] sm:text-xs">{document5Text}</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2 md:mb-4 text-gray-800 text-[11px] sm:text-xs md:text-sm">{usefulLinksTitle}</h4>
            <ul className="space-y-1 md:space-y-2">
              <li><Link href={useful1Url} className="text-gray-600 hover:text-gray-900 text-[10px] sm:text-xs">{useful1Text}</Link></li>
              <li><Link href={link1Url} className="text-gray-600 hover:text-gray-900 text-[10px] sm:text-xs">{link1Text}</Link></li>
              <li><Link href={link2Url} className="text-gray-600 hover:text-gray-900 text-[10px] sm:text-xs">{link2Text}</Link></li>
              <li><Link href={useful4Url} className="text-gray-600 hover:text-gray-900 text-[10px] sm:text-xs">{useful4Text}</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
} 