"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSiteConfig, getRedirectForCountry, getDefaultInternationalPage } from '../lib/supabase';

// Função para obter o código do país a partir do IP
async function getCountryFromIP() {
  try {
    console.log("Iniciando verificação de geolocalização...");
    
    // Token fornecido pelo usuário
    const response = await fetch('https://ipinfo.io/json?token=1fdf5df92c8755');
    console.log("Status da resposta IPInfo:", response.status);
    
    if (!response.ok) {
      console.error("Erro na resposta IPInfo:", response.statusText);
      return null;
    }
    
    const data = await response.json();
    console.log("Dados de geolocalização:", data);
    
    // Verificar se o campo country existe na resposta
    if (!data.country) {
      console.log("Campo 'country' não encontrado na resposta");
      // Tentar alternativa com campos regionais
      if (data.region) {
        console.log("Usando dados de região como alternativa:", data.region);
      }
      return null;
    }
    
    console.log("País detectado:", data.country);
    return data.country;
  } catch (error) {
    console.error("Erro detalhado ao verificar geolocalização:", error);
    return null;
  }
}

export default function Home() {
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(true);
  
  useEffect(() => {
    async function handleRedirect() {
      try {
        console.log("Iniciando lógica de redirecionamento...");
        
        // Verificar se o redirecionamento geolocalizado está ativo
        const geoRedirectEnabled = await getSiteConfig('geo_redirect_enabled');
        console.log("Configuração de redirecionamento:", geoRedirectEnabled);
        
        if (geoRedirectEnabled === 'true') {
          // Obter o código do país a partir do IP
          const countryCode = await getCountryFromIP();
          console.log("Código do país obtido:", countryCode);
          
          if (countryCode) {
            // Tentar encontrar um redirecionamento específico para este país
            const redirectPage = await getRedirectForCountry(countryCode);
            console.log("Página de redirecionamento para o país:", redirectPage);
            
            if (redirectPage) {
              // Redirecionamento específico do país encontrado
              console.log("Redirecionando para:", redirectPage);
              router.replace(`/${redirectPage}`);
              return;
            }
            
            // Se for do Brasil, mas não tiver um redirecionamento específico configurado
            if (countryCode === 'BR') {
              console.log("País é BR, redirecionando para pt-br");
              router.replace('/pt-br');
              return;
            }
          }
          
          // Obter a página internacional padrão para todos os outros países
          const defaultPage = await getDefaultInternationalPage();
          console.log("Usando página padrão:", defaultPage);
          router.replace(`/${defaultPage}`);
        } else {
          // Se o redirecionamento geolocalizado não estiver ativo, ir para PT-BR por padrão
          console.log("Redirecionamento não está ativo, usando PT-BR como padrão");
          router.replace('/pt-br');
        }
      } catch (error) {
        console.error("Erro completo no redirecionamento:", error);
        console.log("Usando fallback para PT-BR devido a erro");
        router.replace('/pt-br'); // Fallback para PT-BR em caso de erro
      }
    }
    
    if (isRedirecting) {
      console.log("Componente montado, iniciando redirecionamento");
      handleRedirect();
    }
  }, [router, isRedirecting]);
  
  // Não renderiza nada - página em branco durante o redirecionamento
  return null;
}
