import { ReactNode, useState, useEffect } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import LoadingOverlay from '../LoadingOverlay';
import { useParams } from 'next/navigation';
import { usePageContent } from '../../lib/hooks';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const locale = params?.locale as string || 'pt-br';
  
  // Verificar o carregamento do conteúdo
  const { loading: contentLoading } = usePageContent(locale);
  
  useEffect(() => {
    // Verifica se o conteúdo foi carregado
    if (!contentLoading) {
      // Aumentar o delay para garantir que todo o conteúdo esteja renderizado
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [contentLoading]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <LoadingOverlay isLoading={isLoading} />
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
} 