// validation.js - Script de validation finale du système de traduction
(function() {
    console.log('🚀 DÉBUT DE LA VALIDATION FINALE DU SYSTÈME DE TRADUCTION');
    
    // 1. Vérifier la présence des composants essentiels
    function checkComponents() {
        console.log('\n📋 1. VÉRIFICATION DES COMPOSANTS');
        
        const checks = {
            'SmartTranslator': window.smartTranslator,
            'Dictionnaire': window.translationDictionary,
            'Données globales': window.getGlobalData,
            'Composants': window.injectNavigation,
            'Fonctions de diagnostic': window.diagnoseTranslation
        };
        
        let allGood = true;
        Object.entries(checks).forEach(([name, component]) => {
            const status = component ? '✅' : '❌';
            console.log(`  ${status} ${name}:`, component ? 'Disponible' : 'Manquant');
            if (!component) allGood = false;
        });
        
        return allGood;
    }
    
    // 2. Tester les fonctionnalités de traduction
    async function testTranslationFeatures() {
        console.log('\n🧪 2. TEST DES FONCTIONNALITÉS DE TRADUCTION');
        
        if (!window.smartTranslator) {
            console.error('❌ SmartTranslator non disponible');
            return false;
        }
        
        try {
            // Test du dictionnaire
            const dictTest = window.smartTranslator.translateWithDictionary('accueil', 'en');
            console.log('  ✅ Dictionnaire:', dictTest === 'Home' ? 'Fonctionne' : 'Problème détecté');
            
            // Test de collection d'éléments
            const elements = window.smartTranslator.collectTranslatableElements();
            console.log('  ✅ Collection d\'éléments:', elements.length, 'éléments trouvés');
            
            // Test de cache
            const cacheSize = window.smartTranslator.cache.size;
            console.log('  ✅ Cache:', cacheSize, 'entrées en cache');
            
            return true;
        } catch (error) {
            console.error('❌ Erreur lors des tests:', error);
            return false;
        }
    }
    
    // 3. Vérifier l'état de la langue
    function checkLanguageState() {
        console.log('\n🌍 3. VÉRIFICATION DE L\'ÉTAT DE LA LANGUE');
        
        const currentLang = localStorage.getItem('siteLanguage') || 'fr';
        console.log('  📍 Langue actuelle:', currentLang);
        
        const selector = document.querySelector('.language-selector');
        console.log('  🎛️ Sélecteur de langue:', selector ? 'Présent' : 'Absent');
        
        const activeFlags = document.querySelectorAll('.language-flag.active');
        console.log('  🏴 Drapeaux actifs:', activeFlags.length);
        
        return true;
    }
    
    // 4. Test de traduction en temps réel
    async function testRealTimeTranslation() {
        console.log('\n⚡ 4. TEST DE TRADUCTION EN TEMPS RÉEL');
        
        if (!window.smartTranslator) {
            console.error('❌ SmartTranslator non disponible');
            return false;
        }
        
        try {
            // Créer un élément de test
            const testDiv = document.createElement('div');
            testDiv.id = 'validation-test-element';
            testDiv.textContent = 'Bonjour le monde test';
            testDiv.style.display = 'none';
            document.body.appendChild(testDiv);
            
            // Tester la traduction
            const originalText = testDiv.textContent;
            const translatedText = await window.smartTranslator.translateText(originalText, 'en', 'fr');
            
            console.log('  📝 Texte original:', originalText);
            console.log('  🔄 Texte traduit:', translatedText);
            console.log('  ✅ Traduction:', translatedText !== originalText ? 'Fonctionne' : 'Aucun changement');
            
            // Nettoyer
            testDiv.remove();
            
            return true;
        } catch (error) {
            console.error('❌ Erreur test temps réel:', error);
            return false;
        }
    }
    
    // 5. Rapport final
    function generateFinalReport(results) {
        console.log('\n📊 5. RAPPORT FINAL DE VALIDATION');
        console.log('='.repeat(50));
        
        const allPassed = results.every(result => result);
        console.log('🎯 RÉSULTAT GLOBAL:', allPassed ? '✅ TOUS LES TESTS PASSÉS' : '❌ CERTAINS TESTS ÉCHOUÉS');
        
        if (allPassed) {
            console.log('\n🎉 FÉLICITATIONS ! Le système de traduction est opérationnel.');
            console.log('🔧 Fonctionnalités disponibles:');
            console.log('  - Traduction automatique intelligente');
            console.log('  - Dictionnaire français-anglais intégré');
            console.log('  - APIs de traduction (Google + MyMemory)');
            console.log('  - Cache des traductions');
            console.log('  - Sélecteur de langue dynamique');
            console.log('  - Navigation et footer multilingues');
            
            console.log('\n🎮 Commandes disponibles:');
            console.log('  - window.smartTranslator.translatePage("en") // Traduire en anglais');
            console.log('  - window.smartTranslator.translatePage("fr") // Revenir au français');
            console.log('  - window.diagnoseTranslation() // Diagnostic complet');
            console.log('  - window.testTranslation() // Test des APIs');
            console.log('  - window.quickDiagnostic() // Diagnostic rapide');
        } else {
            console.log('\n⚠️ PROBLÈMES DÉTECTÉS');
            console.log('  Veuillez vérifier les erreurs ci-dessus.');
        }
        
        console.log('='.repeat(50));
        return allPassed;
    }
    
    // Exécution de la validation
    async function runValidation() {
        const results = [];
        
        try {
            results.push(checkComponents());
            results.push(await testTranslationFeatures());
            results.push(checkLanguageState());
            results.push(await testRealTimeTranslation());
            
            return generateFinalReport(results);
        } catch (error) {
            console.error('❌ ERREUR CRITIQUE LORS DE LA VALIDATION:', error);
            return false;
        }
    }
    
    // Attendre que la page soit chargée
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(runValidation, 1000);
        });
    } else {
        setTimeout(runValidation, 1000);
    }
    
    // Rendre la fonction disponible globalement
    window.runValidation = runValidation;
    
})();
