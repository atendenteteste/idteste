import Image from 'next/image';
import Link from 'next/link';
import { forwardRef, useRef, useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { usePageContent } from '../lib/hooks';

// Using forwardRef to expose a ref to parent components
const HeroSection = forwardRef<HTMLImageElement, {}>((props, ref) => {
  // Create local ref to use in case external ref is not provided
  const localRef = useRef<HTMLImageElement>(null);
  // Use the forwarded ref if available, otherwise use local ref
  const heroImageRef = ref || localRef;
  
  // Get the current locale from the URL
  const params = useParams();
  const locale = params?.locale as string || 'pt-br';
  
  // State to track if content is fully ready
  const [contentReady, setContentReady] = useState(false);
  
  // Get customized content based on the current locale
  const { content, loading } = usePageContent(locale);
  
  // Get HeroSection content with fallback to default values
  const heroContent = content.HeroSection || {
    mainTitle: 'Crie sua própria foto profissional para documentos',
    mainSubtitle: 'Tratamento de foto rápido e fácil, realize tratamentos automáticos com IA e receba a sua foto ideal para passaporte.',
    ctaButton: 'Escolha o documento',
    ctaButtonLink: '/upload',
    ratingText: '4.9 (6.493 avaliações)',
    usersText: 'Mais de 200 mil usuários satisfeitos'
  };
  
  // Set content as ready when loading is complete
  useEffect(() => {
    if (!loading) {
      // Aumentar o timeout para ser consistente com outros componentes
      const timer = setTimeout(() => {
        setContentReady(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [loading]);
  
  // Return a minimal container while loading to prevent content flash
  if (!contentReady) {
    return (
      <section className="relative bg-[#FAFAFA] overflow-hidden md:min-h-[520px] md:h-[calc(80vh-80px)] md:max-h-[640px] min-h-0 h-auto">
        <div className="absolute top-0 left-0 z-0" style={{ 
          transform: 'translate(-10px, -10px)',
          clipPath: 'inset(10px 10px 10px 10px)'
        }}>
          <Image 
            src="/images/herotopleft.png" 
            alt="Background design" 
            width={620} 
            height={620} 
            className="object-contain"
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-0">
          <Image src="/images/herodown.png" alt="Background gradient" width={1920} height={200} className="w-full object-cover" />
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-full relative z-10 flex items-center">
          {/* Loading placeholders */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="h-12 bg-gray-100 rounded-lg animate-pulse w-3/4"></div>
              <div className="h-24 bg-gray-100 rounded-lg animate-pulse"></div>
              <div className="h-12 bg-gray-100 rounded-lg animate-pulse w-40"></div>
              <div className="h-12 bg-gray-100 rounded-lg animate-pulse w-64 mt-4"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  return (
    <section className="relative bg-[#FAFAFA] overflow-hidden md:min-h-[520px] md:h-[calc(80vh-80px)] md:max-h-[640px] min-h-0 h-auto">
      {/* Background elements */}
      <div className="absolute top-0 left-0 z-0" style={{ 
        transform: 'translate(-10px, -10px)',
        clipPath: 'inset(10px 10px 10px 10px)'
      }}>
        <Image 
          src="/images/herotopleft.png" 
          alt="Background design" 
          width={620} 
          height={620} 
          className="object-contain"
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 z-0">
        <Image src="/images/herodown.png" alt="Background gradient" width={1920} height={200} className="w-full object-cover" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 h-full relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
          {/* Desktop content layout - updated with customizations */}
          <div className="self-center space-y-6 hidden md:block">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              {heroContent.mainTitle}
            </h1>
            <p className="text-lg text-gray-700">
              {heroContent.mainSubtitle}
            </p>
            
            <Link 
              href={heroContent.ctaButtonLink} 
              className="inline-block px-8 py-4 rounded-full text-white font-bold hover:opacity-90 transition-colors text-[14px] tracking-tight"
              style={{ background: 'linear-gradient(to right, #6A0FDA, #B45DEB)' }}
            >
              {heroContent.ctaButton}
            </Link>
            
            <div className="flex items-center gap-2 pt-4">
              <div className="flex -space-x-3">
                {/* User avatars */}
                <div className="w-11 h-11 rounded-full border-2 border-white overflow-hidden relative">
                  <Image src="/images/p1.png" alt="Avatar 1" width={44} height={44} className="object-cover" />
                </div>
                <div className="w-11 h-11 rounded-full border-2 border-white overflow-hidden relative">
                  <Image src="/images/p2.png" alt="Avatar 2" width={44} height={44} className="object-cover" />
                </div>
                <div className="w-11 h-11 rounded-full border-2 border-white overflow-hidden relative">
                  <Image src="/images/p3.png" alt="Avatar 3" width={44} height={44} className="object-cover" />
                </div>
              </div>
              <div>
                <div className="flex items-center">
                  {/* Star rating */}
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-400">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">{heroContent.ratingText}</span>
                </div>
                <p className="text-xs text-gray-500">{heroContent.usersText}</p>
              </div>
            </div>
          </div>
          
          {/* Desktop hero image */}
          <div className="self-end hidden md:block md:h-full relative">
            <img 
              ref={heroImageRef}
              src="/images/heropic.png" 
              alt="Person taking passport photo" 
              className="absolute bottom-0 right-0 max-h-full w-auto"
              style={{ maxHeight: "100%" }}
            />
          </div>

          {/* Mobile layout - updated with customizations */}
          <div className="block md:hidden text-center mt-8 space-y-6">
            {/* Title */}
            <h1 className="text-4xl font-bold leading-tight">
              {heroContent.mainTitle}
            </h1>
            
            {/* Subtitle */}
            <p className="text-lg text-gray-700">
              {heroContent.mainSubtitle}
            </p>
            
            {/* Button */}
            <div className="py-2">
              <Link 
                href={heroContent.ctaButtonLink} 
                className="inline-block px-8 py-4 rounded-full text-white font-bold hover:opacity-90 transition-colors text-[14px] tracking-tight"
                style={{ background: 'linear-gradient(to right, #6A0FDA, #B45DEB)' }}
              >
                {heroContent.ctaButton}
              </Link>
            </div>
            
            {/* Review section */}
            <div className="flex flex-col items-center gap-4 pt-2">
              {/* User avatars */}
              <div className="flex -space-x-3">
                <div className="w-11 h-11 rounded-full border-2 border-white overflow-hidden relative">
                  <Image src="/images/p1.png" alt="Avatar 1" width={44} height={44} className="object-cover" />
                </div>
                <div className="w-11 h-11 rounded-full border-2 border-white overflow-hidden relative">
                  <Image src="/images/p2.png" alt="Avatar 2" width={44} height={44} className="object-cover" />
                </div>
                <div className="w-11 h-11 rounded-full border-2 border-white overflow-hidden relative">
                  <Image src="/images/p3.png" alt="Avatar 3" width={44} height={44} className="object-cover" />
                </div>
              </div>
              
              {/* Reviews */}
              <div className="text-center">
                <div className="flex items-center justify-center">
                  {/* Star rating */}
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-400">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">{heroContent.ratingText}</span>
                </div>
                <p className="text-xs text-gray-500">{heroContent.usersText}</p>
              </div>
            </div>
            
            {/* Hero image at the bottom for mobile - this is now the last element with no margin/padding below it */}
            <div>
              <img 
                ref={heroImageRef}
                src="/images/heropic.png" 
                alt="Person taking passport photo" 
                className="max-w-full h-auto mx-auto block"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

// Add display name for debugging
HeroSection.displayName = 'HeroSection';

export default HeroSection; 