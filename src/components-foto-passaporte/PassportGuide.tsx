"use client"

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useProductContent } from '../lib/hooks';

const PassportGuide = React.forwardRef<HTMLDivElement>(
  (props, ref) => {
    // Get the current locale and product from the URL
    const params = useParams();
    const locale = params?.locale as string || 'pt-br';
    const product = params?.product as string || 'foto-passaporte';
    
    // State to track if content is fully ready
    const [contentReady, setContentReady] = useState(false);
    
    // Get customized content based on the current product
    const { content, loading } = useProductContent(product);
    
    // Get PassportGuide content with fallback to default HTML
    const guideContent = content.PassportGuide || {
      html_content: `<section class="relative bg-white font-montserrat">
        <!-- Gradient overlay -->
        <div 
          class="absolute top-0 left-0 right-0 h-[300px] bg-gradient-to-b from-[#D1E6F8] to-white"
          style="z-index: 0"
        ></div>
        
        <div class="relative max-w-4xl mx-auto px-4 pt-[120px]" style="z-index: 1">
          <h1 class="text-3xl font-bold mb-6">Gerador de fotos de passaporte</h1>
          
          <p class="text-gray-600 mb-8">
            Em algum ponto da nossa vida, todos nós precisamos de uma foto para o passaporte. Agora você não precisa mais se estressar ou procurar os serviços de uma fotografia profissional para obter essas fotos. Uma solução mais fácil é simplesmente você aproveitar e utilizar o nosso verificador e ajustador de fotos online, que verifica e ajusta a mesma à especificações corretas. É mais rápido e barato.
          </p>

          <p class="text-gray-600 mb-8">
            Neste artigo você encontrará informações relevantessobre:
          </p>

          <ul class="list-disc pl-6 mb-12 text-gray-600">
            <li>os requisitos da foto para o passaporte brasileiro</li>
            <li>como tirar uma foto perfeita para o passaporte do visto em casa</li>
            <li>qual tipo de roupa você deve usar quando tirar a foto para o passaporte</li>
            <li>erros comuns cometidos</li>
          </ul>

          <h2 class="text-2xl font-bold mb-4">Fotos para o passaporte</h2>
          <p class="text-gray-600 mb-8">
            Hoje em dia são utilizadas fotos biométricas na maioria dos documentos de identificação. A pessoa deve estar posicionada em frente à câmera e olhar diretamente para a lente. Não pode sorrir, pois deve manter uma expressão facial neutra. Uma foto para um passaporte brasileiro deve ter 5x7 cm.
          </p>
          <p class="text-gray-600 mb-8">
            A foto deve ser tirada a cores com fundo branco. Todo o seu rosto deve estar bem visível, ou seja, o uso de óculos não é permitido. O uso de lenços por motivos religiosos é permitido. Precisa garantir uma boa iluminação no seu rosto, não pode conter um fundo preto.
          </p>

          <h2 class="text-2xl font-bold mb-4">Fotos para o visto</h2>
          <p class="text-gray-600 mb-8">
            Em algum ponto da nossa vida, todos nós precisamos de uma foto para o passaporte. Não precisa de solicitar os serviços de uma fotografo profissional para obter tal foto. Uma solução mais fácil é pedir a alguém que tire uma foto sua utilizando o nosso verificador e validador de fotos online, que verifica e ajusta a mesma à especificação do Brasil. É mais rápido e barato.
          </p>

          <h2 class="text-2xl font-bold mb-4">Fotos para a CNH</h2>
          <p class="text-gray-600 mb-8">
            Você não precisa ir a um estúdio para tirar foto biométrica, a foto do fotógrafo é exigida onde quer que precise ou carteira de motorista. A nossa ferramenta fotográfica irá ajudá-lo a tirar uma foto para CNH ou acordo com os requisitos oficiais de uma grande variedade de países. Pode o alguém que tem uma foto para o e entregá-la no aplicativo. Finalizamos-lhe a mesma para o uso em até nem curto espaço de tempo.
          </p>

          <h2 class="text-2xl font-bold mb-4">Fotos para o RG e outros documentos</h2>
          <p class="text-gray-600 mb-8">
            No longo da sua vida, irá sem dúvida precisar de uma foto para o seu RG, carteira de estudante, carteira de trabalho ou outro tipo de documento. Muitas pessoas acabar de ter medo de não respeitar os requisitos, também tirar a foto em casa o que é uma ótima ideia! Em primeiro lugar, veja se o tipo de foto que precisa e pergunta a alguém que tire a mesma por si. A seguir, carregue a foto no nosso editor e o qual adapta a foto aos requisitos oficiais de determinado país.
          </p>

          <h2 class="text-2xl font-bold mb-4">Como tirar uma foto perfeita para o passaporte em casa?</h2>
          <p class="text-gray-600 mb-8">
            Se decidir tirar uma fotografia para o seu passaporte em casa, deve ter este guia, pois irá ajudá-lo a tirar uma foto perfeita:
          </p>

          <div class="space-y-6 mb-12">
            <div class="flex items-start gap-4">
              <div 
                class="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center"
                style="width: 32px; height: 32px; background-color: #F3E8FF; color: #9333EA"
              >
                <span class="font-semibold text-base">1</span>
              </div>
              <p class="text-gray-600 flex-grow">Peça a alguém para tirar a foto por si. Não tire uma selfie, pois resultará na rejeição da foto pelas autoridades.</p>
            </div>
            <div class="flex items-start gap-4">
              <div 
                class="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center"
                style="width: 32px; height: 32px; background-color: #F3E8FF; color: #9333EA"
              >
                <span class="font-semibold text-base">2</span>
              </div>
              <p class="text-gray-600 flex-grow">Escolha um lugar em casa onde há uma boa iluminação. Mantenha-se a cerca de 0,5m da parede e a 1,5m da máquina fotográfica.</p>
            </div>
            <div class="flex items-start gap-4">
              <div 
                class="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center"
                style="width: 32px; height: 32px; background-color: #F3E8FF; color: #9333EA"
              >
                <span class="font-semibold text-base">3</span>
              </div>
              <p class="text-gray-600 flex-grow">A foto deve ser tirada de frente e deve olhar diretamente para a câmera. Não incline a sua cabeça. Mantenha os olhos abertos e a boca fechada e uma expressão facial neutra. O seu rosto deve estar visível a 100%.</p>
            </div>
            <div class="flex items-start gap-4">
              <div 
                class="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center"
                style="width: 32px; height: 32px; background-color: #F3E8FF; color: #9333EA"
              >
                <span class="font-semibold text-base">4</span>
              </div>
              <p class="text-gray-600 flex-grow">Escolha a foto que mais lhe agrada e carregue-a na nossa ferramenta, a qual irá adaptar a foto aos requisitos oficiais. Uma foto perfeita é enviada para o seu email, pronta a ser usada.</p>
            </div>
          </div>

          <h2 class="text-2xl font-bold mb-4">Que tipo de roupa devo usar quando tiro uma foto para o passaporte brasileiro?</h2>
          <p class="text-gray-600 mb-8">
            Um vestuário que deve respeitar é o fundo branco, ou seja, deve evitar usar roupas brancas pois poderá causar confusão. Deve também evitar o uso de roupa escura, roupas com motivos ou roupa com duas ou três cores.
          </p>

          <h2 class="text-2xl font-bold mb-4">Os erros mais comuns nas fotos de passaporte</h2>
          <p class="text-gray-600 mb-4">
            Existem alguns erros comuns que deve evitar. Se estiver a pensar tirar uma foto para o passaporte na rede em casa, leia isto cuidadosamente:
          </p>

          <ul class="list-disc pl-6 mb-12 text-gray-600">
            <li><span class="font-semibold">Má postura</span> - Fotos não biométricas deve mostrar uma expressão facial neutra.</li>
            <li><span class="font-semibold">A foto tirada há muito tempo antes de solicitar o documento</span> - Não use uma mudança visível na sua aparência.</li>
            <li><span class="font-semibold">Baixa resolução e má qualidade é um erro comum</span> - A foto não pode estar pixelada, desfocada ou deficiente.</li>
            <li><span class="font-semibold">Não respeito às dúvidas</span> - Não tire a foto para o passaporte brasileiro.</li>
            <li><span class="font-semibold">Formato ou dimensões incorretas</span> - Existem requisitos especificamente às dimensões da foto para o passaporte brasileiro. Deve ter 5x7cm.</li>
          </ul>

          <h2 class="text-2xl font-bold mb-4">Ferramenta de foto para passaporte</h2>
          <p class="text-gray-600 mb-8">
            O nosso aplicativo de passaporte em linha ajudá-lo com a fotografia para o passaporte. Use as regras que deve seguir após utilização da foto em fotos compatíveis. Carregue a mesma no nosso aplicativo e aguarde um momento. Durante esse tempo, a ferramenta:
          </p>

          <ul class="list-disc pl-6 mb-12 text-gray-600">
            <li>ajustará o tamanho da foto até aos requisitos oficiais, ajustando a resolução e as dimensões;</li>
            <li>substituirá o fundo por um adequado;</li>
            <li>testará a qualidade e fotografia de forma a que a sua a seu rosto esteja centrado;</li>
            <li>verifica se a foto está de acordo com os requisitos oficiais - utilizando a melhor-a verificar, isto permite à ferramenta ver se existe qualquer tipo de serviços na foto, se a mesma está centrada (não tem ruído), se olhos bem visíveis, e muito mais.</li>
          </ul>

          <h2 class="text-2xl font-bold mb-4">Aplicativo de foto para passaporte para iPhone</h2>
          <p class="text-gray-600 mb-8">
            Se você um iPhone e precisa de uma foto para o passaporte, prepare-se para o sistema operativo iOS. Se a sua não é conveniente, de acordo com todos tem requisitos, não tem direito à verificação. Você pode resolver isso em casa. A foto pode também ser com o seu para os seus documentos de identificação a um preço acessível. Para se no App Store e faça download do aplicativo para seu iPhone.
          </p>

          <h2 class="text-2xl font-bold mb-4">Aplicação de foto para passaporte para Android</h2>
          <p class="text-gray-600 mb-8">
            Se tem um smartphone com sistema operativo Android, como por exemplo um Samsung, Huawei, HTC, Sony, Motorola ou outros modelos, pode utilizar o aplicativo passaporte grátis para obter uma foto profissional para o seu passaporte! Clique se no Google Store e descarregue o aplicativo na hora, na sua Android.
          </p>

          <h2 class="text-2xl font-bold mb-4">5 razões pelas quais a ferramenta de fotografia é a melhor opção para tirar fotos para o passaporte</h2>
          <p class="text-gray-600 mb-4">
            A nossa ferramenta pode pode-lhes tirar uma foto para os seus documentos em casa utilizando o nosso aplicativo:
          </p>

          <ul class="list-disc pl-6 mb-12 text-gray-600">
            <li><span class="font-semibold">É super fácil de usar</span> e não tem de sair de casa;</li>
            <li><span class="font-semibold">Pode tirar uma quantidade ilimitada de fotos</span> o que lhe permite escolher a melhor;</li>
            <li><span class="font-semibold">Qualidade profissional</span> verifica se a foto está de acordo com os requisitos do aplicativo país;</li>
            <li><span class="font-semibold">Poupa tempo e dinheiro</span></li>
            <li><span class="font-semibold">Garantimos que a sua foto</span> será aceite pelas autoridades.</li>
          </ul>
        </div>
      </section>`
    };
    
    // useEffect to mark content as ready when loading is complete
    useEffect(() => {
      if (!loading) {
        setContentReady(true);
      }
    }, [loading]);
    
    return (
      <div
        ref={ref}
        dangerouslySetInnerHTML={{ __html: guideContent.html_content }}
      />
    );
  }
);

PassportGuide.displayName = 'PassportGuide';

export default PassportGuide; 