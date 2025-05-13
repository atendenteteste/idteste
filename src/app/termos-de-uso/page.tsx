"use client";

import Layout from '../../components/layout/Layout';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const LANGUAGES = [
  { code: 'pt', label: 'Português' },
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
];

// Conteúdo dos termos em cada idioma
const TERMS_CONTENT = {
  pt: (
    <>
      <h2 className="text-xl font-semibold mb-4">Regulamento para o uso do serviço PhotoAiD.com</h2>
      <p className="mb-4">Os seguintes termos e condições foram traduzidos dos termos de serviço [https://photoaid.com/terms], originalmente redigidos em inglês. Em caso de qualquer conflito, inconsistência ou ambiguidade entre a versão em inglês e esta tradução, a versão em inglês prevalecerá.</p>
      <h3 className="text-lg font-semibold mt-6 mb-3">§ 1. Disposições Gerais</h3>
      <p className="mb-3">Este conjunto de termos e condições ("Termos") define as regras para o uso do serviço online disponível em https://photoaid.com (doravante denominado "Serviço") e através de aplicativos móveis dedicados ("Aplicativos Móveis").</p>
      <p className="mb-3">O Serviço é operado pela PhotoAiD S.A., localizada em Żurawia 71, 15-540 Białystok, Polônia, registrada no Registro Nacional de Empresas com o número 0000941997, Número de Identificação Fiscal (NIP) 7831692257, Número de Registro Nacional de Empresas (REGON) 302228040 ("Fornecedor de Serviços").</p>
      <p className="mb-3">Para fins destes Termos, um "Usuário" é qualquer pessoa que visite ou utilize o Serviço por meio de um navegador da web ou através dos Aplicativos Móveis do Fornecedor de Serviços.</p>
      <p className="mb-3">O escopo de negócios do Fornecedor de Serviços inclui: fornecer ao Usuário o acesso à oferta do Fornecedor de Serviços e permitir que ele crie, compre e baixe ("Serviços") fotos para documentos oficiais em formato digital ("Produtos").</p>
      <p className="mb-3">O acesso à oferta do Fornecedor de Serviços através dos Aplicativos Móveis é gratuito. Em particular, o download dos Aplicativos Móveis e a navegação pela oferta do Fornecedor de Serviços não geram custos. A oferta do Fornecedor de Serviços está sujeita a alterações. Os custos incorridos pelo Usuário estão relacionados exclusivamente à aquisição dos Produtos.</p>
      <h3 className="text-lg font-semibold mt-6 mb-3">§ 2. Diretrizes de Uso para o Usuário</h3>
      <p className="mb-3">O Serviço é destinado a pessoas com idade superior a 16 anos. Portanto, o Fornecedor de Serviços não processa intencionalmente dados pessoais de crianças menores de 16 anos.</p>
      <p className="mb-3">O Usuário é responsável por verificar a própria foto no Serviço.</p>
      <p className="mb-3">O Usuário deve cumprir as regulamentações legais ao utilizar o Serviço, em particular as disposições do Código Civil de 23 de abril de 1964.</p>
      <p className="mb-3">Para utilizar o Serviço, o Usuário deve possuir um dispositivo que permita acesso à Internet, incluindo um navegador que aceite cookies.</p>
      <p className="mb-3">A compra de um Produto pelo Usuário equivale ao seu consentimento para ser contatado por e-mail por uma entidade que coleta opiniões em nome do Fornecedor de Serviços.</p>
      <h3 className="text-lg font-semibold mt-6 mb-3">§ 3. Direitos e Responsabilidade do Fornecedor de Serviços</h3>
      <p className="mb-3">O Fornecedor de Serviços é obrigado a entregar um Produto ao Usuário que esteja livre de defeitos e adequado para o uso pretendido.</p>
      <p className="mb-3">O Fornecedor de Serviços não é responsável pela falta de cumprimento ou pelo cumprimento inadequado dos Serviços se isso se dever a circunstâncias fora do controle do Fornecedor de Serviços.</p>
      <p className="mb-3">O Fornecedor de Serviços não é responsável pelo conteúdo carregado, armazenado ou transmitido no Serviço como parte do uso dos Serviços pelo Usuário.</p>
      <h3 className="text-lg font-semibold mt-6 mb-3">§ 4. Celebração do Contrato de Prestação de Serviços</h3>
      <p className="mb-3">A celebração de um contrato de prestação de serviços entre o Fornecedor de Serviços e o Usuário ("Contrato") não pode ocorrer sem a aceitação destes Termos no Serviço ou nos Aplicativos Móveis.</p>
      <p className="mb-3">A recusa em aceitar os Termos resulta na não celebração do Contrato.</p>
      <h3 className="text-lg font-semibold mt-6 mb-3">§ 5. Compra do Produto</h3>
      <p className="mb-3">Após carregar e verificar uma foto no Serviço, o Usuário pode comprar um Produto seguindo as instruções fornecidas.</p>
      <p className="mb-3">Todos os preços dos Produtos listados no Serviço são preços brutos (incluindo impostos).</p>
      <p className="mb-3">O Usuário tem a opção de escolher o método de pagamento do Produto em uma determinada compra.</p>
      <p className="mb-3">Após selecionar o método de pagamento para a compra do Produto, o Usuário pode ser redirecionado para fora do Serviço para realizar o pagamento.</p>
      <p className="mb-3">Após receber a confirmação do pagamento, a compra do Produto é realizada por meio de download no dispositivo utilizado pelo Usuário para acessar o Serviço.</p>
      <h3 className="text-lg font-semibold mt-6 mb-3">§ 6. Pagamento</h3>
      <p className="mb-3">Os Usuários do Serviço podem escolher entre as opções de pagamento disponíveis para o Produto dependendo do canal de vendas.</p>
      <p className="mb-3">Para transações realizadas diretamente no Serviço, estão disponíveis os seguintes métodos de pagamento para o Produto: cartão de crédito, transferência online via PayU e através do Braintree (Cartões de Crédito, PayPal).</p>
      <p className="mb-3">Para transações realizadas através dos Aplicativos Móveis, estão disponíveis os seguintes métodos de pagamento para o Produto: Braintree (Cartões de Crédito, PayPal).</p>
      <h3 className="text-lg font-semibold mt-6 mb-3">§ 7. Reclamações</h3>
      <p className="mb-3">Os Usuários podem apresentar reclamações relacionadas à prestação de Serviços abrangidos por estes Termos, enviando-as eletronicamente para o endereço de e-mail: help@photoaid.com.</p>
      <p className="mb-3">Uma reclamação deve incluir o número do pedido e o motivo da reclamação.</p>
      <p className="mb-3">O Fornecedor de Serviços analisará as reclamações dentro de 14 dias a partir da data de recebimento da reclamação.</p>
      <p className="mb-3">O Fornecedor de Serviços informará o Usuário sobre a recusa em aceitar a reclamação e os motivos, enviando uma mensagem para o endereço de e-mail fornecido durante o envio da reclamação.</p>
      <p className="mb-3">Uma lista de instituições exemplares junto com seus contatos está disponível no site https://www.uokik.gov.pl.</p>
      <h3 className="text-lg font-semibold mt-6 mb-3">§ 8. Reembolso do Preço do Produto</h3>
      <p className="mb-3">Em caso de reembolso do preço do Produto, o reembolso será realizado utilizando o mesmo método de pagamento utilizado durante a compra do Produto.</p>
      <h3 className="text-lg font-semibold mt-6 mb-3">§ 9. Reembolso de Bônus</h3>
      <p className="mb-3">Qualquer reembolso que exceda o valor do preço do Produto será feito exclusivamente através do PayPal ou para uma conta em um banco brasileiro.</p>
      <p className="mb-3">O reembolso aplica-se apenas a fotos com um propósito específico, por exemplo, "foto para passaporte".</p>
      <h3 className="text-lg font-semibold mt-6 mb-3">§ 10. Dados Pessoais</h3>
      <p className="mb-3">O escopo de coleta, divulgação e uso dos seus dados pessoais, bem como os direitos que lhe são assegurados, está detalhado na Política de Privacidade.</p>
      <h3 className="text-lg font-semibold mt-6 mb-3">§ 11. Disposições Finais</h3>
      <p className="mb-3">Para questões não reguladas por estes Termos, aplicam-se as disposições pertinentes da legislação aplicável.</p>
      <p className="mb-3">O Fornecedor de Serviços reserva-se o direito de alterar estes Termos.</p>
      <p className="mb-3">Todos os anexos a estes Termos constituem parte integrante destes Termos.</p>
    </>
  ),
  en: (
    <>
      <h2 className="text-xl font-semibold mb-4">Terms of Service for PhotoAiD.com</h2>
      <p className="mb-4">This is a placeholder for the English version of the terms. Please provide the official translation to replace this text.</p>
    </>
  ),
  es: (
    <>
      <h2 className="text-xl font-semibold mb-4">Reglamento para el uso del servicio PhotoAiD.com</h2>
      <p className="mb-4">Este es un texto de ejemplo para la versión en español de los términos. Por favor, proporcione a tradução oficial para substituir este texto.</p>
    </>
  ),
};

type LangType = 'pt' | 'en' | 'es';
export default function TermosDeUso() {
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
          <h1 className="text-4xl font-bold text-center mb-2">Termos de Uso</h1>
          <div className="mx-auto w-16 h-1 bg-[#6A0FDA] rounded mb-8" />
          <div className="prose prose-lg max-w-none mx-auto">
            {TERMS_CONTENT[lang]}
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