// theme-controller.js
// Contrôleur interactif pour la gestion et personnalisation du thème
(function() {
    console.log('[theme-controller.js] Initialisation du contrôleur de thème...');

    // Configuration des thèmes prédéfinis
    const predefinedThemes = {
        default: {
            name: 'Thème par défaut',
            colors: {
                primary: '#1683fb',
                accent1: '#ff9800',
                navbarBg: '#1683fb',
                textPrimary: '#212529'
            }
        },
        dark: {
            name: 'Mode sombre',
            colors: {
                primary: '#0f172a',
                secondary: '#1e293b',
                accent1: '#f59e0b',
                navbarBg: '#0f172a',
                navbarBgMobile: '#1e293b',
                textPrimary: '#f8fafc',
                textSecondary: '#cbd5e1',
                textLight: '#ffffff',
                bgLight: '#1e293b',
                bgCard: '#334155',
                borderLight: '#475569',
                white: '#0f172a',
                light: '#1e293b',
                dark: '#f8fafc'
            }
        },
        nature: {
            name: 'Thème nature',
            colors: {
                primary: '#059669',
                accent1: '#10b981',
                navbarBg: '#059669',
                textPrimary: '#064e3b'
            }
        },
        sunset: {
            name: 'Thème coucher de soleil',
            colors: {
                primary: '#ea580c',
                accent1: '#f59e0b',
                navbarBg: '#ea580c',
                textPrimary: '#9a3412'
            }
        },
        ocean: {
            name: 'Thème océan',
            colors: {
                primary: '#0ea5e9',
                accent1: '#06b6d4',
                navbarBg: '#0ea5e9',
                textPrimary: '#0c4a6e'
            }
        }
    };

    // État du contrôleur
    let isControllerVisible = false;
    let currentThemeKey = 'default';

    // Création du contrôleur UI
    function createThemeController() {
        const controller = document.createElement('div');
        controller.id = 'theme-controller';
        controller.className = 'theme-controller';
        controller.innerHTML = `
            <div class="theme-controller-toggle" onclick="window.toggleThemeController()">
                <i class="icon-palette"></i>
                <span>Thèmes</span>
            </div>
            <div class="theme-controller-panel" id="theme-controller-panel">
                <div class="theme-controller-header">
                    <h4>🎨 Personnalisation</h4>
                    <button class="close-btn" onclick="window.toggleThemeController()">×</button>
                </div>
                <div class="theme-controller-content">
                    <div class="theme-section">
                        <h5>Thèmes prédéfinis</h5>
                        <div class="theme-presets" id="theme-presets">
                            <!-- Les thèmes seront générés ici -->
                        </div>
                    </div>
                    <div class="theme-section">
                        <h5>Couleurs personnalisées</h5>
                        <div class="color-inputs">
                            <div class="color-input-group">
                                <label>Couleur principale</label>
                                <input type="color" id="primary-color" onchange="window.updateCustomColor('primary', this.value)">
                            </div>
                            <div class="color-input-group">
                                <label>Couleur d'accent</label>
                                <input type="color" id="accent-color" onchange="window.updateCustomColor('accent1', this.value)">
                            </div>
                            <div class="color-input-group">
                                <label>Couleur du texte</label>
                                <input type="color" id="text-color" onchange="window.updateCustomColor('textPrimary', this.value)">
                            </div>
                        </div>
                    </div>
                    <div class="theme-section">
                        <h5>Actions</h5>
                        <div class="theme-actions">
                            <button class="btn-reset" onclick="window.resetTheme()">Réinitialiser</button>
                            <button class="btn-export" onclick="window.exportTheme()">Exporter</button>
                            <input type="file" id="theme-import" accept=".json" onchange="window.importTheme(this)" style="display: none;">
                            <button class="btn-import" onclick="document.getElementById('theme-import').click()">Importer</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Ajout des styles CSS
        const styles = document.createElement('style');
        styles.textContent = `
            .theme-controller {
                position: fixed;
                top: 50%;
                right: -300px;
                transform: translateY(-50%);
                z-index: 9999;
                transition: right 0.3s ease;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            }
            
            .theme-controller.active {
                right: 0;
            }
            
            .theme-controller-toggle {
                position: absolute;
                left: -60px;
                top: 50%;
                transform: translateY(-50%);
                width: 60px;
                height: 60px;
                background: var(--theme-primary, #1683fb);
                color: white;
                border-radius: 10px 0 0 10px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 0.3s ease;
                box-shadow: -2px 0 10px rgba(0,0,0,0.1);
            }
            
            .theme-controller-toggle:hover {
                background: var(--theme-primary-hover, #0056b3);
                transform: translateY(-50%) translateX(-5px);
            }
            
            .theme-controller-toggle i {
                font-size: 20px;
                margin-bottom: 5px;
            }
            
            .theme-controller-toggle span {
                font-size: 10px;
                text-transform: uppercase;
                font-weight: 600;
            }
            
            .theme-controller-panel {
                width: 320px;
                height: 80vh;
                max-height: 600px;
                background: white;
                border-radius: 10px 0 0 10px;
                box-shadow: -5px 0 20px rgba(0,0,0,0.1);
                overflow: hidden;
                display: flex;
                flex-direction: column;
            }
            
            .theme-controller-header {
                padding: 20px;
                background: linear-gradient(135deg, var(--theme-primary, #1683fb), var(--theme-accent1, #ff9800));
                color: white;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .theme-controller-header h4 {
                margin: 0;
                font-size: 18px;
                font-weight: 600;
            }
            
            .close-btn {
                background: none;
                border: none;
                color: white;
                font-size: 24px;
                cursor: pointer;
                padding: 0;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: background 0.2s ease;
            }
            
            .close-btn:hover {
                background: rgba(255,255,255,0.2);
            }
            
            .theme-controller-content {
                flex: 1;
                overflow-y: auto;
                padding: 20px;
            }
            
            .theme-section {
                margin-bottom: 30px;
            }
            
            .theme-section h5 {
                margin: 0 0 15px 0;
                font-size: 14px;
                font-weight: 600;
                color: var(--theme-text-primary, #212529);
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            
            .theme-presets {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 10px;
            }
            
            .theme-preset {
                padding: 12px;
                border: 2px solid #e9ecef;
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.2s ease;
                text-align: center;
                font-size: 12px;
                background: white;
            }
            
            .theme-preset:hover {
                border-color: var(--theme-primary, #1683fb);
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            }
            
            .theme-preset.active {
                border-color: var(--theme-primary, #1683fb);
                background: var(--theme-primary, #1683fb);
                color: white;
            }
            
            .theme-preset-colors {
                display: flex;
                justify-content: center;
                gap: 4px;
                margin-bottom: 8px;
            }
            
            .theme-preset-color {
                width: 16px;
                height: 16px;
                border-radius: 50%;
                border: 2px solid white;
                box-shadow: 0 0 0 1px rgba(0,0,0,0.1);
            }
            
            .color-inputs {
                display: flex;
                flex-direction: column;
                gap: 15px;
            }
            
            .color-input-group {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .color-input-group label {
                font-size: 13px;
                color: var(--theme-text-secondary, #6c757d);
                font-weight: 500;
            }
            
            .color-input-group input[type="color"] {
                width: 40px;
                height: 40px;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            
            .theme-actions {
                display: flex;
                gap: 10px;
                flex-wrap: wrap;
            }
            
            .theme-actions button {
                flex: 1;
                padding: 10px 15px;
                border: none;
                border-radius: 6px;
                font-size: 12px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s ease;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            
            .btn-reset {
                background: #dc3545;
                color: white;
            }
            
            .btn-reset:hover {
                background: #c82333;
                transform: translateY(-1px);
            }
            
            .btn-export {
                background: #28a745;
                color: white;
            }
            
            .btn-export:hover {
                background: #218838;
                transform: translateY(-1px);
            }
            
            .btn-import {
                background: #17a2b8;
                color: white;
            }
            
            .btn-import:hover {
                background: #138496;
                transform: translateY(-1px);
            }
            
            @media (max-width: 768px) {
                .theme-controller {
                    right: -280px;
                }
                
                .theme-controller-panel {
                    width: 280px;
                }
                
                .theme-presets {
                    grid-template-columns: 1fr;
                }
            }
        `;

        document.head.appendChild(styles);
        document.body.appendChild(controller);

        // Générer les thèmes prédéfinis
        generateThemePresets();
        
        // Initialiser les couleurs personnalisées
        initializeCustomColors();
    }

    // Générer les boutons de thèmes prédéfinis
    function generateThemePresets() {
        const container = document.getElementById('theme-presets');
        if (!container) return;

        Object.keys(predefinedThemes).forEach(key => {
            const theme = predefinedThemes[key];
            const preset = document.createElement('div');
            preset.className = `theme-preset ${key === currentThemeKey ? 'active' : ''}`;
            preset.onclick = () => applyPredefinedTheme(key);
            
            const colors = theme.colors;
            preset.innerHTML = `
                <div class="theme-preset-colors">
                    <div class="theme-preset-color" style="background: ${colors.primary || '#1683fb'}"></div>
                    <div class="theme-preset-color" style="background: ${colors.accent1 || '#ff9800'}"></div>
                    <div class="theme-preset-color" style="background: ${colors.textPrimary || '#212529'}"></div>
                </div>
                <div>${theme.name}</div>
            `;
            
            container.appendChild(preset);
        });
    }

    // Initialiser les valeurs des couleurs personnalisées
    function initializeCustomColors() {
        const theme = window.getTheme();
        if (!theme) return;

        const primaryInput = document.getElementById('primary-color');
        const accentInput = document.getElementById('accent-color');
        const textInput = document.getElementById('text-color');

        if (primaryInput) primaryInput.value = theme.colors.primary;
        if (accentInput) accentInput.value = theme.colors.accent1;
        if (textInput) textInput.value = theme.colors.textPrimary;
    }    // Appliquer un thème prédéfini
    function applyPredefinedTheme(themeKey) {
        if (!predefinedThemes[themeKey]) return;

        console.log(`[theme-controller] Application du thème "${themeKey}"`);
        
        // Utiliser la nouvelle fonction setTheme
        if (typeof window.setTheme === 'function') {
            const success = window.setTheme(themeKey);
            if (success) {
                // Mettre à jour l'interface
                currentThemeKey = themeKey;
                updateActivePreset();
                initializeCustomColors();
                
                console.log(`[theme-controller] Thème "${predefinedThemes[themeKey].name}" appliqué avec succès`);
            } else {
                console.error(`[theme-controller] Échec de l'application du thème "${themeKey}"`);
            }
        } else {
            console.error('[theme-controller] Fonction setTheme non disponible');
        }
    }

    // Mettre à jour le thème avec une couleur personnalisée
    function updateCustomColor(colorKey, colorValue) {
        const currentColors = window.getTheme().colors;
        const updatedColors = {
            ...currentColors,
            [colorKey]: colorValue
        };
        
        // Mettre à jour les couleurs dérivées si nécessaire
        if (colorKey === 'primary') {
            updatedColors.navbarBg = colorValue;
            updatedColors.primaryHover = adjustBrightness(colorValue, -20);
        }
          window.updateTheme('colors', updatedColors);
        window.applyAutoThemeStyles();
        
        // Réinitialiser le thème actif si on modifie manuellement
        currentThemeKey = 'custom';
        updateActivePreset();
        
        console.log(`[theme-controller] Couleur ${colorKey} mise à jour: ${colorValue}`);
    }

    // Fonction utilitaire pour ajuster la luminosité d'une couleur
    function adjustBrightness(hex, percent) {
        const num = parseInt(hex.replace("#", ""), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) + amt;
        const G = (num >> 8 & 0x00FF) + amt;
        const B = (num & 0x0000FF) + amt;
        return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
            (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
            (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
    }

    // Mettre à jour les boutons de thèmes prédéfinis
    function updateActivePreset() {
        const presets = document.querySelectorAll('.theme-preset');
        presets.forEach((preset, index) => {
            const themeKey = Object.keys(predefinedThemes)[index];
            preset.classList.toggle('active', themeKey === currentThemeKey);
        });
    }

    // Basculer la visibilité du contrôleur
    function toggleThemeController() {
        isControllerVisible = !isControllerVisible;
        const controller = document.getElementById('theme-controller');
        if (controller) {
            controller.classList.toggle('active', isControllerVisible);
        }
    }

    // Réinitialiser le thème par défaut
    function resetTheme() {
        if (confirm('Êtes-vous sûr de vouloir réinitialiser le thème ?')) {
            applyPredefinedTheme('default');
            console.log('[theme-controller] Thème réinitialisé');
        }
    }

    // Exporter le thème actuel
    function exportTheme() {
        const theme = window.getTheme();
        const exportData = {
            name: 'Mon thème personnalisé',
            timestamp: new Date().toISOString(),
            theme: theme
        };
        
        const blob = new Blob([JSON.stringify(exportData, null, 2)], {
            type: 'application/json'
        });
        
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `theme-export-${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        console.log('[theme-controller] Thème exporté');
    }

    // Importer un thème
    function importTheme(input) {
        const file = input.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const importData = JSON.parse(e.target.result);                if (importData.theme && importData.theme.colors) {
                    window.updateTheme('colors', importData.theme.colors);
                    window.applyAutoThemeStyles();
                    initializeCustomColors();
                    currentThemeKey = 'custom';
                    updateActivePreset();
                    console.log('[theme-controller] Thème importé:', importData.name || 'Thème inconnu');
                } else {
                    throw new Error('Format de fichier invalide');
                }
            } catch (error) {
                alert('Erreur lors de l\'importation du thème: ' + error.message);
                console.error('[theme-controller] Erreur d\'importation:', error);
            }
        };
        reader.readAsText(file);
        
        // Réinitialiser l'input
        input.value = '';
    }

    // Exposer les fonctions globalement
    window.toggleThemeController = toggleThemeController;
    window.updateCustomColor = updateCustomColor;
    window.resetTheme = resetTheme;
    window.exportTheme = exportTheme;
    window.importTheme = importTheme;

    // Initialiser le contrôleur quand le DOM est prêt
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createThemeController);
    } else {
        createThemeController();
    }

    console.log('[theme-controller.js] Contrôleur de thème initialisé');
})();
