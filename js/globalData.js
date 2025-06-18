// Objet global pour stocker toutes les données du site
window.globalData = window.globalData || {};

// Initialisation sécurisée des données globales
(function() {
    'use strict';
    
    console.log('[GlobalData] Initialisation en cours...');
    
    // Configuration du site
    window.globalData.site = {
        name: 'BEE Company',
        tagline: 'Engineering Excellence',
        email: 'contact@beecompany.com',
        phone: '+243 123 456 789',
        address: 'Kinshasa, RDC',
        social: {
            facebook: '#',
            twitter: '#',
            instagram: '#',
            linkedin: '#'
        }
    };

    // Configuration multilingue
    window.globalData.languages = {
        current: 'fr',
        available: ['fr', 'en'],
        fallback: 'fr'
    };

    // Navigation
    window.globalData.navigation = {
        fr: [
            { label: 'Accueil', href: 'index.html', active: false },
            { label: 'À propos', href: 'about.html', active: false },
            { label: 'Projets', href: 'project.html', active: false },
            { label: 'Blog', href: 'blog.html', active: false },
            { label: 'Contact', href: 'contact.html', active: false }
        ],
        en: [
            { label: 'Home', href: 'index.html', active: false },
            { label: 'About', href: 'about.html', active: false },
            { label: 'Projects', href: 'project.html', active: false },
            { label: 'Blog', href: 'blog.html', active: false },
            { label: 'Contact', href: 'contact.html', active: false }
        ]
    };

    // Services
    window.globalData.services = {
        fr: [
            {
                id: 'construction',
                title: 'Construction',
                description: 'Services de construction de qualité',
                icon: 'flaticon-engineer'
            },
            {
                id: 'architecture',
                title: 'Architecture',
                description: 'Conception architecturale moderne',
                icon: 'flaticon-architect'
            },
            {
                id: 'renovation',
                title: 'Rénovation',
                description: 'Rénovation et modernisation',
                icon: 'flaticon-renovation'
            }
        ],
        en: [
            {
                id: 'construction',
                title: 'Construction',
                description: 'Quality construction services',
                icon: 'flaticon-engineer'
            },
            {
                id: 'architecture',
                title: 'Architecture',
                description: 'Modern architectural design',
                icon: 'flaticon-architect'
            },
            {
                id: 'renovation',
                title: 'Renovation',
                description: 'Renovation and modernization',
                icon: 'flaticon-renovation'
            }
        ]
    };

    // Projets
    window.globalData.projects = {
        fr: [
            {
                id: 'project1',
                title: 'Centre Commercial Moderne',
                description: 'Construction d\'un centre commercial de 5000m²',
                image: 'images/work-1.jpg',
                category: 'commercial',
                status: 'completed'
            },
            {
                id: 'project2',
                title: 'Résidence Luxueuse',
                description: 'Villa moderne avec piscine et jardin',
                image: 'images/work-2.jpg',
                category: 'residential',
                status: 'in-progress'
            }
        ],
        en: [
            {
                id: 'project1',
                title: 'Modern Shopping Center',
                description: 'Construction of a 5000m² shopping center',
                image: 'images/work-1.jpg',
                category: 'commercial',
                status: 'completed'
            },
            {
                id: 'project2',
                title: 'Luxury Residence',
                description: 'Modern villa with pool and garden',
                image: 'images/work-2.jpg',
                category: 'residential',
                status: 'in-progress'
            }
        ]
    };

    // Équipe
    window.globalData.team = {
        fr: [
            {
                id: 'team1',
                name: 'Jean Dupont',
                position: 'Architecte Principal',
                image: 'images/team-1.jpg',
                bio: 'Expert en conception architecturale avec 15 ans d\'expérience'
            },
            {
                id: 'team2',
                name: 'Marie Martin',
                position: 'Ingénieur Civil',
                image: 'images/team-2.jpg',
                bio: 'Spécialiste en structures et génie civil'
            }
        ],
        en: [
            {
                id: 'team1',
                name: 'Jean Dupont',
                position: 'Lead Architect',
                image: 'images/team-1.jpg',
                bio: 'Expert in architectural design with 15 years of experience'
            },
            {
                id: 'team2',
                name: 'Marie Martin',
                position: 'Civil Engineer',
                image: 'images/team-2.jpg',
                bio: 'Specialist in structures and civil engineering'
            }
        ]
    };

    // Témoignages
    window.globalData.testimonials = {
        fr: [
            {
                id: 'testimonial1',
                name: 'Pierre Dubois',
                company: 'Société ABC',
                text: 'Excellent travail, très professionnel et dans les délais.',
                rating: 5,
                image: 'images/person_1.jpg'
            },
            {
                id: 'testimonial2',
                name: 'Sophie Laurent',
                company: 'Entreprise XYZ',
                text: 'Qualité exceptionnelle, je recommande vivement.',
                rating: 5,
                image: 'images/person_2.jpg'
            }
        ],
        en: [
            {
                id: 'testimonial1',
                name: 'Pierre Dubois',
                company: 'ABC Company',
                text: 'Excellent work, very professional and on time.',
                rating: 5,
                image: 'images/person_1.jpg'
            },
            {
                id: 'testimonial2',
                name: 'Sophie Laurent',
                company: 'XYZ Enterprise',
                text: 'Exceptional quality, I highly recommend.',
                rating: 5,
                image: 'images/person_2.jpg'
            }
        ]
    };

    // Configuration du thème
    window.globalData.theme = {
        // Couleurs principales
        colors: {
            primary: '#f8b500',
            secondary: '#333333',
            accent: '#e67e22',
            background: '#ffffff',
            surface: '#f8f9fa',
            text: {
                primary: '#333333',
                secondary: '#666666',
                light: '#999999'
            },
            status: {
                success: '#28a745',
                warning: '#ffc107',
                error: '#dc3545',
                info: '#17a2b8'
            }
        },

        // Typographie
        fonts: {
            primary: '"Open Sans", Arial, sans-serif',
            heading: '"Playfair Display", Georgia, serif',
            mono: '"Courier New", monospace'
        },

        // Espacements
        spacing: {
            xs: '0.25rem',
            sm: '0.5rem',
            md: '1rem',
            lg: '1.5rem',
            xl: '2rem',
            xxl: '3rem'
        },

        // Points de rupture
        breakpoints: {
            sm: '576px',
            md: '768px',
            lg: '992px',
            xl: '1200px'
        },

        // Animations
        animations: {
            duration: {
                fast: '0.2s',
                normal: '0.3s',
                slow: '0.5s'
            },
            easing: {
                default: 'ease',
                smooth: 'ease-in-out',
                bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
            }
        }
    };

    console.log('[GlobalData] Données de base initialisées');

    // Déclencher un événement pour notifier que globalData est prêt
    window.dispatchEvent(new CustomEvent('globalDataReady', { 
        detail: { 
            message: 'GlobalData initialisé avec succès',
            sections: Object.keys(window.globalData),
            timestamp: new Date().toISOString()
        } 
    }));

    console.log('📢 Événement globalDataReady déclenché');
})();

// === FONCTIONS GLOBALES (disponibles immédiatement) ===

// Fonction d'accès générale aux données globales
window.getGlobalData = function(section) {
    try {
        if (section) {
            return window.globalData[section] || null;
        }
        return window.globalData;
    } catch (error) {
        console.error('[getGlobalData] Erreur:', error);
        return null;
    }
};

// Fonction pour obtenir l'objet thème complet
window.getTheme = function() {
    try {
        return window.globalData.theme || {};
    } catch (error) {
        console.error('[getTheme] Erreur:', error);
        return {};
    }
};

// Fonction pour obtenir une couleur du thème
window.getThemeColor = function(colorPath) {
    try {
        const theme = window.getTheme();
        const pathArray = colorPath.split('.');
        let color = theme.colors;
        
        for (const path of pathArray) {
            if (color && color[path]) {
                color = color[path];
            } else {
                console.warn(`[getThemeColor] Couleur non trouvée: ${colorPath}`);
                return null;
            }
        }
        
        return color;
    } catch (error) {
        console.error('[getThemeColor] Erreur:', error);
        return null;
    }
};

// Fonction pour obtenir un espacement du thème
window.getThemeSpacing = function(size) {
    try {
        const theme = window.getTheme();
        return theme.spacing && theme.spacing[size] ? theme.spacing[size] : null;
    } catch (error) {
        console.error('[getThemeSpacing] Erreur:', error);
        return null;
    }
};

// Fonction pour obtenir une police du thème
window.getThemeFont = function(fontType) {
    try {
        const theme = window.getTheme();
        return theme.fonts && theme.fonts[fontType] ? theme.fonts[fontType] : null;
    } catch (error) {
        console.error('[getThemeFont] Erreur:', error);
        return null;
    }
};

// Fonction pour obtenir la langue courante
window.getCurrentLanguage = function() {
    try {
        return window.globalData.languages.current;
    } catch (error) {
        console.error('[getCurrentLanguage] Erreur:', error);
        return 'fr';
    }
};

// Fonction pour changer la langue
window.setCurrentLanguage = function(lang) {
    try {
        if (window.globalData.languages.available.includes(lang)) {
            window.globalData.languages.current = lang;
            return true;
        }
        return false;
    } catch (error) {
        console.error('[setCurrentLanguage] Erreur:', error);
        return false;
    }
};

// Fonction pour obtenir les données traduites
window.getLocalizedData = function(section) {
    try {
        const lang = window.getCurrentLanguage();
        const data = window.globalData[section];
        
        if (data && data[lang]) {
            return data[lang];
        }
        
        // Fallback vers la langue par défaut
        const fallback = window.globalData.languages.fallback;
        if (data && data[fallback]) {
            return data[fallback];
        }
        
        return null;
    } catch (error) {
        console.error('[getLocalizedData] Erreur:', error);
        return null;
    }
};

// Fonction pour appliquer des styles basés sur le thème
window.applyThemeStyles = function(element, styles) {
    try {
        if (!element || !styles) return;
        
        for (const [property, value] of Object.entries(styles)) {
            if (typeof value === 'string' && value.startsWith('theme.')) {
                const themePath = value.replace('theme.', '');
                const themeValue = getThemeValue(themePath);
                if (themeValue) {
                    element.style[property] = themeValue;
                }
            } else {
                element.style[property] = value;
            }
        }
    } catch (error) {
        console.error('[applyThemeStyles] Erreur:', error);
    }
};

// Fonction helper pour obtenir une valeur du thème par chemin
function getThemeValue(path) {
    try {
        const pathArray = path.split('.');
        let value = window.globalData.theme;
        
        for (const pathPart of pathArray) {
            if (value && value[pathPart]) {
                value = value[pathPart];
            } else {
                return null;
            }
        }
        
        return value;
    } catch (error) {
        console.error('[getThemeValue] Erreur:', error);
        return null;
    }
}

// Fonction pour appliquer automatiquement le thème aux éléments avec data-theme
window.applyAutoThemeStyles = function() {
    try {
        const themedElements = document.querySelectorAll('[data-theme]');
        
        themedElements.forEach(element => {
            const themeConfig = element.getAttribute('data-theme');
            try {
                const config = JSON.parse(themeConfig);
                window.applyThemeStyles(element, config);
            } catch (error) {
                console.warn('[applyAutoThemeStyles] Configuration invalide:', themeConfig, error);
            }
        });
    } catch (error) {
        console.error('[applyAutoThemeStyles] Erreur:', error);
    }
};

// Fonction pour obtenir les traductions (alias pour getLocalizedData)
window.getTranslations = function(section) {
    return window.getLocalizedData(section);
};

// Fonction pour changer la langue (alias pour setCurrentLanguage)
window.setSiteLanguage = function(lang) {
    const result = window.setCurrentLanguage(lang);
    if (result) {
        console.log(`[setSiteLanguage] Langue changée vers: ${lang}`);
        // Déclencher un événement pour notifier le changement
        window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));
    }
    return result;
};

// === DONNÉES PORTFOLIO SPÉCIFIQUES ===

// Portfolio étendu pour l'affichage
window.globalData.portfolio = {
    fr: [
        {
            id: 'portfolio1',
            title: 'Centre Commercial Moderne',
            description: 'Construction d\'un centre commercial de 5000m²',
            image: 'images/work-1.jpg',
            thumbnail: 'images/work-1.jpg',
            category: 'commercial',
            status: 'completed',
            year: '2024'
        },
        {
            id: 'portfolio2',
            title: 'Résidence Luxueuse',
            description: 'Villa moderne avec piscine et jardin',
            image: 'images/work-2.jpg',
            thumbnail: 'images/work-2.jpg',
            category: 'residential',
            status: 'in-progress',
            year: '2024'
        },
        {
            id: 'portfolio3',
            title: 'Immeuble de Bureaux',
            description: 'Complexe de bureaux moderne de 10 étages',
            image: 'images/work-3.jpg',
            thumbnail: 'images/work-3.jpg',
            category: 'commercial',
            status: 'completed',
            year: '2023'
        },
        {
            id: 'portfolio4',
            title: 'Résidence Familiale',
            description: 'Maison familiale avec jardin paysager',
            image: 'images/work-4.jpg',
            thumbnail: 'images/work-4.jpg',
            category: 'residential',
            status: 'completed',
            year: '2023'
        },
        {
            id: 'portfolio5',
            title: 'Centre Médical',
            description: 'Clinique moderne avec équipements de pointe',
            image: 'images/work-5.jpg',
            thumbnail: 'images/work-5.jpg',
            category: 'healthcare',
            status: 'completed',
            year: '2024'
        },
        {
            id: 'portfolio6',
            title: 'École Primaire',
            description: 'Établissement scolaire avec cours de récréation',
            image: 'images/work-6.jpg',
            thumbnail: 'images/work-6.jpg',
            category: 'education',
            status: 'completed',
            year: '2023'
        },
        {
            id: 'portfolio7',
            title: 'Hôtel de Luxe',
            description: 'Hôtel 5 étoiles avec spa et restaurant',
            image: 'images/work-7.jpg',
            thumbnail: 'images/work-7.jpg',
            category: 'hospitality',
            status: 'in-progress',
            year: '2024'
        },
        {
            id: 'portfolio8',
            title: 'Entrepôt Industriel',
            description: 'Centre logistique moderne automatisé',
            image: 'images/work-8.jpg',
            thumbnail: 'images/work-8.jpg',
            category: 'industrial',
            status: 'completed',
            year: '2023'
        },
        {
            id: 'portfolio9',
            title: 'Stade Municipal',
            description: 'Stade de football de 20 000 places',
            image: 'images/work-9.jpg',
            thumbnail: 'images/work-9.jpg',
            category: 'sports',
            status: 'completed',
            year: '2022'
        },
        {
            id: 'portfolio10',
            title: 'Centre Commercial Premium',
            description: 'Mall de luxe avec cinéma et restaurants',
            image: 'images/work-10.jpg',
            thumbnail: 'images/work-10.jpg',
            category: 'commercial',
            status: 'completed',
            year: '2023'
        },
        {
            id: 'portfolio11',
            title: 'Villa Contemporaine',
            description: 'Architecture contemporaine avec terrasse',
            image: 'images/work-11.jpg',
            thumbnail: 'images/work-11.jpg',
            category: 'residential',
            status: 'completed',
            year: '2024'
        },
        {
            id: 'portfolio12',
            title: 'Parking Multi-niveaux',
            description: 'Parking automatisé de 500 places',
            image: 'images/work-12.jpg',
            thumbnail: 'images/work-12.jpg',
            category: 'infrastructure',
            status: 'completed',
            year: '2023'
        }
    ],
    en: [
        {
            id: 'portfolio1',
            title: 'Modern Shopping Center',
            description: 'Construction of a 5000m² shopping center',
            image: 'images/work-1.jpg',
            thumbnail: 'images/work-1.jpg',
            category: 'commercial',
            status: 'completed',
            year: '2024'
        },
        {
            id: 'portfolio2',
            title: 'Luxury Residence',
            description: 'Modern villa with pool and garden',
            image: 'images/work-2.jpg',
            thumbnail: 'images/work-2.jpg',
            category: 'residential',
            status: 'in-progress',
            year: '2024'
        },
        {
            id: 'portfolio3',
            title: 'Office Building',
            description: 'Modern 10-story office complex',
            image: 'images/work-3.jpg',
            thumbnail: 'images/work-3.jpg',
            category: 'commercial',
            status: 'completed',
            year: '2023'
        },
        {
            id: 'portfolio4',
            title: 'Family Residence',
            description: 'Family home with landscaped garden',
            image: 'images/work-4.jpg',
            thumbnail: 'images/work-4.jpg',
            category: 'residential',
            status: 'completed',
            year: '2023'
        },
        {
            id: 'portfolio5',
            title: 'Medical Center',
            description: 'Modern clinic with state-of-the-art equipment',
            image: 'images/work-5.jpg',
            thumbnail: 'images/work-5.jpg',
            category: 'healthcare',
            status: 'completed',
            year: '2024'
        },
        {
            id: 'portfolio6',
            title: 'Primary School',
            description: 'Educational facility with playground',
            image: 'images/work-6.jpg',
            thumbnail: 'images/work-6.jpg',
            category: 'education',
            status: 'completed',
            year: '2023'
        },
        {
            id: 'portfolio7',
            title: 'Luxury Hotel',
            description: '5-star hotel with spa and restaurant',
            image: 'images/work-7.jpg',
            thumbnail: 'images/work-7.jpg',
            category: 'hospitality',
            status: 'in-progress',
            year: '2024'
        },
        {
            id: 'portfolio8',
            title: 'Industrial Warehouse',
            description: 'Modern automated logistics center',
            image: 'images/work-8.jpg',
            thumbnail: 'images/work-8.jpg',
            category: 'industrial',
            status: 'completed',
            year: '2023'
        },
        {
            id: 'portfolio9',
            title: 'Municipal Stadium',
            description: '20,000-seat football stadium',
            image: 'images/work-9.jpg',
            thumbnail: 'images/work-9.jpg',
            category: 'sports',
            status: 'completed',
            year: '2022'
        },
        {
            id: 'portfolio10',
            title: 'Premium Shopping Mall',
            description: 'Luxury mall with cinema and restaurants',
            image: 'images/work-10.jpg',
            thumbnail: 'images/work-10.jpg',
            category: 'commercial',
            status: 'completed',
            year: '2023'
        },
        {
            id: 'portfolio11',
            title: 'Contemporary Villa',
            description: 'Contemporary architecture with terrace',
            image: 'images/work-11.jpg',
            thumbnail: 'images/work-11.jpg',
            category: 'residential',
            status: 'completed',
            year: '2024'
        },
        {
            id: 'portfolio12',
            title: 'Multi-level Parking',
            description: 'Automated 500-space parking facility',
            image: 'images/work-12.jpg',
            thumbnail: 'images/work-12.jpg',
            category: 'infrastructure',
            status: 'completed',
            year: '2023'
        }
    ]
};

// Fonction pour obtenir le portfolio
window.getPortfolio = function() {
    return window.getLocalizedData('portfolio');
};

// === GESTION DU LOCALSTORAGE ===

// Fonction pour sauvegarder les données dans localStorage
window.saveToLocalStorage = function() {
    try {
        localStorage.setItem('globalData', JSON.stringify(window.globalData));
        console.log('💾 Données sauvegardées dans localStorage');
        return true;
    } catch (error) {
        console.error('❌ Erreur sauvegarde localStorage:', error);
        return false;
    }
};

// Fonction pour charger depuis localStorage
window.loadFromLocalStorage = function() {
    try {
        const data = localStorage.getItem('globalData');
        if (data) {
            const parsedData = JSON.parse(data);
            // Fusionner avec les données existantes
            Object.assign(window.globalData, parsedData);
            console.log('📂 Données chargées depuis localStorage');
            return true;
        }
        return false;
    } catch (error) {
        console.error('❌ Erreur chargement localStorage:', error);
        return false;
    }
};

// Fonction pour synchroniser avec localStorage
window.syncWithLocalStorage = function() {
    // Essayer de charger d'abord
    const loaded = window.loadFromLocalStorage();
    if (!loaded) {
        // Si pas de données, sauvegarder les données actuelles
        window.saveToLocalStorage();
    } else {
        // Vérifier si le portfolio existe dans localStorage
        const localData = JSON.parse(localStorage.getItem('globalData') || '{}');
        if (!localData.portfolio) {
            // Ajouter le portfolio et re-sauvegarder
            window.saveToLocalStorage();
        }
    }
};

// Initialiser localStorage avec les données complètes
window.syncWithLocalStorage();

console.log('💾 LocalStorage synchronisé avec', Object.keys(window.globalData).length, 'sections');

console.log('✅ GlobalData et fonctions globales initialisés avec succès');
console.log('📋 Sections disponibles:', Object.keys(window.globalData || {}));
console.log('🎨 Thème chargé avec', Object.keys(window.globalData?.theme || {}).length, 'sections');
console.log('🔧 Fonctions globales disponibles:', [
    'getGlobalData', 'getTheme', 'getThemeColor', 'getThemeSpacing', 
    'getThemeFont', 'getCurrentLanguage', 'setCurrentLanguage', 
    'getLocalizedData', 'applyThemeStyles', 'applyAutoThemeStyles', 'setTheme'
]);
console.log('✅ Fonctions supplémentaires ajoutées (getTranslations, setSiteLanguage, getPortfolio, setTheme)');

// Vérification du portfolio (avec check sécurisé)
try {
    const portfolioCount = window.globalData?.portfolio?.fr?.length || 0;
    console.log('📁 Portfolio chargé avec', portfolioCount, 'projets');
} catch(e) {
    console.warn('⚠️ Erreur lors de la vérification du portfolio:', e.message);
}

// Fonction pour changer le thème global
window.setTheme = function(themeData) {
    try {
        console.log('[setTheme] Changement de thème vers:', themeData);
        
        // Si c'est un nom de thème prédéfini, chercher le thème complet
        if (typeof themeData === 'string') {
            const predefinedThemes = {
                default: {
                    name: 'Thème par défaut',
                    colors: {
                        primary: '#1683fb',
                        secondary: '#6c757d',
                        accent1: '#ff9800',
                        accent2: '#4caf50',
                        navbarBg: '#1683fb',
                        navbarBgMobile: '#1683fb',
                        textPrimary: '#212529',
                        textSecondary: '#6c757d',
                        textLight: '#ffffff',
                        bgLight: '#f8f9fa',
                        bgCard: '#ffffff',
                        borderLight: '#dee2e6',
                        white: '#ffffff',
                        light: '#f8f9fa',
                        dark: '#343a40',
                        black: '#000000'
                    }
                },                dark: {
                    name: 'Mode sombre',
                    colors: {
                        primary: '#f59e0b',
                        secondary: '#1e293b',
                        accent1: '#fbbf24',
                        accent2: '#10b981',
                        navbarBg: '#0f172a',
                        navbarBgMobile: '#1e293b',
                        textPrimary: '#ffffff',
                        textSecondary: '#e2e8f0',
                        textLight: '#ffffff',
                        bgLight: '#0f172a',
                        bgCard: '#1e293b',
                        borderLight: '#374151',
                        white: '#ffffff',
                        light: '#ffffff',
                        dark: '#0f172a',
                        black: '#000000',
                        bodyBg: '#000000',
                        contentBg: '#0f172a'
                    }
                },
                nature: {
                    name: 'Thème nature',
                    colors: {
                        primary: '#059669',
                        secondary: '#10b981',
                        accent1: '#10b981',
                        accent2: '#34d399',
                        navbarBg: '#059669',
                        navbarBgMobile: '#059669',
                        textPrimary: '#064e3b',
                        textSecondary: '#047857',
                        textLight: '#ffffff',
                        bgLight: '#ecfdf5',
                        bgCard: '#ffffff',
                        borderLight: '#a7f3d0',
                        white: '#ffffff',
                        light: '#ecfdf5',
                        dark: '#064e3b',
                        black: '#064e3b'
                    }
                },
                sunset: {
                    name: 'Thème coucher de soleil',
                    colors: {
                        primary: '#ea580c',
                        secondary: '#fb923c',
                        accent1: '#f59e0b',
                        accent2: '#fbbf24',
                        navbarBg: '#ea580c',
                        navbarBgMobile: '#ea580c',
                        textPrimary: '#9a3412',
                        textSecondary: '#c2410c',
                        textLight: '#ffffff',
                        bgLight: '#fff7ed',
                        bgCard: '#ffffff',
                        borderLight: '#fed7aa',
                        white: '#ffffff',
                        light: '#fff7ed',
                        dark: '#9a3412',
                        black: '#9a3412'
                    }
                },
                ocean: {
                    name: 'Thème océan',
                    colors: {
                        primary: '#0ea5e9',
                        secondary: '#0284c7',
                        accent1: '#06b6d4',
                        accent2: '#22d3ee',
                        navbarBg: '#0ea5e9',
                        navbarBgMobile: '#0ea5e9',
                        textPrimary: '#0c4a6e',
                        textSecondary: '#0369a1',
                        textLight: '#ffffff',
                        bgLight: '#f0f9ff',
                        bgCard: '#ffffff',
                        borderLight: '#bae6fd',
                        white: '#ffffff',
                        light: '#f0f9ff',
                        dark: '#0c4a6e',
                        black: '#0c4a6e'
                    }
                }
            };
            
            if (predefinedThemes[themeData]) {
                themeData = predefinedThemes[themeData];
            } else {
                console.warn('[setTheme] Thème prédéfini non trouvé:', themeData);
                return false;
            }
        }
        
        // Valider et fusionner avec le thème existant
        if (themeData && typeof themeData === 'object') {
            // Fusionner avec le thème existant (merge profond)
            window.globalData.theme = mergeDeep(window.globalData.theme, themeData);
            
            // Sauvegarder dans localStorage
            if (typeof window.saveToLocalStorage === 'function') {
                window.saveToLocalStorage('theme', window.globalData.theme);
            }
            
            // Appliquer le nouveau thème
            applyThemeToSite();
            
            // Déclencher l'événement de changement de thème
            const event = new CustomEvent('themeChanged', {
                detail: { theme: window.globalData.theme }
            });
            window.dispatchEvent(event);
            
            console.log('[setTheme] Thème appliqué avec succès');
            return true;
        } else {
            console.error('[setTheme] Données de thème invalides:', themeData);
            return false;
        }
    } catch (error) {
        console.error('[setTheme] Erreur:', error);
        return false;
    }
};

// Fonction pour appliquer le thème à tout le site
function applyThemeToSite() {
    try {
        console.log('[applyThemeToSite] Application du thème...');
        
        // Vérifier si on quitte le mode sombre
        const theme = window.globalData.theme;
        const isDarkMode = theme?.name === 'Mode sombre' || theme?.colors?.bodyBg === '#000000';
        
        // Si on n'est pas en mode sombre, forcer la réinitialisation
        if (!isDarkMode) {
            forceResetElementsFromDarkMode();
        }
        
        // 1. Injecter CSS du thème
        injectThemeCSS();
        
        // 2. Appliquer les styles automatiques
        if (typeof window.applyAutoThemeStyles === 'function') {
            window.applyAutoThemeStyles();
        }
        
        // 3. Recharger la navigation et le footer avec le nouveau thème
        reloadNavigationWithTheme();
        
        // 4. Appliquer aux éléments spécifiques
        applyThemeToSpecificElements();
        
        console.log('[applyThemeToSite] Thème appliqué');
    } catch (error) {
        console.error('[applyThemeToSite] Erreur:', error);
    }
}

// Fonction pour injecter le CSS du thème
function injectThemeCSS() {
    try {
        const theme = window.globalData.theme;
        if (!theme || !theme.colors) return;
        
        // Supprimer l'ancien style injecté
        const existingStyle = document.getElementById('dynamic-theme-css');
        if (existingStyle) {
            existingStyle.remove();
        }
        
        const colors = theme.colors;
        const isDarkMode = theme.name === 'Mode sombre' || colors.bodyBg === '#000000';
        
        // Créer le nouveau CSS
        let css = `
            :root {
                --theme-primary: ${colors.primary || '#1683fb'};
                --theme-secondary: ${colors.secondary || '#6c757d'};
                --theme-accent1: ${colors.accent1 || '#ff9800'};
                --theme-accent2: ${colors.accent2 || '#4caf50'};
                --theme-navbar-bg: ${colors.navbarBg || colors.primary || '#1683fb'};
                --theme-text-primary: ${colors.textPrimary || '#212529'};
                --theme-text-secondary: ${colors.textSecondary || '#6c757d'};
                --theme-text-light: ${colors.textLight || '#ffffff'};
                --theme-bg-light: ${colors.bgLight || '#f8f9fa'};
                --theme-bg-card: ${colors.bgCard || '#ffffff'};
                --theme-border-light: ${colors.borderLight || '#dee2e6'};
                --theme-white: ${colors.white || '#ffffff'};
                --theme-light: ${colors.light || '#f8f9fa'};
                --theme-dark: ${colors.dark || '#343a40'};
                --theme-black: ${colors.black || '#000000'};
                --theme-body-bg: ${colors.bodyBg || colors.bgLight || '#ffffff'};
                --theme-content-bg: ${colors.contentBg || colors.bgCard || '#ffffff'};
            }
        `;
        
        if (isDarkMode) {
            // MODE SOMBRE - Application globale
            css += `
            /* MODE SOMBRE - Application globale */
            body {
                background-color: #000000 !important;
                color: #ffffff !important;
            }
            
            /* Conteneurs principaux */
            .container, .container-fluid {
                color: #ffffff !important;
            }
            
            /* Sections */
            section, .ftco-section {
                background-color: #000000 !important;
                color: #ffffff !important;
            }
            
            /* Cards et contenus */
            .card, .bg-light, .bg-white {
                background-color: var(--theme-bg-card) !important;
                color: #ffffff !important;
            }
            
            /* Texte */
            p, span, div, h1, h2, h3, h4, h5, h6 {
                color: #ffffff !important;
            }
            
            .text-dark, .text-black {
                color: #ffffff !important;
            }
            
            .text-muted {
                color: #e2e8f0 !important;
            }
            
            /* Liens */
            a {
                color: var(--theme-primary) !important;
            }
            
            a:hover {
                color: var(--theme-accent1) !important;
            }
            
            /* Footer */
            .ftco-footer {
                background-color: #000000 !important;
                color: #ffffff !important;
            }
            
            .ftco-footer h2, .ftco-footer h3, .ftco-footer h4, .ftco-footer h5, .ftco-footer h6 {
                color: #ffffff !important;
            }
            
            .ftco-footer p, .ftco-footer span, .ftco-footer div, .ftco-footer li {
                color: #ffffff !important;
            }
            
            /* Formulaires */
            .form-control {
                background-color: var(--theme-bg-card) !important;
                color: #ffffff !important;
                border: 1px solid var(--theme-border-light) !important;
            }
            
            .form-control:focus {
                background-color: var(--theme-bg-card) !important;
                color: #ffffff !important;
                border-color: var(--theme-primary) !important;
                box-shadow: 0 0 0 0.2rem rgba(245, 158, 11, 0.25) !important;
            }
            
            /* Headers et Hero sections */
            .hero-wrap, .ftco-cover-bg {
                background-color: #000000 !important;
            }
            
            .hero-wrap h1, .hero-wrap h2, .hero-wrap p {
                color: #ffffff !important;
            }
            
            /* Chatbot - Mode sombre */
            .chatbot-widget {
                background-color: var(--theme-bg-card) !important;
                color: #ffffff !important;
                border: 1px solid var(--theme-border-light) !important;
            }
            
            .chatbot-header {
                background-color: var(--theme-primary) !important;
                color: #000000 !important;
            }
            
            .chatbot-body {
                background-color: var(--theme-bg-card) !important;
                color: #ffffff !important;
            }
            
            .chatbot-message {
                color: #ffffff !important;
            }
            
            .chatbot-message.user {
                background-color: var(--theme-primary) !important;
                color: #000000 !important;
            }
            
            .chatbot-message.bot {
                background-color: var(--theme-secondary) !important;
                color: #ffffff !important;
            }
            
            .chatbot-input {
                background-color: var(--theme-bg-card) !important;
                color: #ffffff !important;
                border: 1px solid var(--theme-border-light) !important;
            }
            
            .chatbot-button {
                background-color: var(--theme-primary) !important;
                color: #000000 !important;
                border: none !important;
            }
            `;
        } else {
            // MODE CLAIR - Réinitialisation complète
            css += `
            /* MODE CLAIR - Réinitialisation complète */
            body {
                background-color: #ffffff !important;
                color: #212529 !important;
            }
            
            /* Conteneurs principaux */
            .container, .container-fluid {
                color: #212529 !important;
            }
            
            /* Sections */
            section, .ftco-section {
                background-color: transparent !important;
                color: #212529 !important;
            }
            
            /* Cards et contenus */
            .card {
                background-color: #ffffff !important;
                color: #212529 !important;
            }
            
            .bg-light {
                background-color: #f8f9fa !important;
                color: #212529 !important;
            }
            
            .bg-white {
                background-color: #ffffff !important;
                color: #212529 !important;
            }
            
            /* Texte - Réinitialisation */
            p, span, div, h1, h2, h3, h4, h5, h6 {
                color: initial !important;
            }
            
            .text-dark {
                color: #343a40 !important;
            }
            
            .text-black {
                color: #000000 !important;
            }
            
            .text-muted {
                color: #6c757d !important;
            }
            
            /* Liens */
            a {
                color: var(--theme-primary) !important;
            }
            
            a:hover {
                color: var(--theme-accent1) !important;
            }
            
            /* Footer */
            .ftco-footer {
                background-color: #343a40 !important;
                color: #ffffff !important;
            }
            
            .ftco-footer h2, .ftco-footer h3, .ftco-footer h4, .ftco-footer h5, .ftco-footer h6 {
                color: #ffffff !important;
            }
            
            .ftco-footer p, .ftco-footer span, .ftco-footer div, .ftco-footer li {
                color: #ffffff !important;
            }
            
            /* Formulaires */
            .form-control {
                background-color: #ffffff !important;
                color: #495057 !important;
                border: 1px solid #ced4da !important;
            }
            
            .form-control:focus {
                background-color: #ffffff !important;
                color: #495057 !important;
                border-color: var(--theme-primary) !important;
                box-shadow: 0 0 0 0.2rem rgba(22, 131, 251, 0.25) !important;
            }
            
            /* Headers et Hero sections */
            .hero-wrap, .ftco-cover-bg {
                background-color: transparent !important;
            }
            
            .hero-wrap h1, .hero-wrap h2, .hero-wrap p {
                color: #ffffff !important;
            }
            
            /* Chatbot - Mode clair */
            .chatbot-widget {
                background-color: #ffffff !important;
                color: #212529 !important;
                border: 1px solid #dee2e6 !important;
            }
            
            .chatbot-header {
                background-color: var(--theme-primary) !important;
                color: #ffffff !important;
            }
            
            .chatbot-body {
                background-color: #ffffff !important;
                color: #212529 !important;
            }
            
            .chatbot-message {
                color: #212529 !important;
            }
            
            .chatbot-message.user {
                background-color: var(--theme-primary) !important;
                color: #ffffff !important;
            }
            
            .chatbot-message.bot {
                background-color: #f8f9fa !important;
                color: #212529 !important;
            }
            
            .chatbot-input {
                background-color: #ffffff !important;
                color: #495057 !important;
                border: 1px solid #ced4da !important;
            }
            
            .chatbot-button {
                background-color: var(--theme-primary) !important;
                color: #ffffff !important;
                border: none !important;
            }
            `;
        }
        
        // Styles communs pour tous les modes
        css += `
            /* Navigation - toujours appliqué */
            .ftco-navbar-light {
                background-color: var(--theme-navbar-bg) !important;
            }
            
            .ftco-navbar-light .nav-link {
                color: var(--theme-text-light) !important;
            }
            
            .ftco-navbar-light .nav-link:hover {
                color: var(--theme-accent1) !important;
            }
            
            .ftco-navbar-light .navbar-brand {
                color: var(--theme-text-light) !important;
            }
            
            .ftco-navbar-light.scrolled {
                background-color: ${isDarkMode ? '#0f172a' : 'var(--theme-white)'} !important;
            }
            
            .ftco-navbar-light.scrolled .nav-link {
                color: ${isDarkMode ? '#ffffff' : 'var(--theme-text-primary)'} !important;
            }
            
            .ftco-navbar-light.scrolled .navbar-brand {
                color: ${isDarkMode ? '#ffffff' : 'var(--theme-text-primary)'} !important;
            }
            
            /* Boutons */
            .btn-primary {
                background-color: var(--theme-primary) !important;
                border-color: var(--theme-primary) !important;
                color: ${isDarkMode ? '#000000' : '#ffffff'} !important;
            }
            
            .btn-primary:hover {
                background-color: var(--theme-accent1) !important;
                border-color: var(--theme-accent1) !important;
                color: ${isDarkMode ? '#000000' : '#ffffff'} !important;
            }
            
            /* Sections avec background primary */
            .ftco-section.bg-primary {
                background-color: var(--theme-primary) !important;
            }
            
            /* Sélecteur de langue */
            .language-selector {
                background-color: ${isDarkMode ? 'var(--theme-bg-card)' : 'transparent'} !important;
            }
            
            .language-selector .language-toggle {
                color: var(--theme-text-light) !important;
                background-color: ${isDarkMode ? 'var(--theme-bg-card)' : 'transparent'} !important;
            }
            
            .language-dropdown {
                background-color: ${isDarkMode ? 'var(--theme-bg-card)' : '#ffffff'} !important;
                border: 1px solid var(--theme-border-light) !important;
            }
            
            .language-option {
                color: ${isDarkMode ? '#ffffff' : 'var(--theme-text-primary)'} !important;
            }
            
            .language-option:hover {
                background-color: var(--theme-primary) !important;
                color: ${isDarkMode ? '#000000' : '#ffffff'} !important;
            }
        `;
        
        // Injecter le CSS
        const styleElement = document.createElement('style');
        styleElement.id = 'dynamic-theme-css';
        styleElement.textContent = css;
        document.head.appendChild(styleElement);
        
        console.log('[injectThemeCSS] CSS du thème injecté', isDarkMode ? '(Mode sombre)' : '(Mode clair)');
    } catch (error) {
        console.error('[injectThemeCSS] Erreur:', error);
    }
}

// Fonction pour recharger la navigation avec le nouveau thème
function reloadNavigationWithTheme() {
    try {
        if (typeof window.loadNavigation === 'function') {
            window.loadNavigation();
        }
        if (typeof window.loadFooter === 'function') {
            window.loadFooter();
        }
    } catch (error) {
        console.error('[reloadNavigationWithTheme] Erreur:', error);
    }
}

// Fonction pour appliquer le thème à des éléments spécifiques
function applyThemeToSpecificElements() {
    try {
        const theme = window.globalData.theme;
        if (!theme || !theme.colors) return;
        
        // Appliquer aux éléments avec classes spécifiques
        const primaryElements = document.querySelectorAll('.text-primary, .bg-primary');
        primaryElements.forEach(element => {
            if (element.classList.contains('text-primary')) {
                element.style.color = theme.colors.primary;
            }
            if (element.classList.contains('bg-primary')) {
                element.style.backgroundColor = theme.colors.primary;
            }
        });
        
        // Autres éléments...
        const accentElements = document.querySelectorAll('.text-accent, .bg-accent');
        accentElements.forEach(element => {
            if (element.classList.contains('text-accent')) {
                element.style.color = theme.colors.accent1;
            }
            if (element.classList.contains('bg-accent')) {
                element.style.backgroundColor = theme.colors.accent1;
            }
        });
        
    } catch (error) {
        console.error('[applyThemeToSpecificElements] Erreur:', error);
    }
}

// Fonction helper pour fusion profonde d'objets
function mergeDeep(target, source) {
    const output = Object.assign({}, target);
    if (isObject(target) && isObject(source)) {
        Object.keys(source).forEach(key => {
            if (isObject(source[key])) {
                if (!(key in target))
                    Object.assign(output, { [key]: source[key] });
                else
                    output[key] = mergeDeep(target[key], source[key]);
            } else {
                Object.assign(output, { [key]: source[key] });
            }
        });
    }
    return output;
}

function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}

// Fonction pour forcer la réinitialisation des éléments quand on quitte le mode sombre
function forceResetElementsFromDarkMode() {
    try {
        console.log('[forceResetElementsFromDarkMode] Réinitialisation forcée des éléments...');
        
        // Réinitialiser le body
        document.body.style.backgroundColor = '';
        document.body.style.color = '';
        
        // Réinitialiser tous les éléments avec styles inline qui pourraient venir du mode sombre
        const allElements = document.querySelectorAll('*');
        allElements.forEach(element => {
            // Retirer les styles inline seulement s'ils correspondent aux couleurs du mode sombre
            if (element.style.backgroundColor === '#000000' || 
                element.style.backgroundColor === 'rgb(0, 0, 0)' ||
                element.style.backgroundColor === '#0f172a' ||
                element.style.backgroundColor === '#1e293b') {
                element.style.backgroundColor = '';
            }
            
            if (element.style.color === '#ffffff' || 
                element.style.color === 'rgb(255, 255, 255)' ||
                element.style.color === 'white') {
                // Ne pas réinitialiser la couleur si c'est un élément qui doit rester blanc (comme footer)
                if (!element.closest('.ftco-footer') && 
                    !element.closest('.ftco-navbar-light') &&
                    !element.closest('.hero-wrap')) {
                    element.style.color = '';
                }
            }
        });
        
        // Forcer la réapplication des classes Bootstrap
        const bootstrapElements = document.querySelectorAll('.bg-light, .bg-white, .text-dark, .text-muted');
        bootstrapElements.forEach(element => {
            // Retire et remet la classe pour forcer le recalcul
            const classes = element.className;
            element.className = '';
            setTimeout(() => {
                element.className = classes;
            }, 10);
        });
        
        // Réinitialiser spécifiquement le chatbot
        const chatbotElements = document.querySelectorAll('.chatbot-widget, .chatbot-header, .chatbot-body, .chatbot-message, .chatbot-input, .chatbot-button');
        chatbotElements.forEach(element => {
            // Nettoyer les styles inline du mode sombre
            if (element.style.backgroundColor && 
                (element.style.backgroundColor.includes('#1e293b') || 
                 element.style.backgroundColor.includes('#0f172a') ||
                 element.style.backgroundColor.includes('#000000'))) {
                element.style.backgroundColor = '';
            }
            if (element.style.color === '#ffffff' || element.style.color === 'white') {
                element.style.color = '';
            }
        });
        
        console.log('[forceResetElementsFromDarkMode] Réinitialisation terminée');
    } catch (error) {
        console.error('[forceResetElementsFromDarkMode] Erreur:', error);
    }
}

//# sourceMappingURL=globalData.js.map
