// diagnostic.js - Script de diagnostic pour identifier les problèmes
console.log('🔍 DIAGNOSTIC - Début du diagnostic...');

// Fonction d'initialisation qui attend que globalData soit disponible
function initDiagnostic() {
    console.log('🔍 Initialisation du diagnostic...');
    
    if (!window.globalData) {
        console.log('⏳ Attente de globalData...');
        setTimeout(initDiagnostic, 100);
        return;
    }
    
    console.log('✅ GlobalData détecté, démarrage des tests...');    // Exécuter tous les tests
    setTimeout(() => {
        testGlobalFunctions();
        testLocalStorage(); 
        testFunctionCalls();
        testPortfolio();
    }, 500);
}

// Test 1: Vérifier l'existence des fonctions globales
function testGlobalFunctions() {
    console.log('📋 Test 1: Fonctions globales');
    console.log('- window.getGlobalData:', typeof window.getGlobalData);
    console.log('- window.getTranslations:', typeof window.getTranslations);
    console.log('- window.setSiteLanguage:', typeof window.setSiteLanguage);
    console.log('- window.getTheme:', typeof window.getTheme);
    console.log('- window.getPortfolio:', typeof window.getPortfolio);
    console.log('- window.applyAutoThemeStyles:', typeof window.applyAutoThemeStyles);
    console.log('- window.toggleThemeController:', typeof window.toggleThemeController);
    console.log('- window.saveToLocalStorage:', typeof window.saveToLocalStorage);
    console.log('- window.loadFromLocalStorage:', typeof window.loadFromLocalStorage);
}

// Test 2: Vérifier le localStorage
function testLocalStorage() {
    console.log('📋 Test 2: LocalStorage');
    try {
        const globalData = localStorage.getItem('globalData');
        console.log('- GlobalData dans localStorage:', !!globalData);
        if (globalData) {
            const parsed = JSON.parse(globalData);
            console.log('- Portfolio:', parsed.portfolio ? parsed.portfolio.length + ' items' : 'non trouvé');
            console.log('- Thème:', !!parsed.theme);
            console.log('- Site:', !!parsed.site);
            console.log('- Traductions:', !!parsed.translations);
        }
    } catch (error) {
        console.error('❌ Erreur localStorage:', error);
    }
}

// Test 3: Vérifier les éléments DOM
function testDOMElements() {
    console.log('📋 Test 3: Éléments DOM');
    console.log('- Theme controller:', !!document.getElementById('theme-controller'));
    console.log('- Custom properties style:', !!document.getElementById('theme-custom-properties'));
    console.log('- Navbar:', !!document.querySelector('.navbar'));
    console.log('- Boutons:', document.querySelectorAll('.btn').length);
    console.log('- Cartes:', document.querySelectorAll('.card').length);
}

// Test 4: Vérifier les erreurs JavaScript
function testErrors() {
    console.log('📋 Test 4: Capture d\'erreurs');
    window.addEventListener('error', function(e) {
        console.error('❌ Erreur JavaScript détectée:', e.error);
        console.error('📁 Fichier:', e.filename);
        console.error('📍 Ligne:', e.lineno);
    });
}

// Test 5: Tester l'appel des fonctions
function testFunctionCalls() {
    console.log('📋 Test 5: Appel des fonctions');
    
    // Attendre que window.globalData soit disponible
    if (!window.globalData) {
        console.log('⚠️ window.globalData non encore disponible, nouvelle tentative...');
        setTimeout(testFunctionCalls, 100);
        return;
    }
    
    try {
        if (typeof window.getGlobalData === 'function') {
            const data = window.getGlobalData();
            console.log('✅ getGlobalData disponible:', typeof window.getGlobalData);
            console.log('✅ getGlobalData fonctionne:', !!data);
        } else {
            console.log('❌ getGlobalData non disponible, type:', typeof window.getGlobalData);
        }
    } catch (error) {
        console.error('❌ Erreur getGlobalData:', error);
    }
    
    try {
        if (typeof window.getTheme === 'function') {
            const theme = window.getTheme();
            console.log('✅ getTheme disponible:', typeof window.getTheme);
            console.log('✅ getTheme fonctionne:', !!theme);
        } else {
            console.log('❌ getTheme non disponible, type:', typeof window.getTheme);
        }
    } catch (error) {
        console.error('❌ Erreur getTheme:', error);
    }
    
    // Test de toutes les autres fonctions
    const functionsToTest = [
        'getThemeColor', 'getThemeSpacing', 'getThemeFont',
        'getCurrentLanguage', 'setCurrentLanguage', 'getLocalizedData'
    ];
    
    functionsToTest.forEach(funcName => {
        try {
            if (typeof window[funcName] === 'function') {
                console.log(`✅ ${funcName} disponible`);
            } else {
                console.log(`❌ ${funcName} non disponible`);
            }
        } catch (error) {
            console.error(`❌ Erreur ${funcName}:`, error);
        }
    });
}

// Test 6: Tester le portfolio
function testPortfolio() {
    console.log('📋 Test 6: Portfolio');
    
    try {
        const portfolio = window.getPortfolio();
        if (portfolio && Array.isArray(portfolio)) {
            console.log('✅ Portfolio disponible:', portfolio.length, 'projets');
            console.log('📁 Premier projet:', portfolio[0]?.title || 'Aucun');
        } else {
            console.log('❌ Portfolio non disponible ou vide');
        }
        
        // Test des catégories
        if (portfolio) {
            const categories = [...new Set(portfolio.map(p => p.category))];
            console.log('🏷️ Catégories disponibles:', categories.join(', '));
        }
    } catch (error) {
        console.error('❌ Erreur test portfolio:', error);
    }
}

// Exécuter tous les tests
function runAllTests() {
    console.log('🚀 Exécution de tous les tests...');
    testGlobalFunctions();
    testLocalStorage();
    testDOMElements();
    testFunctionCalls();
    testPortfolio();
    console.log('✅ Diagnostic terminé - Vérifiez les résultats ci-dessus');
}

// Initialiser le diagnostic
document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 DOM chargé - Lancement du diagnostic...');
    initDiagnostic();
});

// Démarrer aussi immédiatement si le DOM est déjà chargé
if (document.readyState === 'loading') {
    // Le DOM se charge encore, l'événement DOMContentLoaded sera déclenché
} else {
    // Le DOM est déjà chargé
    console.log('📄 DOM déjà chargé - Lancement immédiat du diagnostic...');
    initDiagnostic();
}

// Configurer la capture d'erreurs dès maintenant
testErrors();

// Exposer les fonctions pour usage manuel
window.diagnostic = {
    runAllTests: initDiagnostic,
    testGlobalFunctions,
    testLocalStorage,
    testDOMElements,
    testFunctionCalls,
    testPortfolio
};

console.log('🔍 DIAGNOSTIC - Script chargé. Utilisez window.diagnostic.runAllTests() pour tester manuellement.');
