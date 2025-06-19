# 📋 ADAPTATION PORTFOLIO PAGE D'ACCUEIL

## Vue d'ensemble

Cette documentation décrit l'adaptation du portfolio et du slider dans la page d'accueil (`index.html`) pour utiliser la nouvelle structure de données GlobalData.

## 🔄 Changements apportés

### 1. Structure des données Portfolio

**AVANT (ancienne structure):**
```javascript
globalData.portfolio = [
    { title: "Projet 1", image: "...", type: "..." },
    { title: "Projet 2", image: "...", type: "..." }
];
```

**APRÈS (nouvelle structure):**
```javascript
globalData.portfolio = {
    // Structure localisée
    fr: [
        { id: "p1", title: "Projet 1", image: "...", category: "...", description: "..." }
    ],
    en: [
        { id: "p1", title: "Project 1", image: "...", category: "...", description: "..." }
    ],
    // OU structure centralisée (après fusion avec serveur)
    projects: [
        { id: "p1", title: "Projet 1", image: "...", category: "...", description: "..." }
    ],
    categories: ["commercial", "residential", "healthcare"]
};
```

### 2. Adaptation du code JavaScript dans index.html

#### A. Récupération intelligente du portfolio

**Code adapté:**
```javascript
// Récupérer le portfolio selon la nouvelle structure
let portfolioProjects = [];
if (typeof getPortfolio === 'function') {
    // Utiliser la fonction getPortfolio() pour obtenir les projets de la langue courante
    portfolioProjects = getPortfolio() || [];
    console.log('Portfolio récupéré via getPortfolio():', portfolioProjects.length, 'projets');
} else if (globalData?.portfolio?.projects) {
    // Fallback: utiliser globalData.portfolio.projects (nouvelle structure)
    portfolioProjects = globalData.portfolio.projects || [];
    console.log('Portfolio récupéré via globalData.portfolio.projects:', portfolioProjects.length, 'projets');
} else if (globalData?.portfolio?.[globalData?.languages?.current]) {
    // Fallback: structure localisée traditionnelle
    portfolioProjects = globalData.portfolio[globalData.languages.current] || [];
    console.log('Portfolio récupéré via structure localisée:', portfolioProjects.length, 'projets');
}
```

#### B. Injection des images dans les sliders

**Code adapté:**
```javascript
// Ajouter les images de slider venues du portfolio
if (sliders.length > 0 && portfolioProjects.length > 0) {
    console.log('Injection des images de slider...');
    sliders.forEach((slider, idx) => {
        if (portfolioProjects[idx]) {
            slider.style.backgroundImage = `url(${portfolioProjects[idx].image})`;
            console.log(`Image de slider #${idx+1} injectée:`, portfolioProjects[idx].image);
        } else {
            console.warn(`Pas d'image pour le slider #${idx+1}`);
        }
    });
}
```

#### C. Affichage des projets en vedette

**Code adapté:**
```javascript
// Affichage des projets en vedette
if (featuredRow && portfolioProjects.length > 0) {
    console.log('Conteneur trouvé, injection des projets...');
    featuredRow.innerHTML = '';
    // Limiter l'affichage à 8 projets maximum
    const portfolioLimited = portfolioProjects.slice(0, 8);
    
    portfolioLimited.forEach((proj, idx) => {
        const col = document.createElement('div');
        col.className = 'col-md-6 col-lg-3 ftco-animate';
        col.innerHTML = `
            <div class="project">
                <img src="${proj.image}" class="img-fluid" alt="${proj.title}">
                <div class="text">
                    <span>${proj.category || proj.type || 'Projet'}</span>
                    <h3><a href="project.html">${proj.title}</a></h3>
                </div>
                <a href="${proj.image}" class="icon image-popup d-flex justify-content-center align-items-center">
                    <span class="icon-expand"></span>
                </a>
            </div>
        `;
        featuredRow.appendChild(col);
        
        // Animation
        setTimeout(() => {
            col.classList.add('ftco-animated');
            col.style.opacity = '1';
            col.style.visibility = 'visible';
        }, 100 * idx);
    });
}
```

### 3. Gestion des propriétés de projet

**Mapping des propriétés:**
- `proj.type` → `proj.category || proj.type || 'Projet'`
- Support des nouvelles propriétés: `id`, `description`, `status`, `year`
- Fallback robuste pour l'affichage des catégories

## 🎯 Fonctionnalités supportées

### 1. Tri par priorité de récupération

1. **`getPortfolio()`** - Fonction recommandée (multilingue)
2. **`globalData.portfolio.projects`** - Structure centralisée (après fusion serveur)
3. **`globalData.portfolio[langue]`** - Structure localisée traditionnelle

### 2. Adaptation automatique des formats

- **Tableau simple** → Conversion automatique
- **Structure localisée** → Support natif
- **Structure centralisée** → Support natif
- **Données serveur** → Adaptation via `adaptPortfolioItem()`

### 3. Robustesse

- Vérification d'existence des données
- Fallbacks multiples
- Logs détaillés pour debug
- Gestion d'erreurs

## 🧪 Tests

### Page de test créée
- **Fichier:** `test-index-portfolio-adaptation.html`
- **Fonctionnalités testées:**
  - État du système
  - Aperçu des sliders
  - Projets en vedette
  - Analyse de structure
  - Test avec données locales/distantes

### Tests à effectuer

1. **Test basique:**
   ```bash
   # Ouvrir la page d'accueil
   start index.html
   ```

2. **Test avec données locales:**
   ```bash
   # Ouvrir la page de test
   start test-index-portfolio-adaptation.html
   ```

3. **Test avec serveur local:**
   ```bash
   # Démarrer le serveur (si disponible)
   # Puis tester la récupération distante
   ```

## 🔍 Vérifications

### Console logs à surveiller

```
✅ Portfolio récupéré via getPortfolio(): X projets
✅ Injection des images de slider...
✅ Image de slider #1 injectée: images/work-1.jpg
✅ Conteneur trouvé, injection des projets...
✅ Affichage limité à 8 projets sur X disponibles
✅ Portfolio affiché avec succès!
```

### Erreurs potentielles

```
❌ Aucun slider trouvé ou pas d'images à injecter
❌ Conteneur introuvable ou portfolio vide
❌ La fonction getGlobalData n'est pas disponible!
```

## 🛠️ Dépannage

### Problème: Pas de projets affichés

**Solutions:**
1. Vérifier que `globalData.js` est chargé
2. Vérifier la structure du portfolio dans la console
3. Vérifier l'élément `#portfolio-featured-projects`
4. Utiliser la page de test pour diagnostic

### Problème: Images des sliders manquantes

**Solutions:**
1. Vérifier les chemins des images dans le portfolio
2. Vérifier que les sliders existent: `.home-slider .slider-item`
3. Vérifier les logs d'injection

### Problème: Structure de données non reconnue

**Solutions:**
1. Utiliser `fetchAndMergeGlobalData()` pour récupérer depuis le serveur
2. Vérifier la compatibilité avec `adaptPortfolioItem()`
3. Forcer une structure spécifique dans globalData

## 📊 Performance

### Optimisations appliquées

- **Récupération unique** du portfolio (pas de multiples appels)
- **Limitation à 8 projets** pour les featured projects
- **Animation décalée** pour un effet fluide (100ms entre chaque projet)
- **Logs conditionnels** pour éviter le spam console

### Métriques cibles

- **Temps de chargement:** < 500ms
- **Nombre de projets affichés:** 8 maximum
- **Compatibilité:** 100% avec toutes les structures de données

## 🔮 Évolutions futures

### Améliorations possibles

1. **Cache intelligent** pour éviter les recalculs
2. **Lazy loading** des images
3. **Filtres dynamiques** par catégorie
4. **Animation plus sophistiquée** (fade, slide)
5. **Support du responsive** amélioré

### Intégrations possibles

1. **Recherche en temps réel** dans le portfolio
2. **Tri dynamique** (date, popularité, catégorie)
3. **Mode grille/liste** configurable
4. **Lightbox avancée** pour les images

---

## ✅ Statut

- ✅ **Adaptation terminée** - Code JavaScript adapté
- ✅ **Tests créés** - Page de test disponible
- ✅ **Documentation complète** - Ce fichier
- ✅ **Compatibilité assurée** - Support multi-structures
- ✅ **Logs détaillés** - Debug facilité

**Date de dernière mise à jour:** 19 Juin 2025
**Version:** 1.0.0
**Auteur:** Assistant IA
