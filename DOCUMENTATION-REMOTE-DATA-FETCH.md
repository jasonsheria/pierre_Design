# 🌐 Récupération de Données Distantes - GlobalData

## 📋 Fonctionnalité Créée

Une méthode complète pour **récupérer des données depuis une URL externe** et les **fusionner intelligemment** avec GlobalData, en préservant les valeurs existantes lorsque les nouvelles sont `null`.

## 🎯 Fonction Principale

### `window.fetchAndMergeGlobalData(baseUrl, siteId)`

```javascript
// Usage basique
const success = await window.fetchAndMergeGlobalData('https://api.example.com', 'demo-11');

// Usage avec gestion d'événements
window.addEventListener('globalDataUpdated', (event) => {
    console.log('Données mises à jour:', event.detail);
});

const success = await window.fetchAndMergeGlobalData('https://myapi.com', 'my-site-id');
```

### 📝 Paramètres

| Paramètre | Type | Description | Défaut |
|-----------|------|-------------|---------|
| `baseUrl` | `string` | URL de base de l'API | Requis |
| `siteId` | `string` | Identifiant du site | `'demo-11'` |

### 🔗 URL Construite

La fonction construit automatiquement l'URL finale :
```
{baseUrl}/site/details/{siteId}
```

**Exemples :**
- `https://api.example.com/site/details/demo-11`
- `http://localhost:3000/site/details/my-site`
- `https://myapi.com/site/details/prod-site`

## 🔄 Fonctionnement

### 1. **Envoi de la Requête HTTP**

```javascript
const response = await fetch(url, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    mode: 'cors',
    credentials: 'same-origin'
});
```

### 2. **Fusion Intelligente des Données**

La fonction `mergeDataWithGlobalData()` fusionne les données en suivant ces règles :

- ✅ **Valeurs existantes préservées** si nouvelles valeurs = `null` ou `undefined`
- ✅ **Nouvelles valeurs appliquées** si non-null
- ✅ **Fusion récursive** pour les objets imbriqués
- ✅ **Nouvelles propriétés ajoutées** si inexistantes

### 3. **Exemple de Fusion**

**GlobalData existant :**
```javascript
{
    site: {
        name: 'BEE Company',
        email: 'contact@beecompany.com',
        phone: '+243 123 456 789'
    },
    theme: {
        colors: {
            primary: '#1683fb',
            textPrimary: '#212529'
        }
    }
}
```

**Données distantes :**
```javascript
{
    site: {
        name: 'BEE Company Remote',
        email: null,  // ← Sera ignorée
        address: 'Nouvelle adresse'  // ← Sera ajoutée
    },
    theme: {
        colors: {
            primary: '#ff6b35',  // ← Sera mise à jour
            textPrimary: null    // ← Sera ignorée
        }
    },
    newSection: {  // ← Sera ajoutée entièrement
        title: 'Nouvelle section'
    }
}
```

**Résultat fusionné :**
```javascript
{
    site: {
        name: 'BEE Company Remote',     // ← Mis à jour
        email: 'contact@beecompany.com', // ← Préservé (null ignoré)
        phone: '+243 123 456 789',      // ← Préservé
        address: 'Nouvelle adresse'     // ← Ajouté
    },
    theme: {
        colors: {
            primary: '#ff6b35',         // ← Mis à jour
            textPrimary: '#212529'      // ← Préservé (null ignoré)
        }
    },
    newSection: {                       // ← Ajouté
        title: 'Nouvelle section'
    }
}
```

## 🎪 Événements Déclenchés

### ✅ Succès : `globalDataUpdated`

```javascript
window.addEventListener('globalDataUpdated', (event) => {
    console.log('Source:', event.detail.source);        // 'remote'
    console.log('URL:', event.detail.url);              // URL utilisée
    console.log('Données:', event.detail.data);         // Données reçues
});
```

### ❌ Erreur : `globalDataUpdateError`

```javascript
window.addEventListener('globalDataUpdateError', (event) => {
    console.log('Erreur:', event.detail.error);         // Message d'erreur
    console.log('URL:', event.detail.url);              // URL qui a échoué
});
```

## 🧪 Fonctions de Test

### 1. **Test avec API Réelle**

```javascript
const success = await window.testFetchGlobalData('https://api.example.com', 'demo-11');
```

### 2. **Test avec Données Simulées**

```javascript
// Génère des données de test
const simulatedData = window.simulateRemoteData();

// Teste la fusion sans requête HTTP
window.testWithSimulatedData();
```

### 3. **Données Simulées Exemple**

```javascript
const simulatedData = {
    site: {
        name: 'BEE Company Remote',
        tagline: 'Excellence from the Cloud',
        email: 'remote@beecompany.com',
        address: null,  // Ne sera pas écrasée
        social: {
            facebook: 'https://facebook.com/beecompany',
            twitter: null,  // Ne sera pas écrasée
            linkedin: 'https://linkedin.com/company/beecompany'
        }
    },
    theme: {
        name: 'Thème distant',
        colors: {
            primary: '#ff6b35',
            accent1: '#f7931e',
            textPrimary: null  // Ne sera pas écrasée
        }
    },
    newSection: {
        title: 'Nouvelle section',
        description: 'Ajoutée depuis les données distantes'
    }
};
```

## 💾 Persistance

### Sauvegarde Automatique

Les données fusionnées sont automatiquement sauvegardées dans `localStorage` :

```javascript
if (typeof window.saveToLocalStorage === 'function') {
    window.saveToLocalStorage('globalData', window.globalData);
}
```

## 🧪 Page de Test

### `test-remote-data-fetch.html`

Une page complète pour tester la fonctionnalité avec :

- 🎮 **Interface de contrôle** avec champs URL et ID
- 📊 **Comparaison avant/après** des données
- 📝 **Journal en temps réel** des opérations
- 🧪 **Test avec données simulées**
- 🌐 **Test avec API réelle**
- 📖 **Guide d'utilisation intégré**

### Fonctionnalités de Test

1. **Configuration URL personnalisée**
2. **Test avec JSONPlaceholder** (API de démo)
3. **Simulation de données** pour voir le comportement
4. **Comparaison visuelle** des données avant/après
5. **Journal détaillé** de toutes les opérations
6. **Gestion des erreurs** avec messages explicites

## 🔧 Gestion d'Erreurs

### Types d'Erreurs Gérées

- **Erreur réseau** (URL inaccessible, timeout)
- **Erreur HTTP** (404, 500, etc.)
- **Données JSON invalides**
- **Structure de données incorrecte**
- **Erreurs de fusion**

### Exemple de Gestion

```javascript
try {
    const success = await window.fetchAndMergeGlobalData(baseUrl, siteId);
    if (success) {
        console.log('✅ Données mises à jour');
    } else {
        console.log('❌ Échec de la mise à jour');
    }
} catch (error) {
    console.error('Erreur:', error.message);
}
```

## 🎯 Cas d'Usage

### 1. **Configuration Centralisée**

```javascript
// Récupérer la configuration du site depuis un CMS
await window.fetchAndMergeGlobalData('https://cms.example.com', 'production');
```

### 2. **Thèmes Dynamiques**

```javascript
// Charger un thème personnalisé depuis une API
await window.fetchAndMergeGlobalData('https://themes.example.com', 'client-123');
```

### 3. **Contenu Multilingue**

```javascript
// Récupérer les traductions depuis un service
await window.fetchAndMergeGlobalData('https://translations.example.com', 'fr-site');
```

### 4. **Données Utilisateur**

```javascript
// Charger les préférences utilisateur
await window.fetchAndMergeGlobalData('https://api.example.com', `user-${userId}`);
```

## 📁 Fichiers Modifiés

### `js/globalData.js`
- ✅ `window.fetchAndMergeGlobalData()` - Fonction principale
- ✅ `mergeDataWithGlobalData()` - Fusion intelligente
- ✅ `window.testFetchGlobalData()` - Test avec API réelle
- ✅ `window.simulateRemoteData()` - Génération de données test
- ✅ `window.testWithSimulatedData()` - Test sans réseau

### `test-remote-data-fetch.html`
- ✅ Interface de test complète
- ✅ Tests automatisés et manuels
- ✅ Documentation intégrée
- ✅ Gestion des erreurs

## 🚀 Utilisation en Production

### Initialisation au Chargement

```javascript
window.addEventListener('load', async () => {
    try {
        // Récupérer la configuration depuis votre API
        await window.fetchAndMergeGlobalData('https://api.votresite.com', 'production');
        console.log('Configuration chargée');
    } catch (error) {
        console.log('Utilisation de la configuration locale');
    }
});
```

### Mise à Jour Périodique

```javascript
// Mettre à jour toutes les 5 minutes
setInterval(async () => {
    await window.fetchAndMergeGlobalData('https://api.votresite.com', 'live');
}, 5 * 60 * 1000);
```

---

## ✨ Résultat Final

**Une solution complète et robuste pour récupérer et fusionner des données distantes avec GlobalData !**

- 🔗 **Requêtes HTTP automatisées** vers vos APIs
- 🧠 **Fusion intelligente** préservant les données existantes
- 🎯 **Format URL standardisé** : `{baseUrl}/site/details/{siteId}`
- 📅 **Événements personnalisés** pour réagir aux changements
- 💾 **Sauvegarde automatique** dans localStorage
- 🧪 **Tests complets** avec interface dédiée
- 🛡️ **Gestion d'erreurs robuste**

**Testez dès maintenant avec `test-remote-data-fetch.html` !** 🌐✨
