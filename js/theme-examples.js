// theme-examples.js - Exemples pratiques d'utilisation du système de thème
(function() {
    console.log('🎨 Chargement des exemples de thème...');

    // Attendre que le thème soit disponible
    function waitForTheme(callback) {
        if (typeof window.getTheme === 'function' && window.getTheme()) {
            callback();
        } else {
            setTimeout(() => waitForTheme(callback), 100);
        }
    }

    // Exemple 1: Créer un bouton stylé avec le thème
    window.createThemedButton = function(text, colorType = 'primary', size = 'md') {
        const theme = window.getTheme();
        if (!theme) return `<button>${text}</button>`;

        const bgColor = theme.colors[colorType] || theme.colors.primary;
        const textColor = theme.colors.textLight;
        const padding = theme.spacing[size] || theme.spacing.md;
        const borderRadius = theme.borderRadius.base;
        const fontSize = theme.fonts.sizes.base;
        const transition = theme.transitions.base;

        return `
            <button style="
                background-color: ${bgColor};
                color: ${textColor};
                padding: ${padding};
                border: none;
                border-radius: ${borderRadius};
                font-size: ${fontSize};
                font-weight: ${theme.fonts.weights.medium};
                cursor: pointer;
                transition: ${transition};
                box-shadow: ${theme.shadows.sm};
            " 
            onmouseover="this.style.opacity='0.9'; this.style.transform='translateY(-1px)'"
            onmouseout="this.style.opacity='1'; this.style.transform='translateY(0)'">
                ${text}
            </button>
        `;
    };

    // Exemple 2: Créer une carte stylée avec le thème
    window.createThemedCard = function(title, content, accentColor = 'primary') {
        const theme = window.getTheme();
        if (!theme) return `<div><h3>${title}</h3><p>${content}</p></div>`;

        const cardConfig = theme.components.cards;
        const accentColorValue = theme.colors[accentColor] || theme.colors.primary;

        return `
            <div style="
                background: ${cardConfig.background};
                border-radius: ${cardConfig.borderRadius};
                box-shadow: ${cardConfig.shadow};
                padding: ${cardConfig.padding};
                border-left: 4px solid ${accentColorValue};
                margin: ${theme.spacing.md} 0;
                transition: ${theme.transitions.base};
            "
            onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='${theme.shadows.md}'"
            onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='${theme.shadows.base}'">
                <h3 style="
                    color: ${theme.colors.textPrimary};
                    font-family: ${theme.fonts.primary};
                    font-size: ${theme.fonts.sizes.xl};
                    font-weight: ${theme.fonts.weights.semibold};
                    margin: 0 0 ${theme.spacing.sm} 0;
                ">${title}</h3>
                <p style="
                    color: ${theme.colors.textSecondary};
                    font-family: ${theme.fonts.primary};
                    font-size: ${theme.fonts.sizes.base};
                    line-height: 1.6;
                    margin: 0;
                ">${content}</p>
            </div>
        `;
    };

    // Exemple 3: Créer un formulaire stylé avec le thème
    window.createThemedForm = function(fields) {
        const theme = window.getTheme();
        if (!theme) return '<form>Formulaire basique</form>';

        const formConfig = theme.components.forms;

        let formHTML = `
            <form style="
                background: ${theme.colors.bgCard};
                padding: ${theme.spacing.xl};
                border-radius: ${theme.borderRadius.lg};
                box-shadow: ${theme.shadows.md};
                max-width: 500px;
            ">
        `;

        fields.forEach(field => {
            formHTML += `
                <div style="margin-bottom: ${theme.spacing.lg};">
                    <label style="
                        display: block;
                        color: ${theme.colors.textPrimary};
                        font-family: ${theme.fonts.primary};
                        font-weight: ${theme.fonts.weights.medium};
                        margin-bottom: ${theme.spacing.sm};
                    ">${field.label}</label>
                    <input 
                        type="${field.type || 'text'}"
                        placeholder="${field.placeholder || ''}"
                        style="
                            width: 100%;
                            padding: ${formConfig.inputPadding};
                            border: 1px solid ${formConfig.inputBorder};
                            border-radius: ${formConfig.borderRadius};
                            background: ${formConfig.inputBg};
                            font-family: ${theme.fonts.primary};
                            font-size: ${theme.fonts.sizes.base};
                            transition: ${theme.transitions.fast};
                            box-sizing: border-box;
                        "
                        onfocus="this.style.borderColor='${formConfig.inputFocus}'; this.style.boxShadow='0 0 0 3px ${theme.colors.primary}25'"
                        onblur="this.style.borderColor='${formConfig.inputBorder}'; this.style.boxShadow='none'"
                    />
                </div>
            `;
        });

        formHTML += `
                <button type="submit" style="
                    background: ${theme.colors.primary};
                    color: ${theme.colors.textLight};
                    padding: ${theme.spacing.md} ${theme.spacing.xl};
                    border: none;
                    border-radius: ${theme.borderRadius.base};
                    font-family: ${theme.fonts.primary};
                    font-weight: ${theme.fonts.weights.medium};
                    cursor: pointer;
                    transition: ${theme.transitions.base};
                    width: 100%;
                ">
                    Envoyer
                </button>
            </form>
        `;

        return formHTML;
    };

    // Exemple 4: Système de notification avec thème
    window.showThemedNotification = function(message, type = 'info', duration = 3000) {
        const theme = window.getTheme();
        if (!theme) {
            alert(message);
            return;
        }

        const colors = {
            success: theme.colors.success,
            error: theme.colors.danger,
            warning: theme.colors.warning,
            info: theme.colors.info
        };

        const bgColor = colors[type] || colors.info;
        const textColor = theme.colors.textLight;

        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${bgColor};
            color: ${textColor};
            padding: ${theme.spacing.md} ${theme.spacing.lg};
            border-radius: ${theme.borderRadius.lg};
            box-shadow: ${theme.shadows.lg};
            z-index: ${theme.zIndex.tooltip};
            font-family: ${theme.fonts.primary};
            font-weight: ${theme.fonts.weights.medium};
            max-width: 300px;
            animation: slideInRight 0.3s ease;
        `;

        notification.textContent = message;
        document.body.appendChild(notification);

        // Animation CSS
        if (!document.getElementById('notification-animations')) {
            const style = document.createElement('style');
            style.id = 'notification-animations';
            style.textContent = `
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOutRight {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }

        // Supprimer après la durée spécifiée
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, duration);
    };

    // Exemple 5: Thème pour une galerie d'images
    window.createThemedGallery = function(images) {
        const theme = window.getTheme();
        if (!theme) return '<div>Galerie non disponible</div>';

        let galleryHTML = `
            <div style="
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: ${theme.spacing.lg};
                padding: ${theme.spacing.xl};
            ">
        `;

        images.forEach((img, index) => {
            galleryHTML += `
                <div style="
                    background: ${theme.colors.bgCard};
                    border-radius: ${theme.borderRadius.lg};
                    overflow: hidden;
                    box-shadow: ${theme.shadows.base};
                    transition: ${theme.transitions.base};
                    cursor: pointer;
                "
                onmouseover="this.style.transform='scale(1.02)'; this.style.boxShadow='${theme.shadows.lg}'"
                onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='${theme.shadows.base}'"
                onclick="window.showThemedNotification('Image ${index + 1} cliquée!', 'success')">
                    <img src="${img.src}" alt="${img.alt || ''}" style="
                        width: 100%;
                        height: 200px;
                        object-fit: cover;
                        display: block;
                    "/>
                    <div style="padding: ${theme.spacing.md};">
                        <h4 style="
                            color: ${theme.colors.textPrimary};
                            font-family: ${theme.fonts.primary};
                            font-size: ${theme.fonts.sizes.lg};
                            margin: 0 0 ${theme.spacing.sm} 0;
                        ">${img.title || 'Image'}</h4>
                        <p style="
                            color: ${theme.colors.textSecondary};
                            font-size: ${theme.fonts.sizes.sm};
                            margin: 0;
                        ">${img.description || 'Description'}</p>
                    </div>
                </div>
            `;
        });

        galleryHTML += '</div>';
        return galleryHTML;
    };

    // Exemple 6: Fonction pour appliquer le thème à des éléments existants
    window.applyThemeToElements = function() {
        const theme = window.getTheme();
        if (!theme) return;

        // Styliser tous les boutons avec une classe spécifique
        const buttons = document.querySelectorAll('.theme-button');
        buttons.forEach(button => {
            button.style.cssText = `
                background: ${theme.colors.primary};
                color: ${theme.colors.textLight};
                border: none;
                padding: ${theme.spacing.sm} ${theme.spacing.md};
                border-radius: ${theme.borderRadius.base};
                cursor: pointer;
                transition: ${theme.transitions.base};
                font-family: ${theme.fonts.primary};
            `;
        });

        // Styliser toutes les cartes
        const cards = document.querySelectorAll('.theme-card');
        cards.forEach(card => {
            const cardConfig = theme.components.cards;
            card.style.cssText = `
                background: ${cardConfig.background};
                padding: ${cardConfig.padding};
                border-radius: ${cardConfig.borderRadius};
                box-shadow: ${cardConfig.shadow};
                margin: ${theme.spacing.md} 0;
            `;
        });

        console.log('🎨 Thème appliqué aux éléments existants');
    };

    // Fonction de démonstration complète
    window.demonstrateTheme = function() {
        const demoContainer = document.createElement('div');
        demoContainer.id = 'theme-demo-container';
        demoContainer.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            z-index: 9999;
            max-width: 600px;
            max-height: 80vh;
            overflow-y: auto;
        `;

        const theme = window.getTheme();
        if (!theme) {
            demoContainer.innerHTML = '<p>Thème non disponible</p>';
            document.body.appendChild(demoContainer);
            return;
        }

        demoContainer.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h2 style="margin: 0; color: ${theme.colors.textPrimary};">Démonstration du Thème</h2>
                <button onclick="document.getElementById('theme-demo-container').remove()" style="
                    background: ${theme.colors.danger};
                    color: white;
                    border: none;
                    border-radius: 50%;
                    width: 30px;
                    height: 30px;
                    cursor: pointer;
                ">×</button>
            </div>
            
            <h3>Boutons</h3>
            ${window.createThemedButton('Primaire', 'primary')}
            ${window.createThemedButton('Succès', 'success')}
            ${window.createThemedButton('Danger', 'danger')}
            
            <h3>Carte</h3>
            ${window.createThemedCard('Titre de la Carte', 'Contenu de la carte avec le thème appliqué automatiquement.', 'accent1')}
            
            <h3>Formulaire</h3>
            ${window.createThemedForm([
                { label: 'Nom', type: 'text', placeholder: 'Votre nom' },
                { label: 'Email', type: 'email', placeholder: 'votre@email.com' }
            ])}
            
            <div style="margin-top: 20px;">
                <button onclick="window.showThemedNotification('Test de notification!', 'success')" style="
                    background: ${theme.colors.info};
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 5px;
                    cursor: pointer;
                    margin-right: 10px;
                ">Test Notification</button>
                
                <button onclick="window.injectThemeCSS(); window.showThemedNotification('CSS injecté!', 'info')" style="
                    background: ${theme.colors.accent1};
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 5px;
                    cursor: pointer;
                ">Injecter CSS</button>
            </div>
        `;

        document.body.appendChild(demoContainer);
    };

    // Initialisation automatique
    waitForTheme(() => {
        console.log('🎨 Exemples de thème prêts !');
        console.log('📋 Fonctions disponibles:');
        console.log('  - window.createThemedButton(text, colorType, size)');
        console.log('  - window.createThemedCard(title, content, accentColor)');
        console.log('  - window.createThemedForm(fields)');
        console.log('  - window.showThemedNotification(message, type, duration)');
        console.log('  - window.createThemedGallery(images)');
        console.log('  - window.applyThemeToElements()');
        console.log('  - window.demonstrateTheme()');
        
        // Injecter automatiquement le CSS du thème
        if (typeof window.injectThemeCSS === 'function') {
            window.injectThemeCSS();
            console.log('✅ CSS du thème injecté automatiquement');
        }
    });

})();
