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
    
    -- Copyright Text
    IF EXISTS (
        SELECT 1 FROM content_customizations 
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'Footer' 
        AND element_id = 'copyrightText'
    ) THEN
        UPDATE content_customizations 
        SET custom_value = '© 2023 SiteID - Todos os direitos reservados'
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'Footer' 
        AND element_id = 'copyrightText';
    ELSE
        INSERT INTO content_customizations 
            (entity_id, entity_type, component, element_id, element_type, original_value, custom_value)
        VALUES
            (page_entity_id, 'page', 'Footer', 'copyrightText', 'text', '© 2023 SiteID - Todos os direitos reservados', '© 2023 SiteID - Todos os direitos reservados');
    END IF;
    
    -- Título da coluna Recursos
    IF EXISTS (
        SELECT 1 FROM content_customizations 
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'Footer' 
        AND element_id = 'resourcesTitle'
    ) THEN
        UPDATE content_customizations 
        SET custom_value = 'Recursos'
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'Footer' 
        AND element_id = 'resourcesTitle';
    ELSE
        INSERT INTO content_customizations 
            (entity_id, entity_type, component, element_id, element_type, original_value, custom_value)
        VALUES
            (page_entity_id, 'page', 'Footer', 'resourcesTitle', 'text', 'Recursos', 'Recursos');
    END IF;
    
    -- Título da coluna Documentos
    IF EXISTS (
        SELECT 1 FROM content_customizations 
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'Footer' 
        AND element_id = 'documentsTitle'
    ) THEN
        UPDATE content_customizations 
        SET custom_value = 'Documentos'
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'Footer' 
        AND element_id = 'documentsTitle';
    ELSE
        INSERT INTO content_customizations 
            (entity_id, entity_type, component, element_id, element_type, original_value, custom_value)
        VALUES
            (page_entity_id, 'page', 'Footer', 'documentsTitle', 'text', 'Documentos', 'Documentos');
    END IF;
    
    -- Título da coluna Links Úteis
    IF EXISTS (
        SELECT 1 FROM content_customizations 
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'Footer' 
        AND element_id = 'usefulLinksTitle'
    ) THEN
        UPDATE content_customizations 
        SET custom_value = 'Links úteis'
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'Footer' 
        AND element_id = 'usefulLinksTitle';
    ELSE
        INSERT INTO content_customizations 
            (entity_id, entity_type, component, element_id, element_type, original_value, custom_value)
        VALUES
            (page_entity_id, 'page', 'Footer', 'usefulLinksTitle', 'text', 'Links úteis', 'Links úteis');
    END IF;
    
    -- RECURSOS - Link 1 (Foto para passaporte)
    IF EXISTS (
        SELECT 1 FROM content_customizations 
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'Footer' 
        AND element_id = 'resource1Text'
    ) THEN
        UPDATE content_customizations 
        SET custom_value = 'Foto para passaporte'
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'Footer' 
        AND element_id = 'resource1Text';
    ELSE
        INSERT INTO content_customizations 
            (entity_id, entity_type, component, element_id, element_type, original_value, custom_value)
        VALUES
            (page_entity_id, 'page', 'Footer', 'resource1Text', 'text', 'Foto para passaporte', 'Foto para passaporte');
    END IF;
    
    IF EXISTS (
        SELECT 1 FROM content_customizations 
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'Footer' 
        AND element_id = 'resource1Url'
    ) THEN
        UPDATE content_customizations 
        SET custom_value = '#'
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'Footer' 
        AND element_id = 'resource1Url';
    ELSE
        INSERT INTO content_customizations 
            (entity_id, entity_type, component, element_id, element_type, original_value, custom_value)
        VALUES
            (page_entity_id, 'page', 'Footer', 'resource1Url', 'link', '#', '#');
    END IF;
    
    -- RECURSOS - Link 2 (Como Tirar Foto Passaporte)
    IF EXISTS (
        SELECT 1 FROM content_customizations 
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'Footer' 
        AND element_id = 'resource2Text'
    ) THEN
        UPDATE content_customizations 
        SET custom_value = 'Como Tirar Foto Passaporte'
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'Footer' 
        AND element_id = 'resource2Text';
    ELSE
        INSERT INTO content_customizations 
            (entity_id, entity_type, component, element_id, element_type, original_value, custom_value)
        VALUES
            (page_entity_id, 'page', 'Footer', 'resource2Text', 'text', 'Como Tirar Foto Passaporte', 'Como Tirar Foto Passaporte');
    END IF;
    
    IF EXISTS (
        SELECT 1 FROM content_customizations 
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'Footer' 
        AND element_id = 'resource2Url'
    ) THEN
        UPDATE content_customizations 
        SET custom_value = '#'
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'Footer' 
        AND element_id = 'resource2Url';
    ELSE
        INSERT INTO content_customizations 
            (entity_id, entity_type, component, element_id, element_type, original_value, custom_value)
        VALUES
            (page_entity_id, 'page', 'Footer', 'resource2Url', 'link', '#', '#');
    END IF;
    
    -- RECURSOS - Link 3 (Como tirar com celular)
    IF EXISTS (
        SELECT 1 FROM content_customizations 
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'Footer' 
        AND element_id = 'resource3Text'
    ) THEN
        UPDATE content_customizations 
        SET custom_value = 'Como tirar com celular'
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'Footer' 
        AND element_id = 'resource3Text';
    ELSE
        INSERT INTO content_customizations 
            (entity_id, entity_type, component, element_id, element_type, original_value, custom_value)
        VALUES
            (page_entity_id, 'page', 'Footer', 'resource3Text', 'text', 'Como tirar com celular', 'Como tirar com celular');
    END IF;
    
    IF EXISTS (
        SELECT 1 FROM content_customizations 
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'Footer' 
        AND element_id = 'resource3Url'
    ) THEN
        UPDATE content_customizations 
        SET custom_value = '#'
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'Footer' 
        AND element_id = 'resource3Url';
    ELSE
        INSERT INTO content_customizations 
            (entity_id, entity_type, component, element_id, element_type, original_value, custom_value)
        VALUES
            (page_entity_id, 'page', 'Footer', 'resource3Url', 'link', '#', '#');
    END IF;
    
    -- RECURSOS - Link 4 (Foto Passaporte Android)
    IF EXISTS (
        SELECT 1 FROM content_customizations 
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'Footer' 
        AND element_id = 'resource4Text'
    ) THEN
        UPDATE content_customizations 
        SET custom_value = 'Foto Passaporte Android'
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'Footer' 
        AND element_id = 'resource4Text';
    ELSE
        INSERT INTO content_customizations 
            (entity_id, entity_type, component, element_id, element_type, original_value, custom_value)
        VALUES
            (page_entity_id, 'page', 'Footer', 'resource4Text', 'text', 'Foto Passaporte Android', 'Foto Passaporte Android');
    END IF;
    
    IF EXISTS (
        SELECT 1 FROM content_customizations 
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'Footer' 
        AND element_id = 'resource4Url'
    ) THEN
        UPDATE content_customizations 
        SET custom_value = '#'
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'Footer' 
        AND element_id = 'resource4Url';
    ELSE
        INSERT INTO content_customizations 
            (entity_id, entity_type, component, element_id, element_type, original_value, custom_value)
        VALUES
            (page_entity_id, 'page', 'Footer', 'resource4Url', 'link', '#', '#');
    END IF;
    
    -- RECURSOS - Link 5 (Foto Passaporte iPhone)
    IF EXISTS (
        SELECT 1 FROM content_customizations 
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'Footer' 
        AND element_id = 'resource5Text'
    ) THEN
        UPDATE content_customizations 
        SET custom_value = 'Foto Passaporte iPhone'
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'Footer' 
        AND element_id = 'resource5Text';
    ELSE
        INSERT INTO content_customizations 
            (entity_id, entity_type, component, element_id, element_type, original_value, custom_value)
        VALUES
            (page_entity_id, 'page', 'Footer', 'resource5Text', 'text', 'Foto Passaporte iPhone', 'Foto Passaporte iPhone');
    END IF;
    
    IF EXISTS (
        SELECT 1 FROM content_customizations 
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'Footer' 
        AND element_id = 'resource5Url'
    ) THEN
        UPDATE content_customizations 
        SET custom_value = '#'
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'Footer' 
        AND element_id = 'resource5Url';
    ELSE
        INSERT INTO content_customizations 
            (entity_id, entity_type, component, element_id, element_type, original_value, custom_value)
        VALUES
            (page_entity_id, 'page', 'Footer', 'resource5Url', 'link', '#', '#');
    END IF;
    
    -- DOCUMENTOS - Link 1 (Passaporte Brasileiro)
    IF EXISTS (
        SELECT 1 FROM content_customizations 
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'Footer' 
        AND element_id = 'document1Text'
    ) THEN
        UPDATE content_customizations 
        SET custom_value = 'Passaporte Brasileiro'
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'Footer' 
        AND element_id = 'document1Text';
    ELSE
        INSERT INTO content_customizations 
            (entity_id, entity_type, component, element_id, element_type, original_value, custom_value)
        VALUES
            (page_entity_id, 'page', 'Footer', 'document1Text', 'text', 'Passaporte Brasileiro', 'Passaporte Brasileiro');
    END IF;
    
    IF EXISTS (
        SELECT 1 FROM content_customizations 
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'Footer' 
        AND element_id = 'document1Url'
    ) THEN
        UPDATE content_customizations 
        SET custom_value = '#'
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'Footer' 
        AND element_id = 'document1Url';
    ELSE
        INSERT INTO content_customizations 
            (entity_id, entity_type, component, element_id, element_type, original_value, custom_value)
        VALUES
            (page_entity_id, 'page', 'Footer', 'document1Url', 'link', '#', '#');
    END IF;
    
    -- DOCUMENTOS - Link 2 (RG Nacional)
    IF EXISTS (
        SELECT 1 FROM content_customizations 
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'Footer' 
        AND element_id = 'document2Text'
    ) THEN
        UPDATE content_customizations 
        SET custom_value = 'RG Nacional'
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'Footer' 
        AND element_id = 'document2Text';
    ELSE
        INSERT INTO content_customizations 
            (entity_id, entity_type, component, element_id, element_type, original_value, custom_value)
        VALUES
            (page_entity_id, 'page', 'Footer', 'document2Text', 'text', 'RG Nacional', 'RG Nacional');
    END IF;
    
    IF EXISTS (
        SELECT 1 FROM content_customizations 
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'Footer' 
        AND element_id = 'document2Url'
    ) THEN
        UPDATE content_customizations 
        SET custom_value = '#'
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'Footer' 
        AND element_id = 'document2Url';
    ELSE
        INSERT INTO content_customizations 
            (entity_id, entity_type, component, element_id, element_type, original_value, custom_value)
        VALUES
            (page_entity_id, 'page', 'Footer', 'document2Url', 'link', '#', '#');
    END IF;
    
    -- DOCUMENTOS - Link 3 (CNH Digital)
    IF EXISTS (
        SELECT 1 FROM content_customizations 
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'Footer' 
        AND element_id = 'document3Text'
    ) THEN
        UPDATE content_customizations 
        SET custom_value = 'CNH Digital'
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'Footer' 
        AND element_id = 'document3Text';
    ELSE
        INSERT INTO content_customizations 
            (entity_id, entity_type, component, element_id, element_type, original_value, custom_value)
        VALUES
            (page_entity_id, 'page', 'Footer', 'document3Text', 'text', 'CNH Digital', 'CNH Digital');
    END IF;
    
    IF EXISTS (
        SELECT 1 FROM content_customizations 
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'Footer' 
        AND element_id = 'document3Url'
    ) THEN
        UPDATE content_customizations 
        SET custom_value = '#'
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'Footer' 
        AND element_id = 'document3Url';
    ELSE
        INSERT INTO content_customizations 
            (entity_id, entity_type, component, element_id, element_type, original_value, custom_value)
        VALUES
            (page_entity_id, 'page', 'Footer', 'document3Url', 'link', '#', '#');
    END IF;
    
    -- DOCUMENTOS - Link 4 (Visto Americano)
    IF EXISTS (
        SELECT 1 FROM content_customizations 
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'Footer' 
        AND element_id = 'document4Text'
    ) THEN
        UPDATE content_customizations 
        SET custom_value = 'Visto Americano'
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'Footer' 
        AND element_id = 'document4Text';
    ELSE
        INSERT INTO content_customizations 
            (entity_id, entity_type, component, element_id, element_type, original_value, custom_value)
        VALUES
            (page_entity_id, 'page', 'Footer', 'document4Text', 'text', 'Visto Americano', 'Visto Americano');
    END IF;
    
    IF EXISTS (
        SELECT 1 FROM content_customizations 
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'Footer' 
        AND element_id = 'document4Url'
    ) THEN
        UPDATE content_customizations 
        SET custom_value = '#'
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'Footer' 
        AND element_id = 'document4Url';
    ELSE
        INSERT INTO content_customizations 
            (entity_id, entity_type, component, element_id, element_type, original_value, custom_value)
        VALUES
            (page_entity_id, 'page', 'Footer', 'document4Url', 'link', '#', '#');
    END IF;
    
    -- DOCUMENTOS - Link 5 (Visto Canadense)
    IF EXISTS (
        SELECT 1 FROM content_customizations 
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'Footer' 
        AND element_id = 'document5Text'
    ) THEN
        UPDATE content_customizations 
        SET custom_value = 'Visto Canadense'
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'Footer' 
        AND element_id = 'document5Text';
    ELSE
        INSERT INTO content_customizations 
            (entity_id, entity_type, component, element_id, element_type, original_value, custom_value)
        VALUES
            (page_entity_id, 'page', 'Footer', 'document5Text', 'text', 'Visto Canadense', 'Visto Canadense');
    END IF;
    
    IF EXISTS (
        SELECT 1 FROM content_customizations 
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'Footer' 
        AND element_id = 'document5Url'
    ) THEN
        UPDATE content_customizations 
        SET custom_value = '#'
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'Footer' 
        AND element_id = 'document5Url';
    ELSE
        INSERT INTO content_customizations 
            (entity_id, entity_type, component, element_id, element_type, original_value, custom_value)
        VALUES
            (page_entity_id, 'page', 'Footer', 'document5Url', 'link', '#', '#');
    END IF;
    
    -- LINKS ÚTEIS - Link 1 (Sobre a PhotoID)
    IF EXISTS (
        SELECT 1 FROM content_customizations 
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'Footer' 
        AND element_id = 'useful1Text'
    ) THEN
        UPDATE content_customizations 
        SET custom_value = 'Sobre a PhotoID'
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'Footer' 
        AND element_id = 'useful1Text';
    ELSE
        INSERT INTO content_customizations 
            (entity_id, entity_type, component, element_id, element_type, original_value, custom_value)
        VALUES
            (page_entity_id, 'page', 'Footer', 'useful1Text', 'text', 'Sobre a PhotoID', 'Sobre a PhotoID');
    END IF;
    
    IF EXISTS (
        SELECT 1 FROM content_customizations 
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'Footer' 
        AND element_id = 'useful1Url'
    ) THEN
        UPDATE content_customizations 
        SET custom_value = '/sobre'
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'Footer' 
        AND element_id = 'useful1Url';
    ELSE
        INSERT INTO content_customizations 
            (entity_id, entity_type, component, element_id, element_type, original_value, custom_value)
        VALUES
            (page_entity_id, 'page', 'Footer', 'useful1Url', 'link', '/sobre', '/sobre');
    END IF;
    
    -- LINKS ÚTEIS - Link 2 (Termos de Uso)
    IF EXISTS (
        SELECT 1 FROM content_customizations 
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'Footer' 
        AND element_id = 'link1Text'
    ) THEN
        UPDATE content_customizations 
        SET custom_value = 'Termos de Uso'
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'Footer' 
        AND element_id = 'link1Text';
    ELSE
        INSERT INTO content_customizations 
            (entity_id, entity_type, component, element_id, element_type, original_value, custom_value)
        VALUES
            (page_entity_id, 'page', 'Footer', 'link1Text', 'text', 'Termos de Uso', 'Termos de Uso');
    END IF;
    
    IF EXISTS (
        SELECT 1 FROM content_customizations 
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'Footer' 
        AND element_id = 'link1Url'
    ) THEN
        UPDATE content_customizations 
        SET custom_value = '/termos-de-uso'
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'Footer' 
        AND element_id = 'link1Url';
    ELSE
        INSERT INTO content_customizations 
            (entity_id, entity_type, component, element_id, element_type, original_value, custom_value)
        VALUES
            (page_entity_id, 'page', 'Footer', 'link1Url', 'link', '/termos-de-uso', '/termos-de-uso');
    END IF;
    
    -- LINKS ÚTEIS - Link 3 (Política de Privacidade)
    IF EXISTS (
        SELECT 1 FROM content_customizations 
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'Footer' 
        AND element_id = 'link2Text'
    ) THEN
        UPDATE content_customizations 
        SET custom_value = 'Política de Privacidade'
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'Footer' 
        AND element_id = 'link2Text';
    ELSE
        INSERT INTO content_customizations 
            (entity_id, entity_type, component, element_id, element_type, original_value, custom_value)
        VALUES
            (page_entity_id, 'page', 'Footer', 'link2Text', 'text', 'Política de Privacidade', 'Política de Privacidade');
    END IF;
    
    IF EXISTS (
        SELECT 1 FROM content_customizations 
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'Footer' 
        AND element_id = 'link2Url'
    ) THEN
        UPDATE content_customizations 
        SET custom_value = '/politica-de-privacidade'
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'Footer' 
        AND element_id = 'link2Url';
    ELSE
        INSERT INTO content_customizations 
            (entity_id, entity_type, component, element_id, element_type, original_value, custom_value)
        VALUES
            (page_entity_id, 'page', 'Footer', 'link2Url', 'link', '/politica-de-privacidade', '/politica-de-privacidade');
    END IF;
    
    -- LINKS ÚTEIS - Link 4 (Contato)
    IF EXISTS (
        SELECT 1 FROM content_customizations 
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'Footer' 
        AND element_id = 'useful4Text'
    ) THEN
        UPDATE content_customizations 
        SET custom_value = 'Contato'
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'Footer' 
        AND element_id = 'useful4Text';
    ELSE
        INSERT INTO content_customizations 
            (entity_id, entity_type, component, element_id, element_type, original_value, custom_value)
        VALUES
            (page_entity_id, 'page', 'Footer', 'useful4Text', 'text', 'Contato', 'Contato');
    END IF;
    
    IF EXISTS (
        SELECT 1 FROM content_customizations 
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'Footer' 
        AND element_id = 'useful4Url'
    ) THEN
        UPDATE content_customizations 
        SET custom_value = '/contato'
        WHERE entity_id = page_entity_id 
        AND entity_type = 'page' 
        AND component = 'Footer' 
        AND element_id = 'useful4Url';
    ELSE
        INSERT INTO content_customizations 
            (entity_id, entity_type, component, element_id, element_type, original_value, custom_value)
        VALUES
            (page_entity_id, 'page', 'Footer', 'useful4Url', 'link', '/contato', '/contato');
    END IF;
    
END $$; 