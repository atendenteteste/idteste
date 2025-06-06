"use client"

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCustomizations } from '../lib/hooks';

type FAQItem = {
  id: number;
  question: string;
  answer: string;
  isOpen?: boolean;
};

export default function FAQ() {
  // Obter customizações do Supabase
  const customizations = useCustomizations('FAQ');
  const [isCustomizationsLoaded, setIsCustomizationsLoaded] = useState(false);
  
  const [faqItems, setFaqItems] = useState<FAQItem[]>([]);

  // Quando as customizações forem carregadas, atualizar os itens de FAQ
  useEffect(() => {
    if (Object.keys(customizations).length > 0) {
      setFaqItems([
        {
          id: 1,
          question: customizations.question1 || 'O PhotoID está em conformidade com os requisitos de fotos para passaporte Brasileiro?',
          answer: customizations.answer1 || 'Sim, nosso serviço está totalmente em conformidade com todos os requisitos oficiais para fotos de passaporte brasileiro. Garantimos que suas fotos serão aceitas pelas autoridades.',
          isOpen: false
        },
        {
          id: 2,
          question: customizations.question2 || 'E quanto a outros documentos de identificação com foto e papel?',
          answer: customizations.answer2 || 'Nosso serviço suporta vários tipos de documentos, incluindo RG, CNH, vistos, carteiras profissionais e outros documentos de identificação com foto. Temos padrões específicos para cada tipo de documento.',
          isOpen: false
        },
        {
          id: 3,
          question: customizations.question3 || 'Onde posso imprimir as fotos do meu passaporte?',
          answer: customizations.answer3 || 'Você pode imprimir suas fotos em qualquer gráfica, papelaria ou loja de fotografia. Fornecemos arquivos em alta resolução que podem ser impressos no formato correto para seu documento.',
          isOpen: false
        },
        {
          id: 4,
          question: customizations.question4 || 'O que está incluso na garantia pós-projeto?',
          answer: customizations.answer4 || 'Nossa garantia inclui o compromisso de que suas fotos serão aceitas pelas autoridades. Se sua foto for rejeitada por qualquer razão técnica que seja nossa responsabilidade, oferecemos reembolso total ou fazemos os ajustes necessários gratuitamente.',
          isOpen: false
        },
        {
          id: 5,
          question: customizations.question5 || 'O que é um criador de foto para passaporte?',
          answer: customizations.answer5 || 'Um criador de foto para passaporte é uma ferramenta que permite que você tire, ajuste e prepare fotos que atendam aos requisitos específicos de documentos oficiais, como passaportes, vistos e outros documentos de identificação.',
          isOpen: false
        },
        {
          id: 6,
          question: customizations.question6 || 'O PhotoID é seguro?',
          answer: customizations.answer6 || 'Sim, o PhotoID é 100% seguro. Utilizamos conexões criptografadas para transferência de dados e não armazenamos suas fotos permanentemente após o processamento. Sua privacidade e segurança são nossas prioridades.',
          isOpen: false
        },
        {
          id: 7,
          question: customizations.question7 || 'Como funciona o processo de compra?',
          answer: customizations.answer7 || 'O processo é simples: faça o upload de sua foto, nossa IA ajustará automaticamente para atender aos requisitos, você receberá uma versão prévia para aprovação e, após o pagamento, receberá os arquivos finais em alta resolução prontos para impressão.',
          isOpen: false
        },
      ]);
      setIsCustomizationsLoaded(true);
    }
  }, [customizations]);

  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isMoving, setIsMoving] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const moveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const toggleFAQ = (id: number) => {
    setFaqItems(
      faqItems.map(item => 
        item.id === id ? { ...item, isOpen: !item.isOpen } : item
      )
    );
  };

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePosition({ 
          x: event.clientX - rect.left, 
          y: event.clientY - rect.top 
        });

        setIsMoving(true);
        if (moveTimeoutRef.current) {
          clearTimeout(moveTimeoutRef.current);
        }
        moveTimeoutRef.current = setTimeout(() => {
          setIsMoving(false);
        }, 150);
      }
    };

    const currentSectionRef = sectionRef.current;
    if (currentSectionRef) {
      currentSectionRef.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (currentSectionRef) {
        currentSectionRef.removeEventListener('mousemove', handleMouseMove);
      }
      if (moveTimeoutRef.current) {
        clearTimeout(moveTimeoutRef.current);
      }
    };
  }, []);

  const glowSize = isMoving ? 400 : 300;
  const glowBlur = isMoving ? 'blur(60px)' : 'blur(50px)';
  const glowOpacity = isMoving ? 0.20 : 0.15;

  // Adiciona console.log para depuração
  console.log('FAQ Customizations:', customizations);
  console.log('FAQ Items:', faqItems);

  return (
    <section 
      id="faq" 
      ref={sectionRef}
      className="relative bg-[#F1F6FA] py-16 font-montserrat"
    >
      {/* Mouse Glow Effect */}
      <div 
        className="absolute z-0 pointer-events-none"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          width: `${glowSize}px`,
          height: `${glowSize}px`,
          background: `radial-gradient(circle, rgba(121, 30, 221, ${glowOpacity}) 0%, rgba(121, 30, 221, 0) 70%)`,
          borderRadius: '50%',
          filter: glowBlur,
          transform: 'translate(-50%, -50%)',
          transition: 'left 0.3s ease-out, top 0.3s ease-out, width 0.3s ease-out, height 0.3s ease-out, filter 0.3s ease-out, opacity 0.3s ease-out',
        }}
      />

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

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Left Column - Title and Button */}
          <div className="md:w-1/3">
            <div className="sticky top-20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-5 bg-[#791EDD]"></div>
                <h2 className="text-lg font-bold text-[#791EDD]">{customizations.sectionTag || 'FAQ'}</h2>
              </div>
              
              <h3 className="text-3xl font-bold mb-6">{customizations.sectionTitle || 'Tire suas dúvidas nas perguntas frequentes'}</h3>
              
              <Link 
                href={customizations.ctaButtonLink || '/upload'} 
                className="inline-block px-8 py-4 rounded-full text-white font-bold hover:opacity-90 transition-colors text-[13px] tracking-tight"
                style={{ background: 'linear-gradient(to right, #6A0FDA, #B45DEB)' }}
              >
                {customizations.ctaButtonText || 'Escolha o documento'}
              </Link>
            </div>
          </div>
          
          {/* Right Column - FAQ Items */}
          <div className="md:w-2/3">
            <div className="space-y-4">
              {faqItems.map((item) => (
                <div key={item.id} className="border-t border-gray-200 pt-4">
                  <button
                    className="flex justify-between items-center w-full text-left"
                    onClick={() => toggleFAQ(item.id)}
                  >
                    <h3 className="text-lg font-medium pr-8">{item.question}</h3>
                    <div className="flex-shrink-0">
                      {item.isOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600">
                          <path d="M5 12h14" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600">
                          <path d="M12 5v14" />
                          <path d="M5 12h14" />
                        </svg>
                      )}
                    </div>
                  </button>
                  
                  <div 
                    className={`mt-2 text-gray-600 text-base transition-[max-height] duration-700 ease-in-out overflow-hidden ${item.isOpen ? 'max-h-[500px]' : 'max-h-0'}`}
                  >
                    <p className="pb-4">{item.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 