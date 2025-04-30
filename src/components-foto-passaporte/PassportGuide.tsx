"use client"

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useProductContent } from '../lib/hooks';

const PassportGuide = React.forwardRef<HTMLElement>(
  (props, ref) => {
    // Get the current locale and product from the URL
    const params = useParams();
    const locale = params?.locale as string || 'pt-br';
    const product = params?.product as string || 'foto-passaporte';
    
    // State to track if content is fully ready
    const [contentReady, setContentReady] = useState(false);
    
    // Get customized content based on the current product
    const { content, loading } = useProductContent(product);
    
    // Get PassportGuide content with fallback to default values
    const guideContent = content.PassportGuide || {
      title: 'Gerador de fotos de passaporte',
      intro_paragraph: 'Em algum ponto da nossa vida, todos nós precisamos de uma foto para o passaporte. Agora você não precisa mais se estressar ou procurar os serviços de uma fotografia profissional para obter essas fotos. Uma solução mais fácil é simplesmente você aproveitar e utilizar o nosso verificador e ajustador de fotos online, que verifica e ajusta a mesma à especificações corretas. É mais rápido e barato.',
      article_info: 'Neste artigo você encontrará informações relevantessobre:',
      bullet_1: 'os requisitos da foto para o passaporte brasileiro',
      bullet_2: 'como tirar uma foto perfeita para o passaporte do visto em casa',
      bullet_3: 'qual tipo de roupa você deve usar quando tirar a foto para o passaporte',
      bullet_4: 'erros comuns cometidos',
      
      passport_title: 'Fotos para o passaporte',
      passport_paragraph_1: 'Hoje em dia são utilizadas fotos biométricas na maioria dos documentos de identificação. A pessoa deve estar posicionada em frente à câmera e olhar diretamente para a lente. Não pode sorrir, pois deve manter uma expressão facial neutra. Uma foto para um passaporte brasileiro deve ter 5x7 cm.',
      passport_paragraph_2: 'A foto deve ser tirada a cores com fundo branco. Todo o seu rosto deve estar bem visível, ou seja, o uso de óculos não é permitido. O uso de lenços por motivos religiosos é permitido. Precisa garantir uma boa iluminação no seu rosto, não pode conter um fundo preto.',
      
      visa_title: 'Fotos para o visto',
      visa_paragraph: 'Em algum ponto da nossa vida, todos nós precisamos de uma foto para o passaporte. Não precisa de solicitar os serviços de uma fotografo profissional para obter tal foto. Uma solução mais fácil é pedir a alguém que tire uma foto sua utilizando o nosso verificador e validador de fotos online, que verifica e ajusta a mesma à especificação do Brasil. É mais rápido e barato.',
      
      cnh_title: 'Fotos para a CNH',
      cnh_paragraph: 'Você não precisa ir a um estúdio para tirar foto biométrica, a foto do fotógrafo é exigida onde quer que precise ou carteira de motorista. A nossa ferramenta fotográfica irá ajudá-lo a tirar uma foto para CNH ou acordo com os requisitos oficiais de uma grande variedade de países. Pode o alguém que tem uma foto para o e entregá-la no aplicativo. Finalizamos-lhe a mesma para o uso em até nem curto espaço de tempo.',
      
      rg_title: 'Fotos para o RG e outros documentos',
      rg_paragraph: 'No longo da sua vida, irá sem dúvida precisar de uma foto para o seu RG, carteira de estudante, carteira de trabalho ou outro tipo de documento. Muitas pessoas acabar de ter medo de não respeitar os requisitos, também tirar a foto em casa o que é uma ótima ideia! Em primeiro lugar, veja se o tipo de foto que precisa e pergunta a alguém que tire a mesma por si. A seguir, carregue a foto no nosso editor e o qual adapta a foto aos requisitos oficiais de determinado país.',
      
      perfect_photo_title: 'Como tirar uma foto perfeita para o passaporte em casa?',
      perfect_photo_intro: 'Se decidir tirar uma fotografia para o seu passaporte em casa, deve ter este guia, pois irá ajudá-lo a tirar uma foto perfeita:',
      
      step_1: 'Peça a alguém para tirar a foto por si. Não tire uma selfie, pois resultará na rejeição da foto pelas autoridades.',
      step_2: 'Escolha um lugar em casa onde há uma boa iluminação. Mantenha-se a cerca de 0,5m da parede e a 1,5m da máquina fotográfica.',
      step_3: 'A foto deve ser tirada de frente e deve olhar diretamente para a câmera. Não incline a sua cabeça. Mantenha os olhos abertos e a boca fechada e uma expressão facial neutra. O seu rosto deve estar visível a 100%.',
      step_4: 'Escolha a foto que mais lhe agrada e carregue-a na nossa ferramenta, a qual irá adaptar a foto aos requisitos oficiais. Uma foto perfeita é enviada para o seu email, pronta a ser usada.',
      
      clothes_title: 'Que tipo de roupa devo usar quando tiro uma foto para o passaporte brasileiro?',
      clothes_paragraph: 'Um vestuário que deve respeitar é o fundo branco, ou seja, deve evitar usar roupas brancas pois poderá causar confusão. Deve também evitar o uso de roupa escura, roupas com motivos ou roupa com duas ou três cores.',
      
      errors_title: 'Os erros mais comuns nas fotos de passaporte',
      errors_intro: 'Existem alguns erros comuns que deve evitar. Se estiver a pensar tirar uma foto para o passaporte na rede em casa, leia isto cuidadosamente:',
      
      error_1_title: 'Má postura',
      error_1_description: 'Fotos não biométricas deve mostrar uma expressão facial neutra.',
      error_2_title: 'A foto tirada há muito tempo antes de solicitar o documento',
      error_2_description: 'Não use uma mudança visível na sua aparência.',
      error_3_title: 'Baixa resolução e má qualidade é um erro comum',
      error_3_description: 'A foto não pode estar pixelada, desfocada ou deficiente.',
      error_4_title: 'Não respeito às dúvidas',
      error_4_description: 'Não tire a foto para o passaporte brasileiro.',
      error_5_title: 'Formato ou dimensões incorretas',
      error_5_description: 'Existem requisitos especificamente às dimensões da foto para o passaporte brasileiro. Deve ter 5x7cm.',
      
      tool_title: 'Ferramenta de foto para passaporte',
      tool_paragraph: 'O nosso aplicativo de passaporte em linha ajudá-lo com a fotografia para o passaporte. Use as regras que deve seguir após utilização da foto em fotos compatíveis. Carregue a mesma no nosso aplicativo e aguarde um momento. Durante esse tempo, a ferramenta:',
      
      tool_feature_1: 'ajustará o tamanho da foto até aos requisitos oficiais, ajustando a resolução e as dimensões;',
      tool_feature_2: 'substituirá o fundo por um adequado;',
      tool_feature_3: 'testará a qualidade e fotografia de forma a que a sua a seu rosto esteja centrado;',
      tool_feature_4: 'verifica se a foto está de acordo com os requisitos oficiais - utilizando a melhor-a verificar, isto permite à ferramenta ver se existe qualquer tipo de serviços na foto, se a mesma está centrada (não tem ruído), se olhos bem visíveis, e muito mais.',
      
      iphone_title: 'Aplicativo de foto para passaporte para iPhone',
      iphone_paragraph: 'Se você um iPhone e precisa de uma foto para o passaporte, prepare-se para o sistema operativo iOS. Se a sua não é conveniente, de acordo com todos tem requisitos, não tem direito à verificação. Você pode resolver isso em casa. A foto pode também ser com o seu para os seus documentos de identificação a um preço acessível. Para se no App Store e faça download do aplicativo para seu iPhone.',
      
      android_title: 'Aplicação de foto para passaporte para Android',
      android_paragraph: 'Se tem um smartphone com sistema operativo Android, como por exemplo um Samsung, Huawei, HTC, Sony, Motorola ou outros modelos, pode utilizar o aplicativo passaporte grátis para obter uma foto profissional para o seu passaporte! Clique se no Google Store e descarregue o aplicativo na hora, na sua Android.',
      
      reasons_title: '5 razões pelas quais a ferramenta de fotografia é a melhor opção para tirar fotos para o passaporte',
      reasons_intro: 'A nossa ferramenta pode pode-lhes tirar uma foto para os seus documentos em casa utilizando o nosso aplicativo:',
      
      reason_1_title: 'É super fácil de usar',
      reason_1_description: 'e não tem de sair de casa;',
      reason_2_title: 'Pode tirar uma quantidade ilimitada de fotos',
      reason_2_description: 'o que lhe permite escolher a melhor;',
      reason_3_title: 'Qualidade profissional',
      reason_3_description: 'verifica se a foto está de acordo com os requisitos do aplicativo país;',
      reason_4_title: 'Poupa tempo e dinheiro',
      reason_4_description: '',
      reason_5_title: 'Garantimos que a sua foto',
      reason_5_description: 'será aceite pelas autoridades.'
    };
    
    // Set content as ready when loading is complete
    useEffect(() => {
      if (!loading) {
        const timer = setTimeout(() => {
          setContentReady(true);
        }, 800);
        return () => clearTimeout(timer);
      }
    }, [loading]);
    
    return (
      <section ref={ref} className="relative bg-white font-montserrat">
        {/* Gradient overlay */}
        <div 
          className="absolute top-0 left-0 right-0 h-[300px] bg-gradient-to-b from-[#D1E6F8] to-white"
          style={{ zIndex: 0 }}
        />
        
        <div className="relative max-w-4xl mx-auto px-4 pt-[120px]" style={{ zIndex: 1 }}>
          <h1 className="text-3xl font-bold mb-6">{guideContent.title}</h1>
          
          <p className="text-gray-600 mb-8">
            {guideContent.intro_paragraph}
          </p>

          <p className="text-gray-600 mb-8">
            {guideContent.article_info}
          </p>

          <ul className="list-disc pl-6 mb-12 text-gray-600">
            <li>{guideContent.bullet_1}</li>
            <li>{guideContent.bullet_2}</li>
            <li>{guideContent.bullet_3}</li>
            <li>{guideContent.bullet_4}</li>
          </ul>

          <h2 className="text-2xl font-bold mb-4">{guideContent.passport_title}</h2>
          <p className="text-gray-600 mb-8">
            {guideContent.passport_paragraph_1}
          </p>
          <p className="text-gray-600 mb-8">
            {guideContent.passport_paragraph_2}
          </p>

          <h2 className="text-2xl font-bold mb-4">{guideContent.visa_title}</h2>
          <p className="text-gray-600 mb-8">
            {guideContent.visa_paragraph}
          </p>

          <h2 className="text-2xl font-bold mb-4">{guideContent.cnh_title}</h2>
          <p className="text-gray-600 mb-8">
            {guideContent.cnh_paragraph}
          </p>

          <h2 className="text-2xl font-bold mb-4">{guideContent.rg_title}</h2>
          <p className="text-gray-600 mb-8">
            {guideContent.rg_paragraph}
          </p>

          <h2 className="text-2xl font-bold mb-4">{guideContent.perfect_photo_title}</h2>
          <p className="text-gray-600 mb-4">
            {guideContent.perfect_photo_intro}
          </p>

          <div className="space-y-6 mb-12">
            {[
              guideContent.step_1,
              guideContent.step_2,
              guideContent.step_3,
              guideContent.step_4
            ].map((text, index) => (
              <div key={index} className="flex items-start gap-4">
                <div 
                  className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center"
                  style={{
                    width: '32px',
                    height: '32px',
                    backgroundColor: '#F3E8FF',
                    color: '#9333EA'
                  }}
                >
                  <span className="font-semibold text-base">{index + 1}</span>
                </div>
                <p className="text-gray-600 flex-grow">{text}</p>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold mb-4">{guideContent.clothes_title}</h2>
          <p className="text-gray-600 mb-8">
            {guideContent.clothes_paragraph}
          </p>

          <h2 className="text-2xl font-bold mb-4">{guideContent.errors_title}</h2>
          <p className="text-gray-600 mb-4">
            {guideContent.errors_intro}
          </p>

          <ul className="list-disc pl-6 mb-12 text-gray-600">
            <li><span className="font-semibold">{guideContent.error_1_title}</span> - {guideContent.error_1_description}</li>
            <li><span className="font-semibold">{guideContent.error_2_title}</span> - {guideContent.error_2_description}</li>
            <li><span className="font-semibold">{guideContent.error_3_title}</span> - {guideContent.error_3_description}</li>
            <li><span className="font-semibold">{guideContent.error_4_title}</span> - {guideContent.error_4_description}</li>
            <li><span className="font-semibold">{guideContent.error_5_title}</span> - {guideContent.error_5_description}</li>
          </ul>

          <h2 className="text-2xl font-bold mb-4">{guideContent.tool_title}</h2>
          <p className="text-gray-600 mb-8">
            {guideContent.tool_paragraph}
          </p>

          <ul className="list-disc pl-6 mb-12 text-gray-600">
            <li>{guideContent.tool_feature_1}</li>
            <li>{guideContent.tool_feature_2}</li>
            <li>{guideContent.tool_feature_3}</li>
            <li>{guideContent.tool_feature_4}</li>
          </ul>

          <h2 className="text-2xl font-bold mb-4">{guideContent.iphone_title}</h2>
          <p className="text-gray-600 mb-8">
            {guideContent.iphone_paragraph}
          </p>

          <h2 className="text-2xl font-bold mb-4">{guideContent.android_title}</h2>
          <p className="text-gray-600 mb-8">
            {guideContent.android_paragraph}
          </p>

          <h2 className="text-2xl font-bold mb-4">{guideContent.reasons_title}</h2>
          <p className="text-gray-600 mb-4">
            {guideContent.reasons_intro}
          </p>

          <ul className="list-disc pl-6 mb-12 text-gray-600">
            <li><span className="font-semibold">{guideContent.reason_1_title}</span> {guideContent.reason_1_description}</li>
            <li><span className="font-semibold">{guideContent.reason_2_title}</span> {guideContent.reason_2_description}</li>
            <li><span className="font-semibold">{guideContent.reason_3_title}</span> {guideContent.reason_3_description}</li>
            <li><span className="font-semibold">{guideContent.reason_4_title}</span> {guideContent.reason_4_description}</li>
            <li><span className="font-semibold">{guideContent.reason_5_title}</span> {guideContent.reason_5_description}</li>
          </ul>
        </div>
      </section>
    );
  }
);

PassportGuide.displayName = 'PassportGuide';

export default PassportGuide; 