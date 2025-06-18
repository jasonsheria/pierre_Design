// theme-validator.js
// Script de validation du système de thème avancé
(function() {
    console.log('🔍 [VALIDATION] Démarrage de la validation du système de thème...');

    // Tests de fonctionnalités
    const tests = {
        globalDataExists: false,
        themeExists: false,
        themeControllerExists: false,
        customPropertiesActive: false,
        autoStylesWorks: false,
        persistenceWorks: false
    };

    // Test 1: Vérifier l'existence de globalData
    function testGlobalData() {
        tests.globalDataExists = typeof window.getGlobalData === 'function';
        console.log(tests.globalDataExists ? 
            '✅ GlobalData: Fonction disponible' : 
            '❌ GlobalData: Fonction manquante');
        return tests.globalDataExists;
    }

    // Test 2: Vérifier l'existence du thème
    function testTheme() {
        if (tests.globalDataExists) {
            const theme = window.getTheme();
            tests.themeExists = theme && theme.colors && theme.fonts && theme.spacing;
            console.log(tests.themeExists ? 
                '✅ Thème: Structure complète détectée' : 
                '❌ Thème: Structure incomplète ou manquante');
            
            if (tests.themeExists) {
                console.log('📋 Couleur primaire:', theme.colors.primary);
                console.log('📋 Couleur accent:', theme.colors.accent1);
                console.log('📋 Font primaire:', theme.fonts.primary.split(',')[0]);
            }
        }
        return tests.themeExists;
    }

    // Test 3: Vérifier le contrôleur de thème
    function testThemeController() {
        tests.themeControllerExists = typeof window.toggleThemeController === 'function' &&
                                     typeof window.updateCustomColor === 'function' &&
                                     typeof window.exportTheme === 'function';
        console.log(tests.themeControllerExists ? 
            '✅ Contrôleur: Toutes les fonctions disponibles' : 
            '❌ Contrôleur: Fonctions manquantes');
        return tests.themeControllerExists;
    }

    // Test 4: Vérifier les custom properties CSS
    function testCustomProperties() {
        const rootStyle = getComputedStyle(document.documentElement);
        const primaryVar = rootStyle.getPropertyValue('--theme-primary').trim();
        const accentVar = rootStyle.getPropertyValue('--theme-accent1').trim();
        
        tests.customPropertiesActive = primaryVar && accentVar;
        console.log(tests.customPropertiesActive ? 
            '✅ Custom Properties: Variables CSS actives' : 
            '❌ Custom Properties: Variables CSS non détectées');
        
        if (tests.customPropertiesActive) {
            console.log('📋 --theme-primary:', primaryVar);
            console.log('📋 --theme-accent1:', accentVar);
        }
        return tests.customPropertiesActive;
    }

    // Test 5: Vérifier l'application automatique des styles
    function testAutoStyles() {
        if (typeof window.applyAutoThemeStyles === 'function') {
            try {
                const result = window.applyAutoThemeStyles();
                tests.autoStylesWorks = result === true;
                console.log(tests.autoStylesWorks ? 
                    '✅ Styles Auto: Application réussie' : 
                    '❌ Styles Auto: Échec de l\'application');
            } catch (error) {
                tests.autoStylesWorks = false;
                console.log('❌ Styles Auto: Erreur -', error.message);
            }
        } else {
            tests.autoStylesWorks = false;
            console.log('❌ Styles Auto: Fonction non trouvée');
        }
        return tests.autoStylesWorks;
    }

    // Test 6: Vérifier la persistance
    function testPersistence() {
        try {
            const localStorageData = localStorage.getItem('globalData');
            const parsedData = localStorageData ? JSON.parse(localStorageData) : null;
            tests.persistenceWorks = parsedData && parsedData.theme;
            
            console.log(tests.persistenceWorks ? 
                '✅ Persistance: Données sauvegardées dans localStorage' : 
                '❌ Persistance: Aucune donnée trouvée dans localStorage');
        } catch (error) {
            tests.persistenceWorks = false;
            console.log('❌ Persistance: Erreur -', error.message);
        }
        return tests.persistenceWorks;
    }

    // Fonction de validation complète
    function runFullValidation() {
        console.log('🚀 [VALIDATION] Exécution de tous les tests...');
        
        const results = {
            globalData: testGlobalData(),
            theme: testTheme(),
            controller: testThemeController(),
            customProperties: testCustomProperties(),
            autoStyles: testAutoStyles(),
            persistence: testPersistence()
        };

        // Calcul du score
        const passedTests = Object.values(results).filter(Boolean).length;
        const totalTests = Object.keys(results).length;
        const score = Math.round((passedTests / totalTests) * 100);

        // Rapport final
        console.log('\n📊 [VALIDATION] RAPPORT FINAL');
        console.log('================================');
        console.log(`Score global: ${score}% (${passedTests}/${totalTests})`);
        console.log('Tests passés:', passedTests);
        console.log('Tests échoués:', totalTests - passedTests);

        // Affichage détaillé
        Object.entries(results).forEach(([test, passed]) => {
            console.log(`${passed ? '✅' : '❌'} ${test}`);
        });

        // Recommandations
        if (score === 100) {
            console.log('\n🎉 EXCELLENT! Système de thème entièrement fonctionnel!');
        } else if (score >= 80) {
            console.log('\n✅ BIEN! Système de thème largement fonctionnel avec quelques améliorations possibles.');
        } else if (score >= 60) {
            console.log('\n⚠️ MOYEN! Système de thème partiellement fonctionnel, corrections nécessaires.');
        } else {
            console.log('\n❌ CRITIQUE! Système de thème défaillant, intervention requise.');
        }

        return { score, results, passedTests, totalTests };
    }

    // Fonction de diagnostic rapide
    function quickDiagnostic() {
        console.log('🔬 [DIAGNOSTIC] Diagnostic rapide...');
        
        const elements = {
            themeController: document.getElementById('theme-controller'),
            customStyles: document.getElementById('theme-custom-properties'),
            navbar: document.querySelector('.navbar'),
            buttons: document.querySelectorAll('.btn').length,
            cards: document.querySelectorAll('.card').length
        };

        console.log('📋 Éléments détectés:');
        console.log('- Contrôleur de thème:', elements.themeController ? '✅ Présent' : '❌ Absent');
        console.log('- Styles personnalisés:', elements.customStyles ? '✅ Injectés' : '❌ Non injectés');
        console.log('- Navbar:', elements.navbar ? '✅ Trouvée' : '❌ Non trouvée');
        console.log('- Boutons stylisés:', elements.buttons, 'trouvés');
        console.log('- Cartes stylisées:', elements.cards, 'trouvées');

        return elements;
    }

    // Fonction pour tester les performances
    function performanceTest() {
        console.log('⚡ [PERFORMANCE] Test de performance...');
        
        const start = performance.now();
        
        // Test d'application des styles
        if (window.applyAutoThemeStyles) {
            window.applyAutoThemeStyles();
        }
        
        // Test d'accès au thème
        for (let i = 0; i < 100; i++) {
            window.getTheme();
        }
        
        const end = performance.now();
        const duration = Math.round((end - start) * 100) / 100;
        
        console.log(`📊 Temps d'exécution: ${duration}ms`);
        
        if (duration < 10) {
            console.log('🚀 EXCELLENT! Performance optimale');
        } else if (duration < 50) {
            console.log('✅ BON! Performance acceptable');
        } else {
            console.log('⚠️ ATTENTION! Performance à améliorer');
        }
        
        return duration;
    }

    // Exposer les fonctions globalement
    window.themeValidator = {
        runFullValidation,
        quickDiagnostic,
        performanceTest,
        tests: () => tests
    };

    // Auto-validation au chargement (après un délai)
    setTimeout(() => {
        if (document.readyState === 'complete') {
            console.log('🎯 [AUTO-VALIDATION] Validation automatique...');
            runFullValidation();
        }
    }, 2000);

    console.log('✅ [VALIDATION] Validateur de thème initialisé');
    console.log('💡 Utilisez window.themeValidator.runFullValidation() pour tester manuellement');

})();
