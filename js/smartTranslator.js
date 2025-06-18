// smartTranslator.js - Moteur de traduction automatique intelligent et gratuit
(function() {
    console.log('[SmartTranslator] 🚀 Initialisation du moteur de traduction...');

    class SmartTranslator {
        constructor() {
            this.cache = new Map();
            this.isTranslating = false;
            this.supportedLanguages = ['fr', 'en'];            this.excludeSelectors = [
                '.no-translate',
                'script',
                'style', 
                'code',
                'pre',
                '.language-selector',
                'nav .navbar-brand',
                '.flaticon-bee',
                '[class*="icon-"]',
                '[class*="flaticon"]',
                '[class*="oi-"]',
                '[class*="ion-"]',
                '.navbar-toggler',
                '.chevron',
                '.language-flag',
                '.language-text',
                '.carousel-control-prev',
                '.carousel-control-next',
                '.owl-nav',
                '.owl-dots',
                'meta',
                'title',
                'link',
                'noscript'
            ];
            this.includeSelectors = [
                // Titres et contenus principaux
                'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
                'p', 'span:not([class*="icon"]):not([class*="flaticon"])', 
                'li', 'a:not(.navbar-brand)', 'button:not(.navbar-toggler)',
                'label', '.ftco-heading-2', '.heading',
                
                // Navigation et menus
                '.nav-link', '.dropdown-item', '.breadcrumb-item',
                
                // Formulaires
                '.form-control[placeholder]',
                'input[placeholder]:not([type="hidden"])',
                'textarea[placeholder]',
                'select option',
                
                // Contenu spécifique
                '.subheading', '.desc', '.description',
                '.text', '.content', '.excerpt',
                '.title', '.subtitle', '.caption',
                
                // Sections spéciales
                '.ftco-animate p', '.ftco-animate h1', '.ftco-animate h2', '.ftco-animate h3',
                '.block-21 .heading', '.block-21 .text',
                '.ftco-services .text', '.ftco-section .text',
                
                // Boutons et liens
                '.btn', '.button', '.link',
                
                // Footer et widgets
                '.ftco-footer-widget p', '.ftco-footer-widget li',
                
                // Blog et articles
                '.blog-entry .text', '.blog-entry .heading',
                '.comment-body .text', '.comment-body .heading',
                
                // Projets et portfolio
                '.work .text', '.work .heading',
                '.project .text', '.project .heading',
                
                // Services et pricing
                '.pricing .text', '.pricing .heading',
                '.services .text', '.services .heading',
                
                // Témoignages et avis
                '.testimony .text', '.testimony .heading',
                '.testimonial .text', '.testimonial .heading',
                
                // Contact et info
                '.contact-info .text', '.contact-info .heading',
                '.info .text', '.info .heading',
                
                // Éléments marqués pour traduction
                '[data-translate-auto]',
                '[data-translate="true"]',
                
                // Scan général - TOUS les éléments textuels
                '*:not(script):not(style):not(meta):not(link):not(title)'
            ];
            
            console.log('[SmartTranslator] ✅ Moteur initialisé');
        }        // API de traduction gratuite (Google Translate non-officielle) - VERSION AMÉLIORÉE
        async translateText(text, targetLang, sourceLang = 'auto') {
            if (!text || text.trim() === '' || text.length < 2) return text;
            
            // Vérifier le cache
            const cacheKey = `${text}_${sourceLang}_${targetLang}`;
            if (this.cache.has(cacheKey)) {
                console.log('[SmartTranslator] 💾 Cache hit:', text.substring(0, 30) + '...');
                return this.cache.get(cacheKey);
            }

            try {
                console.log('[SmartTranslator] 🌐 Tentative traduction:', text.substring(0, 50) + '... ->', targetLang);
                
                // Méthode 1: API Google Translate (gratuite mais peut être bloquée)
                let translatedText = await this.tryGoogleTranslateAPI(text, targetLang, sourceLang);
                
                // Méthode 2: Fallback - Traduction manuelle via dictionnaire
                if (!translatedText || translatedText === text) {
                    console.log('[SmartTranslator] 🔄 Fallback vers traduction manuelle...');
                    translatedText = this.translateWithDictionary(text, targetLang);
                }
                
                // Méthode 3: Fallback - MyMemory API (gratuite)
                if (!translatedText || translatedText === text) {
                    console.log('[SmartTranslator] 🔄 Fallback vers MyMemory API...');
                    translatedText = await this.tryMyMemoryAPI(text, targetLang, sourceLang);
                }
                
                if (translatedText && translatedText !== text) {
                    // Sauvegarder dans le cache
                    this.cache.set(cacheKey, translatedText);
                    console.log('[SmartTranslator] ✅ Traduit avec succès:', text.substring(0, 30), '->', translatedText.substring(0, 30));
                    return translatedText;
                } else {
                    console.warn('[SmartTranslator] ⚠️ Aucune traduction trouvée pour:', text.substring(0, 30));
                }
                
            } catch (error) {
                console.error('[SmartTranslator] ❌ Erreur traduction:', error, 'pour:', text.substring(0, 30));
            }
            
            return text; // Retourner le texte original en cas d'échec
        }

        // Méthode Google Translate API
        async tryGoogleTranslateAPI(text, targetLang, sourceLang) {
            try {
                const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
                
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                    }
                });
                
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }
                
                const result = await response.json();
                
                if (result && result[0] && result[0][0] && result[0][0][0]) {
                    return result[0][0][0];
                }
            } catch (error) {
                console.warn('[SmartTranslator] ⚠️ Google API échoué:', error.message);
            }
            return null;
        }

        // Méthode MyMemory API (alternative gratuite)
        async tryMyMemoryAPI(text, targetLang, sourceLang) {
            try {
                const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLang}|${targetLang}`;
                
                const response = await fetch(url);
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                
                const result = await response.json();
                
                if (result && result.responseData && result.responseData.translatedText) {
                    const translation = result.responseData.translatedText;
                    if (translation !== text) {
                        return translation;
                    }
                }
            } catch (error) {
                console.warn('[SmartTranslator] ⚠️ MyMemory API échoué:', error.message);
            }
            return null;
        }        // Traduction manuelle via dictionnaire intégré - VERSION EXHAUSTIVE
        translateWithDictionary(text, targetLang) {
            if (targetLang === 'fr') return text; // Déjà en français
            
            const dictionary = window.translationDictionary || {};
            
            // Recherche exacte (insensible à la casse)
            const lowerText = text.toLowerCase().trim();
            
            // Recherche directe
            if (dictionary[lowerText]) {
                console.log('[SmartTranslator] 📖 Traduction exacte:', text, '->', dictionary[lowerText]);
                return dictionary[lowerText];
            }
            
            // Recherche avec variantes (suppression de la ponctuation)
            const cleanText = lowerText.replace(/[.,!?;:'"()]/g, '').trim();
            if (dictionary[cleanText]) {
                console.log('[SmartTranslator] 📖 Traduction nettoyée:', text, '->', dictionary[cleanText]);
                return dictionary[cleanText];
            }
            
            // Recherche partielle pour les phrases contenant des mots-clés
            for (const [french, english] of Object.entries(dictionary)) {
                if (lowerText.includes(french.toLowerCase())) {
                    const translation = text.replace(new RegExp(french, 'gi'), english);
                    if (translation !== text) {
                        console.log('[SmartTranslator] 📖 Traduction partielle:', text, '->', translation);
                        return translation;
                    }
                }
            }
            
            // Recherche par mots individuels
            const words = lowerText.split(/\s+/);
            let hasTranslation = false;
            let translatedWords = words.map(word => {
                const cleanWord = word.replace(/[.,!?;:'"()]/g, '');
                if (dictionary[cleanWord]) {
                    hasTranslation = true;
                    return dictionary[cleanWord];
                }
                return word;
            });
            
            if (hasTranslation) {
                const result = translatedWords.join(' ');
                console.log('[SmartTranslator] 📖 Traduction par mots:', text, '->', result);
                return result;
            }
            
            console.log('[SmartTranslator] ❓ Aucune traduction trouvée pour:', text);
            return text; // Retourner tel quel si pas de traduction trouvée
        }// Vérifier si un élément doit être traduit - VERSION AMÉLIORÉE
        shouldTranslateElement(element) {
            if (!element || !element.tagName) return false;
            
            // Exclure les éléments spécifiques
            for (const selector of this.excludeSelectors) {
                try {
                    if (element.matches && element.matches(selector)) {
                        return false;
                    }
                    if (element.closest && element.closest(selector)) {
                        return false;
                    }
                } catch (e) {
                    // Ignorer les sélecteurs invalides
                }
            }

            // Exclure les éléments avec certaines classes
            const className = element.className || '';
            if (typeof className === 'string') {
                if (className.includes('icon') || 
                    className.includes('flaticon') || 
                    className.includes('oi-') ||
                    className.includes('ion-') ||
                    className.includes('fa-') ||
                    className.includes('glyphicon')) {
                    return false;
                }
            }

            // Exclure les éléments avec certains attributs
            if (element.hasAttribute('data-no-translate') || 
                element.hasAttribute('translate') && element.getAttribute('translate') === 'no') {
                return false;
            }

            // Exclure les éléments invisibles
            if (element.style && element.style.display === 'none') return false;
            if (element.style && element.style.visibility === 'hidden') return false;

            // Exclure les éléments sans contenu textuel significatif
            const text = this.getElementText(element);
            if (!text || text.length < 1) return false;

            // Exclure les éléments qui ne contiennent que des espaces ou caractères spéciaux
            if (/^\s*$/.test(text) || /^[\s\n\r\t]*$/.test(text)) return false;

            return true;
        }

        // Récupérer le texte à traduire d'un élément
        getElementText(element) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                return element.placeholder || '';
            }
            
            // Pour les éléments avec des enfants, ne prendre que le texte direct
            if (element.children.length > 0) {
                let directText = '';
                for (const node of element.childNodes) {
                    if (node.nodeType === Node.TEXT_NODE) {
                        directText += node.textContent;
                    }
                }
                return directText.trim();
            }
            
            return element.textContent?.trim() || '';
        }

        // Appliquer la traduction à un élément
        setElementText(element, translatedText, originalText) {
            // Sauvegarder le texte original si pas déjà fait
            if (!element.dataset.originalText) {
                element.dataset.originalText = originalText;
            }

            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translatedText;
            } else if (element.children.length > 0) {
                // Pour les éléments avec des enfants, remplacer seulement les nœuds texte
                for (const node of element.childNodes) {
                    if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() === originalText) {
                        node.textContent = translatedText;
                        break;
                    }
                }
            } else {
                element.textContent = translatedText;
            }
        }        // Collecter tous les éléments à traduire - MÉTHODE EXHAUSTIVE
        collectTranslatableElements() {
            const elements = [];
            const processedElements = new Set();
            
            console.log('[SmartTranslator] 🔍 Début du scan exhaustif du DOM...');
            
            // Méthode 1: Scanner tous les éléments avec du texte
            const allElements = document.querySelectorAll('*');
            
            allElements.forEach(element => {
                // Éviter les doublons
                if (processedElements.has(element)) return;
                
                // Vérifier les exclusions
                if (!this.shouldTranslateElement(element)) return;
                
                // Récupérer le texte
                const text = this.getElementText(element);
                if (!text || text.length < 2) return;
                
                // Vérifier si c'est vraiment du texte à traduire
                if (this.isTextTranslatable(text)) {
                    elements.push({
                        element: element,
                        text: text,
                        selector: element.tagName.toLowerCase(),
                        type: this.getElementType(element)
                    });
                    processedElements.add(element);
                }
            });
            
            // Méthode 2: Scanner spécifiquement les sélecteurs prédéfinis
            for (const selector of this.includeSelectors) {
                try {
                    const found = document.querySelectorAll(selector);
                    found.forEach(element => {
                        if (processedElements.has(element)) return;
                        
                        if (this.shouldTranslateElement(element)) {
                            const text = this.getElementText(element);
                            if (text && this.isTextTranslatable(text)) {
                                elements.push({
                                    element: element,
                                    text: text,
                                    selector: selector,
                                    type: this.getElementType(element)
                                });
                                processedElements.add(element);
                            }
                        }
                    });
                } catch (error) {
                    // Ignorer les sélecteurs invalides
                    console.warn('[SmartTranslator] Sélecteur invalide:', selector);
                }
            }
            
            // Méthode 3: Scanner les nœuds texte directement
            this.scanTextNodes(document.body, elements, processedElements);

            console.log('[SmartTranslator] 📊 Scan terminé:');
            console.log('  - Éléments totaux scannés:', allElements.length);
            console.log('  - Éléments à traduire trouvés:', elements.length);
            console.log('  - Types d\'éléments:', this.getElementTypeStats(elements));
            
            return elements;
        }

        // Nouvelle méthode pour scanner les nœuds texte
        scanTextNodes(node, elements, processedElements) {
            if (node.nodeType === Node.TEXT_NODE) {
                const text = node.textContent.trim();
                if (text && text.length > 1 && this.isTextTranslatable(text)) {
                    const parentElement = node.parentElement;
                    if (parentElement && !processedElements.has(parentElement) && this.shouldTranslateElement(parentElement)) {
                        elements.push({
                            element: parentElement,
                            text: text,
                            selector: 'textNode',
                            type: 'textNode'
                        });
                        processedElements.add(parentElement);
                    }
                }
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                for (const child of node.childNodes) {
                    this.scanTextNodes(child, elements, processedElements);
                }
            }
        }

        // Vérifier si le texte est traduisible
        isTextTranslatable(text) {
            if (!text || text.length < 2) return false;
            
            // Exclure les nombres seuls
            if (/^[0-9\s\+\-\(\)\.]+$/.test(text)) return false;
            
            // Exclure les emails, URLs, classes CSS
            if (/[@\.](com|org|net|fr|html|css|js|php|asp)/.test(text)) return false;
            
            // Exclure les codes courts
            if (/^[A-Z0-9_\-]{1,4}$/.test(text)) return false;
            
            // Exclure les caractères spéciaux seuls
            if (/^[^\w\s]+$/.test(text)) return false;
            
            // Exclure les mots très courts sans sens
            if (text.length < 3 && !/^(a|an|the|le|la|de|du|et|or|on|in|at|to|je|tu|il|we|us)$/i.test(text)) return false;
            
            return true;
        }

        // Déterminer le type d'élément
        getElementType(element) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') return 'form';
            if (element.matches('h1, h2, h3, h4, h5, h6')) return 'heading';
            if (element.matches('p')) return 'paragraph';
            if (element.matches('a')) return 'link';
            if (element.matches('button, .btn')) return 'button';
            if (element.matches('li')) return 'listItem';
            if (element.matches('span')) return 'span';
            return 'other';
        }

        // Statistiques des types d'éléments
        getElementTypeStats(elements) {
            const stats = {};
            elements.forEach(item => {
                stats[item.type] = (stats[item.type] || 0) + 1;
            });
            return stats;
        }

        // Traduire tous les éléments vers une langue
        async translatePage(targetLang) {
            if (this.isTranslating) {
                console.log('[SmartTranslator] ⏳ Traduction déjà en cours...');
                return;
            }

            console.log('[SmartTranslator] 🔄 Début traduction vers:', targetLang);
            this.isTranslating = true;

            try {
                const elements = this.collectTranslatableElements();
                
                if (elements.length === 0) {
                    console.log('[SmartTranslator] ℹ️ Aucun élément à traduire');
                    return;
                }

                // Afficher un indicateur de chargement
                this.showLoadingIndicator();                let translatedCount = 0;
                const batchSize = 3; // Réduire la taille des lots pour éviter les limitations
                const delayBetweenBatches = 200; // Augmenter le délai entre les lots

                console.log(`[SmartTranslator] 🔄 Traitement de ${elements.length} éléments par lots de ${batchSize}...`);

                for (let i = 0; i < elements.length; i += batchSize) {
                    const batch = elements.slice(i, i + batchSize);
                    const batchNumber = Math.floor(i / batchSize) + 1;
                    const totalBatches = Math.ceil(elements.length / batchSize);
                    
                    console.log(`[SmartTranslator] 📦 Traitement lot ${batchNumber}/${totalBatches} (${batch.length} éléments)`);
                      await Promise.all(batch.map(async (item) => {
                        try {
                            if (targetLang === 'fr') {
                                // Restaurer le texte original
                                const originalText = item.element.dataset.originalText || item.text;
                                this.setElementText(item.element, originalText, originalText);
                                console.log(`[SmartTranslator] 🔙 Restauré (${item.type}):`, originalText.substring(0, 30) + '...');
                            } else {
                                // Traduire
                                console.log(`[SmartTranslator] 🔄 Traduction de (${item.type}):`, item.text.substring(0, 50) + '...');
                                const translatedText = await this.translateText(item.text, targetLang, 'fr');
                                
                                console.log(`[SmartTranslator] 📝 Résultat traduction:`, {
                                    original: item.text.substring(0, 30) + '...',
                                    translated: translatedText.substring(0, 30) + '...',
                                    changed: translatedText !== item.text,
                                    element: item.element.tagName,
                                    type: item.type
                                });
                                
                                if (translatedText && translatedText !== item.text) {
                                    this.setElementText(item.element, translatedText, item.text);
                                    console.log(`[SmartTranslator] ✅ Appliqué (${item.type}):`, item.text.substring(0, 20), '->', translatedText.substring(0, 20));
                                } else {
                                    console.log(`[SmartTranslator] ⚠️ Pas de changement (${item.type}):`, item.text.substring(0, 30));
                                }
                            }
                            translatedCount++;
                        } catch (error) {
                            console.error('[SmartTranslator] ❌ Erreur traduction élément:', error, item.text?.substring(0, 30));
                        }
                    }));

                    // Pause entre les lots pour éviter les limitations
                    if (i + batchSize < elements.length) {
                        await new Promise(resolve => setTimeout(resolve, delayBetweenBatches));
                    }

                    // Mise à jour de l'indicateur de progression
                    this.updateProgressIndicator(batchNumber, totalBatches);
                }

                console.log('[SmartTranslator] ✅ Traduction terminée:', translatedCount, 'éléments traduits');
                
            } catch (error) {
                console.error('[SmartTranslator] ❌ Erreur traduction page:', error);
            } finally {
                this.isTranslating = false;
                this.hideLoadingIndicator();
            }
        }        // Mettre à jour l'indicateur de progression
        updateProgressIndicator(current, total) {
            const indicator = document.getElementById('translation-loading');
            if (indicator) {
                const percentage = Math.round((current / total) * 100);
                indicator.innerHTML = `
                    <div style="
                        position: fixed; 
                        top: 20px; 
                        right: 20px; 
                        background: linear-gradient(45deg, #007bff, #0056b3); 
                        color: white; 
                        padding: 15px 25px; 
                        border-radius: 25px; 
                        z-index: 9999;
                        font-size: 14px;
                        box-shadow: 0 4px 12px rgba(0,123,255,0.3);
                        animation: pulse 1.5s infinite;
                        min-width: 200px;
                        text-align: center;
                    ">
                        🌍 Traduction en cours...<br>
                        <div style="font-size: 12px; margin-top: 5px;">
                            ${current}/${total} lots (${percentage}%)
                        </div>
                        <div style="
                            background: rgba(255,255,255,0.3); 
                            height: 4px; 
                            border-radius: 2px; 
                            margin-top: 8px;
                            overflow: hidden;
                        ">
                            <div style="
                                background: white; 
                                height: 100%; 
                                width: ${percentage}%;
                                transition: width 0.3s ease;
                            "></div>
                        </div>
                    </div>
                `;
            }
        }

        // Afficher un indicateur de chargement
        showLoadingIndicator() {
            let indicator = document.getElementById('translation-loading');
            if (!indicator) {
                indicator = document.createElement('div');
                indicator.id = 'translation-loading';
                this.updateProgressIndicator(0, 100);
                document.body.appendChild(indicator);
                
                // Ajouter l'animation CSS
                if (!document.getElementById('translation-animation')) {
                    const style = document.createElement('style');
                    style.id = 'translation-animation';
                    style.textContent = `
                        @keyframes pulse {
                            0% { opacity: 0.8; transform: scale(1); }
                            50% { opacity: 1; transform: scale(1.02); }
                            100% { opacity: 0.8; transform: scale(1); }
                        }
                    `;
                    document.head.appendChild(style);
                }
            }
        }

        // Cacher l'indicateur de chargement
        hideLoadingIndicator() {
            setTimeout(() => {
                const indicator = document.getElementById('translation-loading');
                if (indicator) {
                    indicator.remove();
                }
            }, 1000);
        }

        // Sauvegarder le cache des traductions
        saveCache() {
            try {
                const cacheData = Array.from(this.cache.entries());
                localStorage.setItem('translationCache', JSON.stringify(cacheData));
                console.log('[SmartTranslator] 💾 Cache sauvegardé:', cacheData.length, 'entrées');
            } catch (error) {
                console.warn('[SmartTranslator] ⚠️ Erreur sauvegarde cache:', error);
            }
        }

        // Charger le cache des traductions
        loadCache() {
            try {
                const cacheData = localStorage.getItem('translationCache');
                if (cacheData) {
                    const entries = JSON.parse(cacheData);
                    this.cache = new Map(entries);
                    console.log('[SmartTranslator] 📥 Cache chargé:', this.cache.size, 'entrées');
                }
            } catch (error) {
                console.warn('[SmartTranslator] ⚠️ Erreur chargement cache:', error);
            }
        }
    }

    // Créer l'instance globale
    window.smartTranslator = new SmartTranslator();
    
    // Fonction de diagnostic globale
    window.diagnoseTranslation = function() {
        console.log('=== DIAGNOSTIC COMPLET DE TRADUCTION ===');
        const elements = window.smartTranslator.collectTranslatableElements();
        
        console.log('📊 RÉSUMÉ:');
        console.log('  - Éléments trouvés:', elements.length);
        
        console.log('📝 DÉTAIL DES ÉLÉMENTS:');
        elements.forEach((item, index) => {
            console.log(`${index + 1}. [${item.type}] ${item.selector}:`, 
                       `"${item.text.substring(0, 50)}${item.text.length > 50 ? '...' : ''}"`);
        });
        
        console.log('🎯 Pour tester la traduction: window.smartTranslator.translatePage("en")');
        console.log('🔙 Pour revenir au français: window.smartTranslator.translatePage("fr")');
        console.log('=== FIN DIAGNOSTIC ===');
        
        return elements;
    };
    
    // Fonction de test rapide pour vérifier la traduction
    window.testTranslation = function() {
        console.log('=== TEST TRADUCTION RAPIDE ===');
        
        // Test 1: API Google
        window.smartTranslator.tryGoogleTranslateAPI('Bonjour', 'en', 'fr').then(result => {
            console.log('Test Google API - Bonjour ->', result);
        });
        
        // Test 2: MyMemory API  
        window.smartTranslator.tryMyMemoryAPI('Bonjour', 'en', 'fr').then(result => {
            console.log('Test MyMemory API - Bonjour ->', result);
        });
        
        // Test 3: Dictionnaire
        const dictResult = window.smartTranslator.translateWithDictionary('Accueil', 'en');
        console.log('Test Dictionnaire - Accueil ->', dictResult);
        
        // Test 4: Test complet
        window.smartTranslator.translateText('Bonjour le monde', 'en', 'fr').then(result => {
            console.log('Test complet - Bonjour le monde ->', result);
        });
        
        console.log('=== FIN TEST ===');
    };
    
    // Fonction pour forcer la traduction d'un texte spécifique
    window.forceTranslate = function(text, lang = 'en') {
        return window.smartTranslator.translateText(text, lang, 'fr');
    };
    
    // Charger le cache au démarrage
    window.smartTranslator.loadCache();

    // Sauvegarder le cache avant de quitter la page
    window.addEventListener('beforeunload', () => {
        window.smartTranslator.saveCache();
    });

    console.log('[SmartTranslator] 🎉 Moteur de traduction prêt !');
})();
