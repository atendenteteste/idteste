DO $$
DECLARE
    page_id uuid;
    page_entity_id uuid;
BEGIN
    -- Verificar se a página com slug 'pt-br' existe
    SELECT id INTO page_id FROM pages WHERE slug = 'pt-br';
    
    -- Se a página não existir, criar
    IF page_id IS NULL THEN
        INSERT INTO pages (slug, title, is_active)
        VALUES ('pt-br', 'Português (Brasil)', true)
        RETURNING id INTO page_id;
    END IF;
    
    page_entity_id := page_id;
    
    -- Título Tag da seção FAQ
    IF EXISTS (
        SELECT 1 FROM content_customizations 
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'FAQ' 
        AND element_id = 'sectionTag'
    ) THEN
        UPDATE content_customizations 
        SET custom_value = 'FAQ'
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'FAQ' 
        AND element_id = 'sectionTag';
    ELSE
        INSERT INTO content_customizations 
            (entity_id, entity_type, component, element_id, element_type, original_value, custom_value)
        VALUES
            (page_entity_id, 'page', 'FAQ', 'sectionTag', 'text', 'FAQ', 'FAQ');
    END IF;
    
    -- Título da seção FAQ
    IF EXISTS (
        SELECT 1 FROM content_customizations 
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'FAQ' 
        AND element_id = 'sectionTitle'
    ) THEN
        UPDATE content_customizations 
        SET custom_value = 'Tire suas dúvidas nas perguntas frequentes'
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'FAQ' 
        AND element_id = 'sectionTitle';
    ELSE
        INSERT INTO content_customizations 
            (entity_id, entity_type, component, element_id, element_type, original_value, custom_value)
        VALUES
            (page_entity_id, 'page', 'FAQ', 'sectionTitle', 'text', 'Tire suas dúvidas nas perguntas frequentes', 'Tire suas dúvidas nas perguntas frequentes');
    END IF;
    
    -- Texto do botão CTA
    IF EXISTS (
        SELECT 1 FROM content_customizations 
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'FAQ' 
        AND element_id = 'ctaButtonText'
    ) THEN
        UPDATE content_customizations 
        SET custom_value = 'Escolha o documento'
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'FAQ' 
        AND element_id = 'ctaButtonText';
    ELSE
        INSERT INTO content_customizations 
            (entity_id, entity_type, component, element_id, element_type, original_value, custom_value)
        VALUES
            (page_entity_id, 'page', 'FAQ', 'ctaButtonText', 'text', 'Escolha o documento', 'Escolha o documento');
    END IF;
    
    -- Link do botão CTA
    IF EXISTS (
        SELECT 1 FROM content_customizations 
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'FAQ' 
        AND element_id = 'ctaButtonLink'
    ) THEN
        UPDATE content_customizations 
        SET custom_value = '/upload'
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'FAQ' 
        AND element_id = 'ctaButtonLink';
    ELSE
        INSERT INTO content_customizations 
            (entity_id, entity_type, component, element_id, element_type, original_value, custom_value)
        VALUES
            (page_entity_id, 'page', 'FAQ', 'ctaButtonLink', 'link', '/upload', '/upload');
    END IF;
    
    -- Pergunta 1
    IF EXISTS (
        SELECT 1 FROM content_customizations 
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'FAQ' 
        AND element_id = 'question1'
    ) THEN
        UPDATE content_customizations 
        SET custom_value = 'O PhotoID está em conformidade com os requisitos de fotos para passaporte Brasileiro?'
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'FAQ' 
        AND element_id = 'question1';
    ELSE
        INSERT INTO content_customizations 
            (entity_id, entity_type, component, element_id, element_type, original_value, custom_value)
        VALUES
            (page_entity_id, 'page', 'FAQ', 'question1', 'text', 'O PhotoID está em conformidade com os requisitos de fotos para passaporte Brasileiro?', 'O PhotoID está em conformidade com os requisitos de fotos para passaporte Brasileiro?');
    END IF;
    
    -- Resposta 1
    IF EXISTS (
        SELECT 1 FROM content_customizations 
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'FAQ' 
        AND element_id = 'answer1'
    ) THEN
        UPDATE content_customizations 
        SET custom_value = 'Sim, nosso serviço está totalmente em conformidade com todos os requisitos oficiais para fotos de passaporte brasileiro. Garantimos que suas fotos serão aceitas pelas autoridades.'
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'FAQ' 
        AND element_id = 'answer1';
    ELSE
        INSERT INTO content_customizations 
            (entity_id, entity_type, component, element_id, element_type, original_value, custom_value)
        VALUES
            (page_entity_id, 'page', 'FAQ', 'answer1', 'text', 'Sim, nosso serviço está totalmente em conformidade com todos os requisitos oficiais para fotos de passaporte brasileiro. Garantimos que suas fotos serão aceitas pelas autoridades.', 'Sim, nosso serviço está totalmente em conformidade com todos os requisitos oficiais para fotos de passaporte brasileiro. Garantimos que suas fotos serão aceitas pelas autoridades.');
    END IF;
    
    -- Pergunta 2
    IF EXISTS (
        SELECT 1 FROM content_customizations 
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'FAQ' 
        AND element_id = 'question2'
    ) THEN
        UPDATE content_customizations 
        SET custom_value = 'E quanto a outros documentos de identificação com foto e papel?'
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'FAQ' 
        AND element_id = 'question2';
    ELSE
        INSERT INTO content_customizations 
            (entity_id, entity_type, component, element_id, element_type, original_value, custom_value)
        VALUES
            (page_entity_id, 'page', 'FAQ', 'question2', 'text', 'E quanto a outros documentos de identificação com foto e papel?', 'E quanto a outros documentos de identificação com foto e papel?');
    END IF;
    
    -- Resposta 2
    IF EXISTS (
        SELECT 1 FROM content_customizations 
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'FAQ' 
        AND element_id = 'answer2'
    ) THEN
        UPDATE content_customizations 
        SET custom_value = 'Nosso serviço suporta vários tipos de documentos, incluindo RG, CNH, vistos, carteiras profissionais e outros documentos de identificação com foto. Temos padrões específicos para cada tipo de documento.'
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'FAQ' 
        AND element_id = 'answer2';
    ELSE
        INSERT INTO content_customizations 
            (entity_id, entity_type, component, element_id, element_type, original_value, custom_value)
        VALUES
            (page_entity_id, 'page', 'FAQ', 'answer2', 'text', 'Nosso serviço suporta vários tipos de documentos, incluindo RG, CNH, vistos, carteiras profissionais e outros documentos de identificação com foto. Temos padrões específicos para cada tipo de documento.', 'Nosso serviço suporta vários tipos de documentos, incluindo RG, CNH, vistos, carteiras profissionais e outros documentos de identificação com foto. Temos padrões específicos para cada tipo de documento.');
    END IF;
    
    -- Pergunta 3
    IF EXISTS (
        SELECT 1 FROM content_customizations 
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'FAQ' 
        AND element_id = 'question3'
    ) THEN
        UPDATE content_customizations 
        SET custom_value = 'Onde posso imprimir as fotos do meu passaporte?'
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'FAQ' 
        AND element_id = 'question3';
    ELSE
        INSERT INTO content_customizations 
            (entity_id, entity_type, component, element_id, element_type, original_value, custom_value)
        VALUES
            (page_entity_id, 'page', 'FAQ', 'question3', 'text', 'Onde posso imprimir as fotos do meu passaporte?', 'Onde posso imprimir as fotos do meu passaporte?');
    END IF;
    
    -- Resposta 3
    IF EXISTS (
        SELECT 1 FROM content_customizations 
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'FAQ' 
        AND element_id = 'answer3'
    ) THEN
        UPDATE content_customizations 
        SET custom_value = 'Você pode imprimir suas fotos em qualquer gráfica, papelaria ou loja de fotografia. Fornecemos arquivos em alta resolução que podem ser impressos no formato correto para seu documento.'
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'FAQ' 
        AND element_id = 'answer3';
    ELSE
        INSERT INTO content_customizations 
            (entity_id, entity_type, component, element_id, element_type, original_value, custom_value)
        VALUES
            (page_entity_id, 'page', 'FAQ', 'answer3', 'text', 'Você pode imprimir suas fotos em qualquer gráfica, papelaria ou loja de fotografia. Fornecemos arquivos em alta resolução que podem ser impressos no formato correto para seu documento.', 'Você pode imprimir suas fotos em qualquer gráfica, papelaria ou loja de fotografia. Fornecemos arquivos em alta resolução que podem ser impressos no formato correto para seu documento.');
    END IF;
    
    -- Pergunta 4
    IF EXISTS (
        SELECT 1 FROM content_customizations 
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'FAQ' 
        AND element_id = 'question4'
    ) THEN
        UPDATE content_customizations 
        SET custom_value = 'O que está incluso na garantia pós-projeto?'
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'FAQ' 
        AND element_id = 'question4';
    ELSE
        INSERT INTO content_customizations 
            (entity_id, entity_type, component, element_id, element_type, original_value, custom_value)
        VALUES
            (page_entity_id, 'page', 'FAQ', 'question4', 'text', 'O que está incluso na garantia pós-projeto?', 'O que está incluso na garantia pós-projeto?');
    END IF;
    
    -- Resposta 4
    IF EXISTS (
        SELECT 1 FROM content_customizations 
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'FAQ' 
        AND element_id = 'answer4'
    ) THEN
        UPDATE content_customizations 
        SET custom_value = 'Nossa garantia inclui o compromisso de que suas fotos serão aceitas pelas autoridades. Se sua foto for rejeitada por qualquer razão técnica que seja nossa responsabilidade, oferecemos reembolso total ou fazemos os ajustes necessários gratuitamente.'
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'FAQ' 
        AND element_id = 'answer4';
    ELSE
        INSERT INTO content_customizations 
            (entity_id, entity_type, component, element_id, element_type, original_value, custom_value)
        VALUES
            (page_entity_id, 'page', 'FAQ', 'answer4', 'text', 'Nossa garantia inclui o compromisso de que suas fotos serão aceitas pelas autoridades. Se sua foto for rejeitada por qualquer razão técnica que seja nossa responsabilidade, oferecemos reembolso total ou fazemos os ajustes necessários gratuitamente.', 'Nossa garantia inclui o compromisso de que suas fotos serão aceitas pelas autoridades. Se sua foto for rejeitada por qualquer razão técnica que seja nossa responsabilidade, oferecemos reembolso total ou fazemos os ajustes necessários gratuitamente.');
    END IF;
    
    -- Pergunta 5
    IF EXISTS (
        SELECT 1 FROM content_customizations 
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'FAQ' 
        AND element_id = 'question5'
    ) THEN
        UPDATE content_customizations 
        SET custom_value = 'O que é um criador de foto para passaporte?'
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'FAQ' 
        AND element_id = 'question5';
    ELSE
        INSERT INTO content_customizations 
            (entity_id, entity_type, component, element_id, element_type, original_value, custom_value)
        VALUES
            (page_entity_id, 'page', 'FAQ', 'question5', 'text', 'O que é um criador de foto para passaporte?', 'O que é um criador de foto para passaporte?');
    END IF;
    
    -- Resposta 5
    IF EXISTS (
        SELECT 1 FROM content_customizations 
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'FAQ' 
        AND element_id = 'answer5'
    ) THEN
        UPDATE content_customizations 
        SET custom_value = 'Um criador de foto para passaporte é uma ferramenta que permite que você tire, ajuste e prepare fotos que atendam aos requisitos específicos de documentos oficiais, como passaportes, vistos e outros documentos de identificação.'
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'FAQ' 
        AND element_id = 'answer5';
    ELSE
        INSERT INTO content_customizations 
            (entity_id, entity_type, component, element_id, element_type, original_value, custom_value)
        VALUES
            (page_entity_id, 'page', 'FAQ', 'answer5', 'text', 'Um criador de foto para passaporte é uma ferramenta que permite que você tire, ajuste e prepare fotos que atendam aos requisitos específicos de documentos oficiais, como passaportes, vistos e outros documentos de identificação.', 'Um criador de foto para passaporte é uma ferramenta que permite que você tire, ajuste e prepare fotos que atendam aos requisitos específicos de documentos oficiais, como passaportes, vistos e outros documentos de identificação.');
    END IF;
    
    -- Pergunta 6
    IF EXISTS (
        SELECT 1 FROM content_customizations 
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'FAQ' 
        AND element_id = 'question6'
    ) THEN
        UPDATE content_customizations 
        SET custom_value = 'O PhotoID é seguro?'
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'FAQ' 
        AND element_id = 'question6';
    ELSE
        INSERT INTO content_customizations 
            (entity_id, entity_type, component, element_id, element_type, original_value, custom_value)
        VALUES
            (page_entity_id, 'page', 'FAQ', 'question6', 'text', 'O PhotoID é seguro?', 'O PhotoID é seguro?');
    END IF;
    
    -- Resposta 6
    IF EXISTS (
        SELECT 1 FROM content_customizations 
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'FAQ' 
        AND element_id = 'answer6'
    ) THEN
        UPDATE content_customizations 
        SET custom_value = 'Sim, o PhotoID é 100% seguro. Utilizamos conexões criptografadas para transferência de dados e não armazenamos suas fotos permanentemente após o processamento. Sua privacidade e segurança são nossas prioridades.'
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'FAQ' 
        AND element_id = 'answer6';
    ELSE
        INSERT INTO content_customizations 
            (entity_id, entity_type, component, element_id, element_type, original_value, custom_value)
        VALUES
            (page_entity_id, 'page', 'FAQ', 'answer6', 'text', 'Sim, o PhotoID é 100% seguro. Utilizamos conexões criptografadas para transferência de dados e não armazenamos suas fotos permanentemente após o processamento. Sua privacidade e segurança são nossas prioridades.', 'Sim, o PhotoID é 100% seguro. Utilizamos conexões criptografadas para transferência de dados e não armazenamos suas fotos permanentemente após o processamento. Sua privacidade e segurança são nossas prioridades.');
    END IF;
    
    -- Pergunta 7
    IF EXISTS (
        SELECT 1 FROM content_customizations 
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'FAQ' 
        AND element_id = 'question7'
    ) THEN
        UPDATE content_customizations 
        SET custom_value = 'Como funciona o processo de compra?'
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'FAQ' 
        AND element_id = 'question7';
    ELSE
        INSERT INTO content_customizations 
            (entity_id, entity_type, component, element_id, element_type, original_value, custom_value)
        VALUES
            (page_entity_id, 'page', 'FAQ', 'question7', 'text', 'Como funciona o processo de compra?', 'Como funciona o processo de compra?');
    END IF;
    
    -- Resposta 7
    IF EXISTS (
        SELECT 1 FROM content_customizations 
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'FAQ' 
        AND element_id = 'answer7'
    ) THEN
        UPDATE content_customizations 
        SET custom_value = 'O processo é simples: faça o upload de sua foto, nossa IA ajustará automaticamente para atender aos requisitos, você receberá uma versão prévia para aprovação e, após o pagamento, receberá os arquivos finais em alta resolução prontos para impressão.'
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'FAQ' 
        AND element_id = 'answer7';
    ELSE
        INSERT INTO content_customizations 
            (entity_id, entity_type, component, element_id, element_type, original_value, custom_value)
        VALUES
            (page_entity_id, 'page', 'FAQ', 'answer7', 'text', 'O processo é simples: faça o upload de sua foto, nossa IA ajustará automaticamente para atender aos requisitos, você receberá uma versão prévia para aprovação e, após o pagamento, receberá os arquivos finais em alta resolução prontos para impressão.', 'O processo é simples: faça o upload de sua foto, nossa IA ajustará automaticamente para atender aos requisitos, você receberá uma versão prévia para aprovação e, após o pagamento, receberá os arquivos finais em alta resolução prontos para impressão.');
    END IF;
    
END $$; 