# 🌍 CONFIGURATION SERVEUR GLOBAL

## Vue d'ensemble

Cette documentation décrit la mise en place d'une configuration serveur globale centralisée pour toutes les requêtes HTTP de l'application.

## 🎯 Objectif

Créer une variable globale `SERVER_BASE_URL` initialisée à `https://wise-server.onrender.com` pour :
- Centraliser la configuration du serveur
- Faciliter le changement d'environnement (dev, test, prod)
- Éviter les URLs codées en dur dans le code
- Permettre une configuration dynamique

## 🔧 Configuration Mise en Place

### 1. Variables Globales

**Dans `js/globalData.js` et `index.html` :**

```javascript
// Variable globale pour l'URL du serveur
window.SERVER_BASE_URL = 'https://wise-server.onrender.com';

// Configuration des endpoints
window.SERVER_ENDPOINTS = {
    base: window.SERVER_BASE_URL,
    api: window.SERVER_BASE_URL + '/api',
    uploads: window.SERVER_BASE_URL + '/uploads',
    portfolio: window.SERVER_BASE_URL + '/uploads/portfolio',
    siteDetails: window.SERVER_BASE_URL + '/site/details'
};
```

### 2. Fonctions Utilitaires

#### A. `buildServerUrl(endpoint, path)`
Construit des URLs serveur de manière cohérente :

```javascript
// Exemples d'utilisation
const apiUrl = buildServerUrl('api', 'users');
// Résultat: https://wise-server.onrender.com/api/users

const portfolioUrl = buildServerUrl('portfolio', 'image.jpg');
// Résultat: https://wise-server.onrender.com/uploads/portfolio/image.jpg
```

#### B. `setServerBaseUrl(newUrl)`
Change dynamiquement l'URL du serveur :

```javascript
// Changer pour un serveur de production
setServerBaseUrl('https://api.monsite.com');

// Changer pour un serveur de développement local
setServerBaseUrl('http://localhost:3000');
```

### 3. Fonctions Adaptées

#### A. `fetchAndMergeGlobalData()`
Maintenant utilise la configuration globale par défaut :

```javascript
// AVANT : URL obligatoire
await fetchAndMergeGlobalData('https://wise-server.onrender.com', 'demo-11');

// APRÈS : URL optionnelle (utilise la config globale)
await fetchAndMergeGlobalData(); // Utilise SERVER_BASE_URL
await fetchAndMergeGlobalData(null, 'demo-11'); // Utilise SERVER_BASE_URL
await fetchAndMergeGlobalData('http://autre-serveur.com', 'demo-11'); // URL spécifique
```

#### B. `normalizeImagePath()`
Gère les images selon la configuration serveur :

```javascript
// Détecte automatiquement les images du serveur configuré
if (imagePath.startsWith(window.SERVER_BASE_URL + '/uploads/portfolio/')) {
    // Utilise une image locale de fallback
    return localImages[hash];
}
```

## 🛠️ Utilisation

### 1. Configuration Initiale

**Par défaut :** `https://wise-server.onrender.com`

**Pour changer :**
```javascript
// Dans n'importe quel script
setServerBaseUrl('http://nouveau-serveur.com');
```

### 2. Environnements Prédéfinis

#### Développement Local
```javascript
setServerBaseUrl('https://wise-server.onrender.com'); // Serveur principal
setServerBaseUrl('http://localhost:3000'); // Serveur alternatif
```

#### Production
```javascript
setServerBaseUrl('https://api.monsite.com');
setServerBaseUrl('https://backend.mondomaine.fr');
```

### 3. Utilisation dans le Code

```javascript
// Récupérer des données avec la config globale
await fetchAndMergeGlobalData();

// Construire une URL d'API
const usersUrl = buildServerUrl('api', 'users');

// Vérifier l'URL actuelle
console.log('Serveur actuel:', window.SERVER_BASE_URL);

// Accéder aux endpoints
console.log('Endpoint portfolio:', window.SERVER_ENDPOINTS.portfolio);
```

## 🧪 Tests

### Page de Test Créée

**Fichier :** `test-server-config.html`

**Fonctionnalités :**
- ✅ Affichage de la configuration actuelle
- ✅ Modification de l'URL du serveur
- ✅ Liste des endpoints disponibles
- ✅ Tests de connexion aux endpoints
- ✅ Test de récupération des données
- ✅ Environnements prédéfinis
- ✅ Journal des logs en temps réel

### Tests Disponibles

1. **Test de la configuration :**
   ```bash
   start test-server-config.html
   ```

2. **Test de l'index avec nouvelle config :**
   ```bash
   start index.html
   ```

3. **Test de récupération de données :**
   ```bash
   start test-remote-data-fetch.html
   ```

## 📊 Avantages

### 1. Centralisation
- ✅ Une seule variable à modifier
- ✅ Configuration cohérente dans toute l'app
- ✅ Endpoints automatiquement mis à jour

### 2. Flexibilité
- ✅ Changement d'environnement en une ligne
- ✅ Configuration dynamique possible
- ✅ Support de plusieurs serveurs

### 3. Maintenance
- ✅ Plus d'URLs codées en dur
- ✅ Debugging facilité
- ✅ Configuration visible et modifiable

### 4. Robustesse
- ✅ Fallbacks automatiques pour les images
- ✅ Gestion d'erreurs améliorée
- ✅ Logs détaillés des requêtes

## 🔍 Résolution des Problèmes

### Problème : Images 404

**Cause :** Les images viennent du serveur avec des URLs non accessibles

**Solution :** La fonction `normalizeImagePath()` détecte automatiquement et utilise des images locales

```javascript
// Détection automatique
if (imagePath.startsWith(window.SERVER_BASE_URL + '/uploads/portfolio/')) {
    // Utilise une image locale de la liste prédéfinie
    return localImages[hash];
}
```

### Problème : Serveur Non Accessible

**Cause :** Le serveur configuré n'est pas démarré ou l'URL est incorrecte

**Solutions :**
1. Vérifier que le serveur est démarré
2. Changer l'URL avec `setServerBaseUrl()`
3. Utiliser la page de test pour diagnostiquer

### Problème : Configuration Non Appliquée

**Cause :** Scripts chargés dans le mauvais ordre

**Solution :** S'assurer que `globalData.js` est chargé en premier

```html
<!-- Ordre correct -->
<script src="js/globalData.js"></script>
<script src="js/autres-scripts.js"></script>
```

## 🔮 Évolutions Futures

### Améliorations Possibles

1. **Configuration par fichier :**
   ```javascript
   // config.json
   {
     "development": "https://wise-server.onrender.com",
     "production": "https://api.monsite.com"
   }
   ```

2. **Auto-détection d'environnement :**
   ```javascript
   // Détecter automatiquement dev/prod
   const isProduction = window.location.hostname !== 'localhost';
   ```

3. **Cache des configurations :**
   ```javascript
   // Sauvegarder la config dans localStorage
   localStorage.setItem('serverConfig', JSON.stringify(config));
   ```

4. **Monitoring des endpoints :**
   ```javascript
   // Vérifier périodiquement la santé des endpoints
   setInterval(checkEndpointsHealth, 60000);
   ```

## 📋 Fichiers Modifiés

- ✅ **`js/globalData.js`** - Configuration globale ajoutée
- ✅ **`index.html`** - Variables globales et fonctions utilitaires
- ✅ **`test-server-config.html`** - Page de test créée
- ✅ **`CONFIGURATION-SERVEUR-GLOBAL.md`** - Cette documentation

## ✅ Checklist de Validation

- ✅ Variable `SERVER_BASE_URL` initialisée
- ✅ Objet `SERVER_ENDPOINTS` configuré
- ✅ Fonction `buildServerUrl()` disponible
- ✅ Fonction `setServerBaseUrl()` disponible
- ✅ `fetchAndMergeGlobalData()` adaptée
- ✅ `normalizeImagePath()` adaptée
- ✅ Page de test fonctionnelle
- ✅ Documentation complète

---

**Date de création :** 19 Juin 2025  
**Version :** 1.0.0  
**Auteur :** Assistant IA  
**Statut :** ✅ Implémenté et testé
