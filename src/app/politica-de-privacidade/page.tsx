"use client";

import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import Image from 'next/image';
import Link from 'next/link';

type LangType = 'pt' | 'en' | 'es';

const LANGUAGES = [
  { code: 'pt', label: 'Português' },
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
];

const PRIVACY_CONTENT: Record<LangType, React.ReactNode> = {
  pt: (
    <>
      <h2 className="text-xl font-semibold mb-4">Política de Privacidade</h2>
      <p className="mb-4">A seguinte política de privacidade foi traduzida da política de privacidade [https://photoaid.com/privacy] originalmente publicada em inglês. Em caso de qualquer discrepância, inconsistência ou ambiguidade entre a versão em inglês e esta tradução, a versão em inglês prevalecerá.</p>
      <p className="mb-4">A presente política de privacidade (doravante, "Política de Privacidade") descreve as diretrizes da PhotoAiD S.A. para o tratamento dos seus dados pessoais coletados nos pontos fotográficos físicos da PhotoAiD S.A. (doravante, "Pontos"), por meio do serviço online disponível em https://photoaid.com (doravante, "Serviço") e pelos aplicativos móveis dedicados (doravante, "Aplicativos Móveis").</p>
      <p className="mb-4">Os dados pessoais referem-se a informações sobre você como pessoa física, direta ou indiretamente (doravante, "Dados Pessoais").</p>
      <p className="mb-4">A base legal para o tratamento dos seus Dados Pessoais é o contrato – de acordo com o artigo 6º, inciso 1, alínea b) do Regulamento (UE) 2016/679 do Parlamento Europeu e do Conselho, de 27 de abril de 2016, relativo à proteção das pessoas físicas no que diz respeito ao tratamento de dados pessoais e à livre circulação desses dados, e que revoga a Diretiva 95/46/CE (Regulamento Geral de Proteção de Dados ou "GDPR"). Outras bases legais incluem: o interesse legítimo do controlador de dados – artigo 6º, inciso 1, alínea f) do GDPR, que consiste em coletar informações para permitir que o controlador melhore continuamente a qualidade dos serviços oferecidos nos Pontos, Aplicativos Móveis e Serviço (doravante, "Serviços"), adaptando suas funcionalidades às suas necessidades como usuário (doravante, "Usuário"), bem como o seu consentimento – artigo 6º, inciso 1, alínea a) do GDPR.</p>
      <h3 className="text-lg font-semibold mt-6 mb-3">Contato</h3>
      <p className="mb-3">Se você tiver dúvidas sobre sua conta de Usuário no Aplicativo Móvel ou no Serviço, sobre o funcionamento dos Serviços ou precisar de ajuda, entre em contato pelo e-mail: help@photoaid.com.</p>
      <p className="mb-3">Para perguntas relacionadas a esta Política de Privacidade ou ao uso dos Dados Pessoais dos Usuários, entre em contato pelo e-mail: privacy@photoaid.com.</p>
      <p className="mb-3">Pode ser necessário verificar a identidade do Usuário que solicita ajuda antes de processar sua solicitação, para garantir tanto a segurança do Usuário quanto a nossa.</p>
      <h3 className="text-lg font-semibold mt-6 mb-3">Coleta de dados</h3>
      <p className="mb-3">Coletamos e armazenamos os seguintes dados sobre os Usuários:</p>
      <p className="mb-3 font-semibold">Informações fornecidas pelo Usuário:</p>
      <ul className="mb-3 list-disc ml-6">
        <li>Foto;</li>
        <li>Informações necessárias para a prestação dos Serviços;</li>
        <li>Informações necessárias para emissão de nota fiscal, caso solicitada pelo Usuário;</li>
        <li>Informações obtidas durante o processo de reclamação, caso o Usuário apresente uma reclamação;</li>
        <li>Informações obtidas durante o suporte ao Usuário na utilização dos Serviços;</li>
        <li>Informações fornecidas pelo Usuário, com base em seu consentimento explícito, para fins de marketing.</li>
      </ul>
      <p className="mb-3 font-semibold">Informações de outras fontes:</p>
      <p className="mb-3">Entre as entidades que podem ser fontes desses dados estão, por exemplo, os provedores de serviços de pagamento, que nos fornecem informações atualizadas sobre os métodos de pagamento com base na relação com o Usuário, bem como dados como nome, endereço, tipo e data de validade do cartão, parte do número do cartão e tokens para processamento de pagamentos.</p>
      <h3 className="text-lg font-semibold mt-6 mb-3">Finalidade e duração do tratamento dos Dados Pessoais</h3>
      <p className="mb-3">Os Dados Pessoais são utilizados e processados para os seguintes fins: 1) execução do contrato/Serviços, 2) cumprimento de obrigações legais da PhotoAiD S.A., como emissão ou armazenamento de notas fiscais, resposta a reclamações, garantia de conformidade, 3) proteção ou exercício de direitos, 4) análise e estatísticas – para melhorar continuamente a qualidade dos Serviços oferecidos nos Pontos, Aplicativos Móveis e Serviço, adaptando suas funcionalidades às necessidades dos Usuários, 5) exclusivamente com o consentimento prévio do Usuário – para atividades de marketing, que podem incluir: (a) exibição de conteúdos publicitários personalizados com base nos interesses do Usuário (publicidade comportamental), (b) envio de newsletters (caso este serviço esteja disponível), ou (c) realização de pesquisas de satisfação, 6) além disso, no caso de Dados Pessoais coletados nos Aplicativos Móveis, podem ser realizadas atividades de marketing como (a) exibição de conteúdos publicitários não personalizados (publicidade contextual).</p>
      <p className="mb-3">Os Dados Pessoais não serão armazenados por mais tempo do que o necessário para os fins para os quais são processados, em particular durante o período em que somos legalmente obrigados a armazená-los ou para cumprir outras obrigações legais, ou até que expire o prazo de prescrição.</p>
    </>
  ),
  en: (
    <>
      <h2 className="text-xl font-semibold mb-4">Privacy Policy</h2>
      <p className="mb-4">This is a placeholder for the English version of the privacy policy. Please provide the official translation to replace this text.</p>
    </>
  ),
  es: (
    <>
      <h2 className="text-xl font-semibold mb-4">Política de Privacidad</h2>
      <p className="mb-4">Este es un texto de ejemplo para la versión en español de la política de privacidad. Por favor, proporcione la traducción oficial para sustituir este texto.</p>
    </>
  ),
};

export default function PoliticaDePrivacidade() {
  const [lang, setLang] = useState<LangType>('pt');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <Layout hideHeader hideFooter>
      {/* Header próprio da página */}
      <header className="w-full flex justify-center py-8 mb-2">
        <div className="w-full max-w-3xl flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-8 md:h-10 w-32 md:w-40">
              <Image 
                src="/images/headerlogo.png" 
                alt="photoID" 
                width={144} 
                height={38} 
                className="object-contain" 
              />
            </div>
            <span className="sr-only">Voltar para a Home</span>
          </Link>
          {/* Dropdown de idioma */}
          <div className="relative">
            <button
              className="border px-4 py-2 rounded-md bg-white shadow-sm flex items-center gap-2 hover:bg-gray-50"
              onClick={() => setDropdownOpen((v) => !v)}
              aria-haspopup="listbox"
              aria-expanded={dropdownOpen}
            >
              {LANGUAGES.find(l => l.code === lang)?.label}
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </button>
            {dropdownOpen && (
              <ul className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-10" role="listbox">
                {LANGUAGES.map(option => (
                  <li
                    key={option.code}
                    className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${lang === option.code ? 'font-bold text-blue-600' : ''}`}
                    onClick={() => { setLang(option.code as LangType); setDropdownOpen(false); }}
                    role="option"
                    aria-selected={lang === option.code}
                  >
                    {option.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </header>

      {/* Conteúdo centralizado e estilizado */}
      <main className="flex flex-col items-center min-h-[60vh] px-2">
        <section className="w-full max-w-3xl bg-white rounded-xl shadow-md p-8">
          <h1 className="text-4xl font-bold text-center mb-2">Política de Privacidade</h1>
          <div className="mx-auto w-16 h-1 bg-[#6A0FDA] rounded mb-8" />
          <div className="prose prose-lg max-w-none mx-auto">
            {PRIVACY_CONTENT[lang]}
          </div>
        </section>
        <div style={{ height: 30 }} />
      </main>
      {/* Footer próprio da página */}
      <footer className="bg-gray-50 py-8 mt-8">
        <div className="max-w-3xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-4 px-4">
          {/* Logo à esquerda */}
          <Link href="/" className="flex items-center gap-2 order-1 md:order-none">
            <div className="relative h-8 md:h-10 w-32 md:w-40">
              <Image 
                src="/images/headerlogo.png" 
                alt="photoID" 
                width={144} 
                height={38} 
                className="object-contain" 
              />
            </div>
          </Link>
          {/* Dropdown de idioma à direita */}
          <div className="relative order-2 md:order-none">
            <button
              className="border px-4 py-2 rounded-md bg-white shadow-sm flex items-center gap-2 hover:bg-gray-50"
              onClick={() => setDropdownOpen((v) => !v)}
              aria-haspopup="listbox"
              aria-expanded={dropdownOpen}
            >
              {LANGUAGES.find(l => l.code === lang)?.label}
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </button>
            {dropdownOpen && (
              <ul className="absolute right-0 bottom-full mb-2 w-40 bg-white border rounded-md shadow-lg z-10" role="listbox">
                {LANGUAGES.map(option => (
                  <li
                    key={option.code}
                    className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${lang === option.code ? 'font-bold text-blue-600' : ''}`}
                    onClick={() => { setLang(option.code as LangType); setDropdownOpen(false); }}
                    role="option"
                    aria-selected={lang === option.code}
                  >
                    {option.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <p className="text-gray-500 text-xs text-center mt-6">© 2024 PhotoID. Todos os direitos reservados.</p>
      </footer>
    </Layout>
  );
} 