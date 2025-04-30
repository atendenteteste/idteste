import Layout from '../../components/layout/Layout';
import HowItWorks from '../../components/HowItWorks';

export default function ComoFuncionaPage() {
  return (
    <Layout>
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h1 className="text-4xl font-bold mb-8 text-center">Como funciona o PhotoID?</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto text-center mb-12">
            O PhotoID utiliza tecnologia de inteligência artificial para criar fotos perfeitas para documentos.
            Nosso processo é simples, rápido e eficiente.
          </p>
        </div>
      </div>
      
      <HowItWorks />
      
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="bg-gray-50 rounded-xl p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-6 text-center">Pronto para tirar sua foto?</h2>
            <p className="text-lg text-gray-600 text-center mb-8 max-w-xl mx-auto">
              Tire sua foto perfeita para documentos em menos de 30 segundos com nossa tecnologia avançada de IA.
            </p>
            <div className="flex justify-center">
              <a href="/upload" className="inline-block px-6 py-3 rounded-full bg-purple-600 text-white font-medium hover:bg-purple-700 transition-colors">
                Escolha o documento
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
} 