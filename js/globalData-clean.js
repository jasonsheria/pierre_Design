// globalData.js
// Ce composant gère les variables globales, leur initialisation et leur stockage dans le localStorage.
(function () {
    console.log('[globalData.js] === DÉBUT INITIALISATION GLOBALE ===');
    console.log('[globalData.js] Initialisation du composant globalData...');

    // === FONCTIONS GLOBALES (disponibles immédiatement) ===
    
    // Fonction d'accès globale (avec vérification robuste)
    window.getGlobalData = function () {
        try {
            const dataString = localStorage.getItem('globalData');
            if (!dataString) {
                console.warn('[globalData.js] ⚠️ Aucune donnée dans localStorage');
                return null;
            }
            const data = JSON.parse(dataString);
            console.log('[globalData.js] getGlobalData() appelé, retour :', data);
            return data;
        } catch (error) {
            console.error('[globalData.js] ❌ Erreur parsing localStorage:', error);
            return null;
        }
    };
    
    // Fonction pour changer la langue
    window.setSiteLanguage = function (newLanguage) {
        console.log('[globalData.js] 🔄 Changement de langue demandé vers :', newLanguage);
        try {
            const dataString = localStorage.getItem('globalData');
            if (!dataString) {
                console.error('[globalData.js] ❌ Aucune donnée dans localStorage pour changer la langue');
                return false;
            }
            const data = JSON.parse(dataString);
            if (data && data.site) {
                const oldLanguage = data.site.siteLanguage;
                data.site.siteLanguage = newLanguage;
                localStorage.setItem('globalData', JSON.stringify(data));
                console.log('[globalData.js] ✅ Langue changée de', oldLanguage, 'vers', newLanguage);
                console.log('[globalData.js] 💾 Langue sauvegardée dans localStorage');
                return true;
            } else {
                console.error('[globalData.js] ❌ Structure de données invalide');
                return false;
            }
        } catch (error) {
            console.error('[globalData.js] ❌ Erreur lors du changement de langue:', error);
            return false;
        }
    };
    
    // Fonction pour obtenir les traductions
    window.getTranslations = function (language = null) {
        try {
            const dataString = localStorage.getItem('globalData');
            if (!dataString) {
                console.warn('[globalData.js] ⚠️ Aucune donnée pour traductions');
                return {};
            }
            const data = JSON.parse(dataString);
            if (!data || !data.translations) {
                console.warn('[globalData.js] ⚠️ Aucune traduction trouvée');
                return {};
            }

            const lang = language || data.site?.siteLanguage || 'fr';
            console.log('[globalData.js] 📖 Récupération traductions pour langue :', lang);
            return data.translations[lang] || data.translations.fr || {};
        } catch (error) {
            console.error('[globalData.js] ❌ Erreur récupération traductions:', error);
            return {};
        }
    };

    // Fonction pour obtenir le thème complet
    window.getTheme = function() {
        try {
            const dataString = localStorage.getItem('globalData');
            if (!dataString) {
                console.warn('[globalData.js] ⚠️ Aucune donnée pour le thème');
                return null;
            }
            const data = JSON.parse(dataString);
            if (!data || !data.theme) {
                console.warn('[globalData.js] ⚠️ Thème non trouvé dans les données');
                return null;
            }
            console.log('[globalData.js] 🎨 Récupération du thème global');
            return data.theme;
        } catch (error) {
            console.error('[globalData.js] ❌ Erreur récupération thème:', error);
            return null;
        }
    };

    // Fonction pour obtenir une couleur spécifique
    window.getThemeColor = function(colorName) {
        const theme = window.getTheme();
        if (!theme || !theme.colors) {
            console.warn('[globalData.js] ⚠️ Couleurs de thème non trouvées');
            return null;
        }
        const color = theme.colors[colorName];
        console.log(`[globalData.js] 🎨 Couleur ${colorName}:`, color);
        return color;
    };

    // Fonction pour obtenir un espacement spécifique
    window.getThemeSpacing = function(spacingType) {
        const theme = window.getTheme();
        if (!theme || !theme.spacing) {
            console.warn('[globalData.js] ⚠️ Espacements de thème non trouvés');
            return null;
        }
        const spacing = theme.spacing[spacingType];
        console.log(`[globalData.js] 📏 Espacement ${spacingType}:`, spacing);
        return spacing;
    };

    // Fonction pour obtenir une police spécifique
    window.getThemeFont = function(fontType) {
        const theme = window.getTheme();
        if (!theme || !theme.fonts) {
            console.warn('[globalData.js] ⚠️ Polices de thème non trouvées');
            return null;
        }
        const font = theme.fonts[fontType];
        console.log(`[globalData.js] 🔤 Police ${fontType}:`, font);
        return font;
    };

    // Fonction pour mettre à jour le thème
    window.updateTheme = function(property, value) {
        try {
            const dataString = localStorage.getItem('globalData');
            if (!dataString) {
                console.error('[globalData.js] ❌ Aucune donnée pour mise à jour thème');
                return false;
            }
            const data = JSON.parse(dataString);
            if (!data.theme) {
                console.error('[globalData.js] ❌ Thème non trouvé pour mise à jour');
                return false;
            }
            
            // Mettre à jour la propriété
            data.theme[property] = value;
            localStorage.setItem('globalData', JSON.stringify(data));
            console.log(`[globalData.js] ✅ Thème mis à jour - ${property}:`, value);
            return true;
        } catch (error) {
            console.error('[globalData.js] ❌ Erreur mise à jour thème:', error);
            return false;
        }
    };

    console.log('[globalData.js] ✅ Fonctions globales définies');

    // === DONNÉES DU SITE ===
    
    // Fakedata pour portfolio
    const portfolio = [
        {
            image: "images/work-1.jpg",
            title: "Projet Web Design",
            description: "Création d'un site vitrine moderne pour une startup.",
            type: "Web Design"
        },
        {
            image: "images/work-2.jpg",
            title: "Application Mobile",
            description: "Développement d'une app mobile pour la gestion de tâches.",
            type: "Mobile App"
        },
        {
            image: "images/work-3.jpg",
            title: "Identité Visuelle",
            description: "Réalisation d'une charte graphique complète.",
            type: "Branding"
        },
        {
            image: "images/work-4.jpg",
            title: "Site E-commerce",
            description: "Développement d'une plateforme de vente en ligne complète.",
            type: "E-commerce"
        },
        {
            image: "images/work-5.jpg",
            title: "Application Dashboard",
            description: "Interface d'administration avec analytics et reporting.",
            type: "Dashboard"
        },
        {
            image: "images/work-6.jpg",
            title: "Site Corporate",
            description: "Site institutionnel pour une grande entreprise.",
            type: "Corporate"
        },
        {
            image: "images/work-7.jpg",
            title: "Portfolio Photographe",
            description: "Galerie en ligne pour un photographe professionnel.",
            type: "Portfolio"
        },
        {
            image: "images/work-8.jpg",
            title: "Application SaaS",
            description: "Plateforme de gestion de projets collaborative.",
            type: "SaaS"
        },
        {
            image: "images/work-9.jpg",
            title: "Site de Blog",
            description: "Blog professionnel avec système de commentaires.",
            type: "Blog"
        },
        {
            image: "images/work-10.jpg",
            title: "Marketplace",
            description: "Plateforme de vente entre particuliers.",
            type: "Marketplace"
        },
        {
            image: "images/work-11.jpg",
            title: "Application Fitness",
            description: "App mobile de coaching sportif personnalisé.",
            type: "Fitness"
        },
        {
            image: "images/work-12.jpg",
            title: "Site Immobilier",
            description: "Portail de recherche et gestion de biens immobiliers.",
            type: "Immobilier"
        }
    ];
    console.log('[globalData.js] Portfolio créé avec', portfolio.length, 'projets:', portfolio);

    // Configuration du thème global du site
    const theme = {
        // Couleurs principales
        colors: {
            primary: '#1683fb',        // Bleu principal du site
            primaryHover: '#0056b3',   // Bleu au survol
            secondary: '#6c757d',      // Gris secondaire
            success: '#28a745',        // Vert de succès
            info: '#17a2b8',          // Bleu info
            warning: '#ffc107',        // Jaune d'avertissement
            danger: '#dc3545',         // Rouge d'erreur
            light: '#f8f9fa',          // Gris clair
            dark: '#343a40',           // Gris foncé
            white: '#ffffff',          // Blanc
            black: '#000000',          // Noir
            
            // Couleurs spécifiques du template
            navbarBg: '#1683fb',       // Fond de la navbar
            navbarBgMobile: '#000000', // Fond navbar mobile
            textPrimary: '#212529',    // Texte principal
            textSecondary: '#6c757d',  // Texte secondaire
            textLight: '#ffffff',      // Texte blanc
            textMuted: 'rgba(255, 255, 255, 0.7)', // Texte atténué
            
            // Couleurs d'accent
            accent1: '#ff9800',        // Orange (couleur primaire du site)
            accent2: '#e83e8c',        // Rose
            accent3: '#20c997',        // Teal
            accent4: '#fd7e14',        // Orange foncé
            
            // Arrière-plans
            bgLight: '#fcf8e3',        // Fond clair
            bgOverlay: 'rgba(0, 0, 0, 0.5)', // Superposition sombre
            bgCard: '#ffffff',         // Fond des cartes
            
            // Bordures et ombres
            borderLight: '#dee2e6',    // Bordure claire
            borderDark: '#6c757d',     // Bordure foncée
            shadow: 'rgba(0, 0, 0, 0.15)', // Ombre
            shadowHover: 'rgba(0, 0, 0, 0.25)' // Ombre au survol
        },
        
        // Typographie
        fonts: {
            primary: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
            secondary: 'Georgia, "Times New Roman", Times, serif',
            monospace: 'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
            
            // Tailles de police
            sizes: {
                xs: '0.75rem',    // 12px
                sm: '0.875rem',   // 14px
                base: '1rem',     // 16px
                lg: '1.125rem',   // 18px
                xl: '1.25rem',    // 20px
                '2xl': '1.5rem',  // 24px
                '3xl': '1.875rem', // 30px
                '4xl': '2.25rem', // 36px
                '5xl': '3rem',    // 48px
                '6xl': '4rem'     // 64px
            },
            
            // Poids de police
            weights: {
                light: 300,
                normal: 400,
                medium: 500,
                semibold: 600,
                bold: 700,
                extrabold: 800,
                black: 900
            }
        },
        
        // Espacements
        spacing: {
            xs: '0.25rem',    // 4px
            sm: '0.5rem',     // 8px
            md: '1rem',       // 16px
            lg: '1.5rem',     // 24px
            xl: '2rem',       // 32px
            '2xl': '3rem',    // 48px
            '3xl': '4rem',    // 64px
            '4xl': '6rem',    // 96px
            '5xl': '8rem'     // 128px
        },
        
        // Rayons de bordure
        borderRadius: {
            sm: '0.125rem',   // 2px
            md: '0.375rem',   // 6px
            lg: '0.5rem',     // 8px
            xl: '0.75rem',    // 12px
            '2xl': '1rem',    // 16px
            full: '50%'       // Cercle
        },
        
        // Ombres
        shadows: {
            sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
            md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
        },
        
        // Transitions
        transitions: {
            fast: '150ms ease-in-out',
            normal: '300ms ease-in-out',
            slow: '500ms ease-in-out'
        },
        
        // Points de rupture responsive
        breakpoints: {
            sm: '576px',
            md: '768px',
            lg: '992px',
            xl: '1200px'
        }
    };
    console.log('[globalData.js] Thème configuré:', theme);

    // Informations sur l'auteur/entreprise
    const author = {
        name: "BEE",
        fullName: "BEE Creative Agency",
        email: "contact@bee-agency.com",
        phone: "+33 1 23 45 67 89",
        address: "123 Rue de la Créativité, 75001 Paris",
        website: "https://bee-agency.com",
        description: "Agence créative spécialisée dans le développement web et mobile",
        socialLinks: {
            facebook: "#",
            twitter: "#", 
            instagram: "#",
            linkedin: "#",
            github: "#"
        },
        skills: ["Web Design", "UI/UX", "Mobile Apps", "Branding", "SEO"],
        experience: "5+ ans d'expérience",
        projectsCompleted: 150
    };
    console.log('[globalData.js] Auteur configuré:', author);

    // Configuration du site
    const site = {
        title: "BEE Portfolio",
        description: "Portfolio créatif et moderne pour agence web",
        keywords: "portfolio, design, web, créatif, agence",
        language: "fr",
        siteLanguage: "fr", // Langue par défaut
        url: "https://bee-portfolio.com",
        logo: "images/logo.png",
        favicon: "images/favicon.ico",
        version: "2.0.0",
        lastUpdate: new Date().toISOString()
    };
    console.log('[globalData.js] Site configuré:', site);

    // Traductions multilingues
    const translations = {
        fr: {
            // Navigation principale
            home: "Accueil",
            about: "À Propos", 
            projects: "Projets",
            blog: "Blog",
            contact: "Contact",
            
            // Sections
            welcome: "Bienvenue",
            portfolio: "Portfolio",
            services: "Services",
            testimonials: "Témoignages",
            
            // Footer
            newsletter: "Newsletter",
            enterEmail: "Entrez votre email",
            subscribe: "S'abonner",
            copyrightText: "Tous droits réservés | Ce template est fait avec",
            by: "par",
            
            // Boutons
            learnMore: "En savoir plus",
            getStarted: "Commencer",
            viewProject: "Voir le projet",
            downloadCV: "Télécharger CV",
            
            // Messages
            thanks: "Merci",
            error: "Erreur",
            success: "Succès"
        },
        en: {
            // Navigation principale
            home: "Home",
            about: "About",
            projects: "Projects", 
            blog: "Blog",
            contact: "Contact",
            
            // Sections
            welcome: "Welcome",
            portfolio: "Portfolio",
            services: "Services",
            testimonials: "Testimonials",
            
            // Footer
            newsletter: "Newsletter",
            enterEmail: "Enter your email",
            subscribe: "Subscribe",
            copyrightText: "All rights reserved | This template is made with",
            by: "by",
            
            // Boutons
            learnMore: "Learn More",
            getStarted: "Get Started",
            viewProject: "View Project",
            downloadCV: "Download CV",
            
            // Messages
            thanks: "Thank you",
            error: "Error",
            success: "Success"
        }
    };
    console.log('[globalData.js] Traductions configurées:', translations);

    // Assemblage des données globales
    let globalData;

    // Vérifier si des données existent déjà dans localStorage
    const existingData = localStorage.getItem('globalData');
    
    if (existingData) {
        console.log('[globalData.js] 📦 Données existantes trouvées, préservation de la langue...');
        try {
            const parsedData = JSON.parse(existingData);
            const currentLanguage = parsedData.site?.siteLanguage || 'fr';
            console.log('[globalData.js] 🌍 Langue actuelle préservée :', currentLanguage);
            // Conserver la langue actuelle mais mettre à jour les autres données
            site.siteLanguage = currentLanguage;
            globalData = { portfolio, author, site, translations, theme };
            
            localStorage.setItem('globalData', JSON.stringify(globalData));
            console.log('[globalData.js] ✅ Données mises à jour avec langue préservée :', currentLanguage);
        } catch (error) {
            console.warn('[globalData.js] ⚠️ Erreur parsing données existantes, réinitialisation...');
            globalData = { portfolio, author, site, translations, theme };
            localStorage.setItem('globalData', JSON.stringify(globalData));
        }
    } else {
        console.log('[globalData.js] 🆕 Aucune donnée existante, initialisation avec langue par défaut...');
        globalData = { portfolio, author, site, translations, theme };
        localStorage.setItem('globalData', JSON.stringify(globalData));
        console.log('[globalData.js] ✅ Nouvelles données initialisées avec langue :', site.siteLanguage);
    }

    // Émettre un événement pour signaler que globalData est prêt
    const globalDataReadyEvent = new CustomEvent('globalDataReady', { detail: globalData });
    window.dispatchEvent(globalDataReadyEvent);
    console.log('[globalData.js] ✅ Événement globalDataReady émis');
    console.log('[globalData.js] ✅ Portfolio réinitialisé avec', globalData.portfolio.length, 'projets');
    console.log('[globalData.js] ✅ Langue par défaut :', globalData.site.siteLanguage);

    // === FONCTIONS UTILITAIRES AVANCÉES POUR LE THÈME ===

    // Fonction pour appliquer dynamiquement des styles CSS
    window.applyThemeStyles = function(selector, styles) {
        try {
            const elements = document.querySelectorAll(selector);
            const theme = window.getTheme();
            
            if (!theme) {
                console.error('[globalData.js] ❌ Thème non disponible pour application styles');
                return false;
            }

            elements.forEach(element => {
                Object.entries(styles).forEach(([property, value]) => {
                    // Remplacer les variables de thème par leurs valeurs
                    let cssValue = value;
                    
                    // Remplacer les couleurs
                    if (value.startsWith('theme.colors.')) {
                        const colorName = value.replace('theme.colors.', '');
                        cssValue = theme.colors[colorName] || value;
                    }
                    
                    // Remplacer les espacements
                    if (value.startsWith('theme.spacing.')) {
                        const spacingName = value.replace('theme.spacing.', '');
                        cssValue = theme.spacing[spacingName] || value;
                    }
                    
                    // Remplacer les polices
                    if (value.startsWith('theme.fonts.')) {
                        const fontName = value.replace('theme.fonts.', '');
                        cssValue = theme.fonts[fontName] || value;
                    }
                    
                    element.style[property] = cssValue;
                });
            });

            console.log(`[globalData.js] ✅ Styles appliqués à ${elements.length} éléments`);
            return true;
        } catch (error) {
            console.error('[globalData.js] ❌ Erreur application styles:', error);
            return false;
        }
    };

    // Fonction pour appliquer automatiquement les styles du thème à tous les éléments concernés
    window.applyAutoThemeStyles = function() {
        try {
            const theme = window.getTheme();
            
            if (!theme) {
                console.error('[globalData.js] ❌ Thème non disponible pour application styles automatique');
                return false;
            }

            // Injecter les variables CSS custom properties pour une meilleure performance
            injectThemeCustomProperties(theme);
            
            // Appliquer les styles spécifiques aux composants existants
            applyNavbarStyles(theme);
            applyButtonStyles(theme);
            applyCardStyles(theme);
            applyFormStyles(theme);
            
            console.log('[globalData.js] ✅ Styles du thème appliqués automatiquement avec succès');
            return true;
        } catch (error) {
            console.error('[globalData.js] ❌ Erreur application styles automatique:', error);
            return false;
        }
    };

    // Injecter les custom properties CSS
    function injectThemeCustomProperties(theme) {
        let styleSheet = document.getElementById('theme-custom-properties');
        if (!styleSheet) {
            styleSheet = document.createElement('style');
            styleSheet.id = 'theme-custom-properties';
            document.head.appendChild(styleSheet);
        }

        const css = `
            :root {
                /* Couleurs */
                --theme-primary: ${theme.colors.primary};
                --theme-primary-hover: ${theme.colors.primaryHover};
                --theme-secondary: ${theme.colors.secondary};
                --theme-accent1: ${theme.colors.accent1};
                --theme-accent2: ${theme.colors.accent2};
                --theme-success: ${theme.colors.success};
                --theme-danger: ${theme.colors.danger};
                --theme-warning: ${theme.colors.warning};
                --theme-info: ${theme.colors.info};
                --theme-light: ${theme.colors.light};
                --theme-dark: ${theme.colors.dark};
                --theme-white: ${theme.colors.white};
                --theme-black: ${theme.colors.black};
                
                /* Couleurs texte */
                --theme-text-primary: ${theme.colors.textPrimary};
                --theme-text-secondary: ${theme.colors.textSecondary};
                --theme-text-light: ${theme.colors.textLight};
                --theme-text-muted: ${theme.colors.textMuted};
                
                /* Backgrounds */
                --theme-bg-light: ${theme.colors.bgLight};
                --theme-bg-card: ${theme.colors.bgCard};
                --theme-bg-overlay: ${theme.colors.bgOverlay};
                
                /* Navigation */
                --theme-navbar-bg: ${theme.colors.navbarBg};
                --theme-navbar-bg-mobile: ${theme.colors.navbarBgMobile};
                
                /* Bordures et ombres */
                --theme-border-light: ${theme.colors.borderLight};
                --theme-border-dark: ${theme.colors.borderDark};
                --theme-shadow: ${theme.colors.shadow};
                --theme-shadow-hover: ${theme.colors.shadowHover};
                
                /* Polices */
                --theme-font-primary: ${theme.fonts.primary};
                --theme-font-secondary: ${theme.fonts.secondary};
                --theme-font-monospace: ${theme.fonts.monospace};
                
                /* Espacements */
                --theme-spacing-xs: ${theme.spacing.xs};
                --theme-spacing-sm: ${theme.spacing.sm};
                --theme-spacing-md: ${theme.spacing.md};
                --theme-spacing-lg: ${theme.spacing.lg};
                --theme-spacing-xl: ${theme.spacing.xl};
                --theme-spacing-2xl: ${theme.spacing['2xl']};
                
                /* Transitions */
                --theme-transition-fast: ${theme.transitions.fast};
                --theme-transition-normal: ${theme.transitions.normal};
                --theme-transition-slow: ${theme.transitions.slow};
                
                /* Rayons de bordure */
                --theme-radius-sm: ${theme.borderRadius.sm};
                --theme-radius-md: ${theme.borderRadius.md};
                --theme-radius-lg: ${theme.borderRadius.lg};
                --theme-radius-xl: ${theme.borderRadius.xl};
            }
        `;

        styleSheet.textContent = css;
    }

    // Appliquer les styles à la navbar
    function applyNavbarStyles(theme) {
        const navbar = document.querySelector('.navbar');
        const navbarBrand = document.querySelector('.navbar-brand');
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        
        if (navbar) {
            navbar.style.setProperty('background-color', theme.colors.navbarBg, 'important');
            navbar.style.transition = theme.transitions.normal;
        }
        
        if (navbarBrand) {
            navbarBrand.style.color = theme.colors.textLight;
        }
        
        navLinks.forEach(link => {
            link.style.color = theme.colors.textLight;
            link.style.transition = theme.transitions.fast;
            
            // Éviter de dupliquer les event listeners
            if (!link.hasAttribute('data-theme-styled')) {
                link.setAttribute('data-theme-styled', 'true');
                
                link.addEventListener('mouseenter', function() {
                    this.style.color = theme.colors.accent1;
                });
                
                link.addEventListener('mouseleave', function() {
                    this.style.color = theme.colors.textLight;
                });
            }
        });
    }

    // Appliquer les styles aux boutons
    function applyButtonStyles(theme) {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            // Éviter de dupliquer les event listeners
            if (button.hasAttribute('data-theme-styled')) return;
            button.setAttribute('data-theme-styled', 'true');
            
            // Boutons primaires
            if (button.classList.contains('btn-primary')) {
                button.style.backgroundColor = theme.colors.primary;
                button.style.borderColor = theme.colors.primary;
                button.style.transition = theme.transitions.fast;
                
                button.addEventListener('mouseenter', function() {
                    this.style.backgroundColor = theme.colors.primaryHover;
                    this.style.borderColor = theme.colors.primaryHover;
                    this.style.transform = 'translateY(-2px)';
                });
                
                button.addEventListener('mouseleave', function() {
                    this.style.backgroundColor = theme.colors.primary;
                    this.style.borderColor = theme.colors.primary;
                    this.style.transform = 'translateY(0)';
                });
            }
            
            // Boutons d'accent
            if (button.classList.contains('btn-accent') || button.classList.contains('btn-warning')) {
                button.style.backgroundColor = theme.colors.accent1;
                button.style.borderColor = theme.colors.accent1;
                button.style.color = theme.colors.white;
            }
        });
    }

    // Appliquer les styles aux cartes
    function applyCardStyles(theme) {
        const cards = document.querySelectorAll('.card');
        
        cards.forEach(card => {
            // Éviter de dupliquer les event listeners
            if (card.hasAttribute('data-theme-styled')) return;
            card.setAttribute('data-theme-styled', 'true');
            
            card.style.backgroundColor = theme.colors.bgCard;
            card.style.borderColor = theme.colors.borderLight;
            card.style.borderRadius = theme.borderRadius.md;
            card.style.boxShadow = `0 2px 4px ${theme.colors.shadow}`;
            card.style.transition = theme.transitions.normal;
            
            card.addEventListener('mouseenter', function() {
                this.style.boxShadow = `0 4px 12px ${theme.colors.shadowHover}`;
                this.style.transform = 'translateY(-2px)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.boxShadow = `0 2px 4px ${theme.colors.shadow}`;
                this.style.transform = 'translateY(0)';
            });
        });
    }

    // Appliquer les styles aux formulaires
    function applyFormStyles(theme) {
        const inputs = document.querySelectorAll('input:not([type="color"]), textarea, select');
        
        inputs.forEach(input => {
            // Éviter de dupliquer les event listeners
            if (input.hasAttribute('data-theme-styled')) return;
            input.setAttribute('data-theme-styled', 'true');
            
            input.style.borderColor = theme.colors.borderLight;
            input.style.borderRadius = theme.borderRadius.sm;
            input.style.transition = theme.transitions.fast;
            
            input.addEventListener('focus', function() {
                this.style.borderColor = theme.colors.primary;
                this.style.boxShadow = `0 0 0 0.2rem ${theme.colors.primary}25`;
            });
            
            input.addEventListener('blur', function() {
                this.style.borderColor = theme.colors.borderLight;
                this.style.boxShadow = 'none';
            });
        });
    }

    // Initialisation automatique des styles au chargement
    document.addEventListener('DOMContentLoaded', function() {
        // Attendre un peu pour que tous les éléments soient chargés
        setTimeout(() => {
            if (window.applyAutoThemeStyles) {
                window.applyAutoThemeStyles();
            }
        }, 100);
    });

    console.log('[globalData.js] === FIN INITIALISATION GLOBALE ===');
})();
