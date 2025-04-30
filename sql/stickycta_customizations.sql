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
    
    -- Texto do botão StickyCTA
    IF EXISTS (
        SELECT 1 FROM content_customizations 
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'StickyCTA' 
        AND element_id = 'buttonText'
    ) THEN
        UPDATE content_customizations 
        SET custom_value = 'Escolha o documento'
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'StickyCTA' 
        AND element_id = 'buttonText';
    ELSE
        INSERT INTO content_customizations 
            (entity_id, entity_type, component, element_id, element_type, original_value, custom_value)
        VALUES
            (page_entity_id, 'page', 'StickyCTA', 'buttonText', 'text', 'Escolha o documento', 'Escolha o documento');
    END IF;
    
    -- Link do botão StickyCTA
    IF EXISTS (
        SELECT 1 FROM content_customizations 
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'StickyCTA' 
        AND element_id = 'buttonLink'
    ) THEN
        UPDATE content_customizations 
        SET custom_value = '/upload'
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'StickyCTA' 
        AND element_id = 'buttonLink';
    ELSE
        INSERT INTO content_customizations 
            (entity_id, entity_type, component, element_id, element_type, original_value, custom_value)
        VALUES
            (page_entity_id, 'page', 'StickyCTA', 'buttonLink', 'link', '/upload', '/upload');
    END IF;
    
    -- Cor inicial do gradiente
    IF EXISTS (
        SELECT 1 FROM content_customizations 
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'StickyCTA' 
        AND element_id = 'gradientStartColor'
    ) THEN
        UPDATE content_customizations 
        SET custom_value = '#6A0FDA'
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'StickyCTA' 
        AND element_id = 'gradientStartColor';
    ELSE
        INSERT INTO content_customizations 
            (entity_id, entity_type, component, element_id, element_type, original_value, custom_value)
        VALUES
            (page_entity_id, 'page', 'StickyCTA', 'gradientStartColor', 'text', '#6A0FDA', '#6A0FDA');
    END IF;
    
    -- Cor final do gradiente
    IF EXISTS (
        SELECT 1 FROM content_customizations 
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'StickyCTA' 
        AND element_id = 'gradientEndColor'
    ) THEN
        UPDATE content_customizations 
        SET custom_value = '#B45DEB'
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'StickyCTA' 
        AND element_id = 'gradientEndColor';
    ELSE
        INSERT INTO content_customizations 
            (entity_id, entity_type, component, element_id, element_type, original_value, custom_value)
        VALUES
            (page_entity_id, 'page', 'StickyCTA', 'gradientEndColor', 'text', '#B45DEB', '#B45DEB');
    END IF;
    
    -- Cor da linha superior
    IF EXISTS (
        SELECT 1 FROM content_customizations 
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'StickyCTA' 
        AND element_id = 'topLineColor'
    ) THEN
        UPDATE content_customizations 
        SET custom_value = 'linear-gradient(to right, #6A0FDA, #B45DEB)'
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'StickyCTA' 
        AND element_id = 'topLineColor';
    ELSE
        INSERT INTO content_customizations 
            (entity_id, entity_type, component, element_id, element_type, original_value, custom_value)
        VALUES
            (page_entity_id, 'page', 'StickyCTA', 'topLineColor', 'text', 'linear-gradient(to right, #6A0FDA, #B45DEB)', 'linear-gradient(to right, #6A0FDA, #B45DEB)');
    END IF;
    
    -- Cor de fundo
    IF EXISTS (
        SELECT 1 FROM content_customizations 
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'StickyCTA' 
        AND element_id = 'backgroundColor'
    ) THEN
        UPDATE content_customizations 
        SET custom_value = '#F1F6FA'
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'StickyCTA' 
        AND element_id = 'backgroundColor';
    ELSE
        INSERT INTO content_customizations 
            (entity_id, entity_type, component, element_id, element_type, original_value, custom_value)
        VALUES
            (page_entity_id, 'page', 'StickyCTA', 'backgroundColor', 'text', '#F1F6FA', '#F1F6FA');
    END IF;
    
END $$; 