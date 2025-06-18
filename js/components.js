// components.js - Composants Navigation et Footer réutilisables avec gestion multilingue
(function() {
  
  // Fonction de diagnostic
  window.diagnoseLangSystem = function() {
    console.log('=== DIAGNOSTIC SYSTÈME DE LANGUES ===');
    console.log('window.getGlobalData:', typeof window.getGlobalData);
    console.log('window.getTranslations:', typeof window.getTranslations);
    console.log('window.setSiteLanguage:', typeof window.setSiteLanguage);
    
    if (typeof window.getGlobalData === 'function') {
      const globalData = window.getGlobalData();
      console.log('GlobalData:', globalData);
      console.log('Langue actuelle:', globalData?.site?.siteLanguage);
    }
    
    if (typeof window.getTranslations === 'function') {
      const translations = window.getTranslations();
      console.log('Traductions:', translations);
    }
    
    const langSelector = document.querySelector('.language-selector');
    console.log('Sélecteur de langue dans DOM:', !!langSelector);
    console.log('=== FIN DIAGNOSTIC ===');
  };
  
  // Fonction pour obtenir les traductions
  function getTranslations() {
    console.log('[components.js] Récupération des traductions...');
    console.log('[components.js] window.getTranslations disponible:', typeof window.getTranslations);
    
    if (typeof window.getTranslations === 'function') {
      // getTranslations est un alias pour getLocalizedData, mais on a besoin des traductions spécifiques pour la navigation
      // Utilisons les données de navigation directement
      const navTranslations = window.getTranslations('navigation');
      console.log('[components.js] Traductions navigation récupérées:', navTranslations);
      
      if (navTranslations && Array.isArray(navTranslations)) {
        // Convertir le tableau de navigation en objet traductions
        const translations = {
          home: navTranslations.find(item => item.href === 'index.html')?.label || 'Accueil',
          about: navTranslations.find(item => item.href === 'about.html')?.label || 'À propos',
          projects: navTranslations.find(item => item.href === 'project.html')?.label || 'Projets',
          blog: navTranslations.find(item => item.href === 'blog.html')?.label || 'Blog',
          contact: navTranslations.find(item => item.href === 'contact.html')?.label || 'Contact'
        };
        console.log('[components.js] Traductions converties:', translations);
        return translations;
      }
    }
    
    console.warn('[components.js] Fonction getTranslations non disponible ou données invalides, utilisation du fallback');
    // Fallback si les traductions ne sont pas encore chargées
    return {
      home: "Accueil",
      about: "À Propos", 
      projects: "Projets",
      blog: "Blog",
      contact: "Contact",
      newsletter: "Newsletter",
      enterEmail: "Entrez votre email",
      subscribe: "S'abonner",
      copyrightText: "Tous droits réservés | Ce template est fait avec",
      by: "par"
    };
  }

  // Fonction pour obtenir la langue actuelle
  function getCurrentLanguage() {
    const globalData = typeof window.getGlobalData === 'function' ? window.getGlobalData() : null;
    console.log('[components.js] Chargement de la langue actuelle...');
    if (!globalData) {
      console.warn('[components.js] Aucune donnée globale trouvée, utilisation de la langue par défaut "fr".');
      return 'fr'; // Langue par défaut
    }
    console.log('[components.js] Langue actuelle :', globalData?.site?.siteLanguage || 'fr');
    // Retourne la langue actuelle ou 'fr' si non définie   
    return globalData?.site?.siteLanguage || 'fr';  }
  
  // Navigation HTML avec traductions dynamiques et thème
  function getNavigationHTML() {
    const t = getTranslations();
    const currentLang = getCurrentLanguage();
    const globalData = typeof window.getGlobalData === 'function' ? window.getGlobalData() : null;
    const theme = typeof window.getTheme === 'function' ? window.getTheme() : null;
    
    // Vérification et fallback pour les traductions
    if (!t) {
      console.warn('[components.js] Traductions non disponibles, utilisation de fallbacks');
      // Fallback avec traductions directes
      const fallbackTranslations = {
        fr: { home: 'Accueil', about: 'À propos', projects: 'Projets', blog: 'Blog', contact: 'Contact' },
        en: { home: 'Home', about: 'About', projects: 'Projects', blog: 'Blog', contact: 'Contact' }
      };
      const translations = fallbackTranslations[currentLang] || fallbackTranslations.fr;      
      return generateNavigationHTML(translations, theme, currentLang);
    }
    
    return generateNavigationHTML(t, theme, currentLang);
  }
  
  // Fonction pour générer le HTML de navigation
  function generateNavigationHTML(translations, theme, currentLang) {
    // Obtenir les données globales
    const globalData = typeof window.getGlobalData === 'function' ? window.getGlobalData() : null;
    
    // Couleurs du thème ou valeurs par défaut
    const navbarBg = theme?.components?.navbar?.background || theme?.colors?.primary || '#1683fb';
    const textColor = theme?.components?.navbar?.textColor || theme?.colors?.textLight || '#ffffff';
    const hoverColor = theme?.components?.navbar?.linkHoverColor || theme?.colors?.black || '#000000';
    
    console.log('[components.js] Utilisation du thème pour navigation:', { navbarBg, textColor, hoverColor });
    
    return `
    <div class="bg-top navbar-light">
      <div class="container">
        <div class="row no-gutters d-flex align-items-center align-items-stretch" style="justify-content: space-between;">
          <div class="col-md-4 d-flex align-items-center py-4">
            <a class="navbar-brand" href="index.html"><span class="flaticon-bee mr-1"></span>PDesign.</a>
          </div>
          <div class="col-lg-6 d-block">
            <div class="row d-flex">              <div class="col-md d-flex topper align-items-center align-items-stretch py-md-4">
                <div class="icon d-flex justify-content-center align-items-center"><span class="icon-paper-plane"></span></div>
                <div class="text d-flex align-items-center">
                  <span>${globalData?.author?.email || 'info@pdesign.com'}</span>
                </div>
              </div>
              <div class="col-md d-flex topper align-items-center align-items-stretch py-md-4">
                <div class="icon d-flex justify-content-center align-items-center"><span class="icon-phone2"></span></div>
                <div class="text d-flex align-items-center">
                  <span>Call Us: +243 ${globalData?.author?.telephone || '123456789'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark ftco-navbar-light" id="ftco-navbar" style="background-color: ${navbarBg};">
      <div class="container d-flex align-items-center">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="oi oi-menu"></span> Menu        </button>
        <div class="collapse navbar-collapse" id="ftco-nav">
          <ul class="navbar-nav mx-auto">
            <li class="nav-item px-4"><a href="index.html" class="nav-link" style="color: ${textColor};">${translations.home}</a></li>
            <li class="nav-item px-4"><a href="about.html" class="nav-link" style="color: ${textColor};">${translations.about}</a></li>
            <li class="nav-item px-4"><a href="project.html" class="nav-link" style="color: ${textColor};">${translations.projects}</a></li>
            <li class="nav-item px-4"><a href="blog.html" class="nav-link" style="color: ${textColor};">${translations.blog}</a></li>
            <li class="nav-item px-4"><a href="contact.html" class="nav-link" style="color: ${textColor};">${translations.contact}</a></li>
          </ul>
          
          <!-- Sélecteur de langue -->
          <div class="language-selector">
            <button class="language-toggle" id="languageToggle">
              <div class="language-flag ${currentLang}"></div>
              <span class="language-text">${currentLang.toUpperCase()}</span>
              <span class="chevron">▼</span>
            </button>
            <div class="language-dropdown" id="languageDropdown">
              <div class="language-option ${currentLang === 'fr' ? 'active' : ''}" data-lang="fr">
                <div class="language-flag fr"></div>
                <span class="language-name">Français</span>
              </div>
              <div class="language-option ${currentLang === 'en' ? 'active' : ''}" data-lang="en">
                <div class="language-flag en"></div>
                <span class="language-name">English</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  `;
  }
  // Footer HTML avec traductions dynamiques
  function getFooterHTML() {
    const t = getTranslations();
    
    return `
    <footer class="ftco-footer ftco-bg-dark ftco-section" id="ftco-footer">
      <div class="container">
        <div class="row mb-5">
          <div class="col-md">
            <div class="ftco-footer-widget mb-5">
              <h2 class="ftco-heading-2 logo"><span class="flaticon-bee"></span>Bee.</h2>
              <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
              <ul class="ftco-footer-social list-unstyled float-md-left float-lft mt-3">
                <li class="ftco-animate"><a href="#"><span class="icon-twitter"></span></a></li>
                <li class="ftco-animate"><a href="#"><span class="icon-facebook"></span></a></li>
                <li class="ftco-animate"><a href="#"><span class="icon-instagram"></span></a></li>
              </ul>
            </div>
          </div>
          <div class="col-md">
            <div class="ftco-footer-widget mb-5 ml-md-4">
              <h2 class="ftco-heading-2">${t.services}</h2>
              <ul class="list-unstyled">
                <li><a href="#"><span class="ion-ios-arrow-round-forward mr-2"></span>${t.construction}</a></li>
                <li><a href="#"><span class="ion-ios-arrow-round-forward mr-2"></span>${t.renovation}</a></li>
                <li><a href="#"><span class="ion-ios-arrow-round-forward mr-2"></span>${t.painting}</a></li>
                <li><a href="#"><span class="ion-ios-arrow-round-forward mr-2"></span>${t.interiorDesign}</a></li>
                <li><a href="#"><span class="ion-ios-arrow-round-forward mr-2"></span>${t.exteriorDesign}</a></li>
              </ul>
            </div>
          </div>
          <div class="col-md-5">
            <div class="ftco-footer-widget mb-5">
              <h2 class="ftco-heading-2">${t.recentBlog}</h2>
              <div class="block-21 mb-4 d-flex">
                <a class="blog-img mr-4" style="background-image: url(images/image_1.jpg);"></a>
                <div class="text">
                  <h3 class="heading"><a href="#">Even the all-powerful Pointing has no control about</a></h3>
                  <div class="meta">
                    <div><a href="#"><span class="icon-calendar"></span> Feb. 07, 2018</a></div>
                    <div><a href="#"><span class="icon-person"></span> Admin</a></div>
                    <div><a href="#"><span class="icon-chat"></span> 19</a></div>
                  </div>
                </div>
              </div>
              <div class="block-21 mb-5 d-flex">
                <a class="blog-img mr-4" style="background-image: url(images/image_2.jpg);"></a>
                <div class="text">
                  <h3 class="heading"><a href="#">Even the all-powerful Pointing has no control about</a></h3>
                  <div class="meta">
                    <div><a href="#"><span class="icon-calendar"></span> Feb. 07, 2018</a></div>
                    <div><a href="#"><span class="icon-person"></span> Admin</a></div>
                    <div><a href="#"><span class="icon-chat"></span> 19</a></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md">
            <div class="ftco-footer-widget mb-5">
              <h2 class="ftco-heading-2">${t.newsletter}</h2>
              <form action="#" class="subscribe-form">
                <div class="form-group">
                  <input type="text" class="form-control mb-2 text-center" placeholder="${t.enterEmail}">
                  <input type="submit" value="${t.subscribe}" class="form-control submit px-3">
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12 text-center">
            <p>Copyright &copy; <script>document.write(new Date().getFullYear());</script> ${t.copyrightText} <i class="icon-heart" aria-hidden="true"></i> ${t.by} <a href="https://colorlib.com" target="_blank">Colorlib</a></p>
          </div>
        </div>
      </div>
    </footer>
  `;
  }

  // Fonction pour réinitialiser Bootstrap après injection
  function reinitializeBootstrap() {
    // Attendre que jQuery soit disponible
    if (typeof $ !== 'undefined') {
      // Réinitialiser le collapse de Bootstrap pour la navigation
      $('.navbar-toggler').off('click.bs.collapse').on('click.bs.collapse', function() {
        const target = $(this).attr('data-target');
        if (target) {
          $(target).collapse('toggle');
        }
      });

      // Réinitialiser tous les composants Bootstrap
      $('[data-toggle="collapse"]').each(function() {
        $(this).collapse();
      });

      console.log('✅ Bootstrap réinitialisé');
    } else {
      // Fallback si jQuery n'est pas disponible
      const navbarToggler = document.querySelector('.navbar-toggler');
      const navbarCollapse = document.querySelector('#ftco-nav');
      
      if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function(e) {
          e.preventDefault();
          navbarCollapse.classList.toggle('show');
          const isExpanded = navbarCollapse.classList.contains('show');
          this.setAttribute('aria-expanded', isExpanded);
        });
      }
      
      console.log('✅ Navigation basique réinitialisée');
    }
  }

  // Fonction pour réinitialiser les plugins et animations
  function reinitializePlugins() {
    setTimeout(() => {
      // Réinitialiser AOS (Animate On Scroll)
      if (typeof AOS !== 'undefined') {
        AOS.refresh();
        console.log('✅ AOS réinitialisé');
      }

      // Réinitialiser Waypoints
      if (typeof Waypoint !== 'undefined' && typeof $ !== 'undefined') {
        // Détruire les anciens waypoints
        Waypoint.destroyAll();
        
        // Recréer les waypoints pour les animations
        $('.ftco-animate').waypoint(function(direction) {
          if (direction === 'down' && !$(this.element).hasClass('ftco-animated')) {
            $(this.element).addClass('item-animate');
            setTimeout(function() {
              $('body .ftco-animate.item-animate').each(function(k) {
                var el = $(this);
                setTimeout(function() {
                  var effect = el.data('animate-effect');
                  if (effect === 'fadeIn') {
                    el.addClass('fadeIn ftco-animated');
                  } else if (effect === 'fadeInLeft') {
                    el.addClass('fadeInLeft ftco-animated');
                  } else if (effect === 'fadeInRight') {
                    el.addClass('fadeInRight ftco-animated');
                  } else {
                    el.addClass('fadeInUp ftco-animated');
                  }
                  el.removeClass('item-animate');
                }, k * 50, 'easeInOutExpo');
              });
            }, 100);
          }
        }, { offset: '95%' });
        console.log('✅ Waypoints réinitialisés');
      }

      // Réinitialiser Stellar (parallax)
      if (typeof $.fn.stellar !== 'undefined') {
        $(window).stellar({
          responsive: true,
          parallaxBackgrounds: true,
          parallaxElements: true,
          horizontalScrolling: false,
          hideDistantElements: false,
          scrollProperty: 'scroll'
        });
        console.log('✅ Stellar réinitialisé');
      }

      // Déclencher les animations ftco-animate immédiatement pour les éléments visibles
      const animateElements = document.querySelectorAll('.ftco-animate');
      animateElements.forEach((el, index) => {
        setTimeout(() => {
          el.classList.add('ftco-animated', 'fadeInUp');
        }, 100 * index);
      });

    }, 300); // Délai plus long pour s'assurer que tout est prêt
  }
  // Fonction pour injecter la navigation
  window.loadNavigation = function() {
    const navContainer = document.getElementById('navigation');
    if (navContainer) {
      console.log('🔄 Injection de la navigation...');
      navContainer.innerHTML = getNavigationHTML();
      
      // Marquer la page active
      const currentPage = window.location.pathname.split('/').pop() || 'index.html';
      const navLinks = navContainer.querySelectorAll('.nav-link');
      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
          link.parentElement.classList.add('active');
        } else {
          link.parentElement.classList.remove('active');
        }      });

      // Vérifier immédiatement si le sélecteur existe
      const langSelectorCheck = document.querySelector('.language-selector');
      console.log('🔍 Sélecteur trouvé immédiatement après injection:', !!langSelectorCheck);      // Initialiser le sélecteur de langue avec un délai plus long et retry
      setTimeout(() => {
        initLanguageSelector();
        // Vérification supplémentaire après un délai
        setTimeout(() => {
          const langSelectorRecheck = document.querySelector('.language-selector');
          console.log('🔍 Vérification finale du sélecteur:', !!langSelectorRecheck);
          if (!langSelectorRecheck) {
            console.warn('⚠️ Sélecteur de langue toujours introuvable, nouvelle tentative...');
            initLanguageSelector();
          }
        }, 300);
      }, 200);      
      // Réinitialiser Bootstrap après injection
      setTimeout(reinitializeBootstrap, 100);
      
      // Initialiser la navigation sticky
      setTimeout(initStickyNavbar, 150);
      
      console.log('✅ Navigation injectée');
    }
  };

  // Fonction pour injecter le footer
  window.loadFooter = function() {
    const footerContainer = document.getElementById('ftco-footer');
    if (footerContainer) {
      console.log('🔄 Injection du footer...');
      footerContainer.outerHTML = getFooterHTML();
      
      // Réinitialiser le formulaire de newsletter
      setTimeout(() => {
        const subscribeForm = document.querySelector('.subscribe-form');
        if (subscribeForm) {
          subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="text"]');
            if (emailInput && emailInput.value.trim()) {
              alert('Merci pour votre inscription à notre newsletter !');
              emailInput.value = '';
            } else {
              alert('Veuillez entrer une adresse email valide.');
            }
          });
        }
      }, 100);
      
      console.log('✅ Footer injecté');
    }
  };  // Fonction pour initialiser le sélecteur de langue
  function initLanguageSelector() {
    console.log('🔧 Initialisation du sélecteur de langue...');
    
    const languageToggle = document.getElementById('languageToggle');
    const languageDropdown = document.getElementById('languageDropdown');
    const languageSelector = document.querySelector('.language-selector');

    console.log('languageToggle:', !!languageToggle);
    console.log('languageDropdown:', !!languageDropdown);
    console.log('languageSelector:', !!languageSelector);

    if (languageToggle && languageDropdown && languageSelector) {
      console.log('✅ Tous les éléments du sélecteur de langue trouvés');
      
      // Supprimer les anciens event listeners si ils existent
      languageToggle.removeEventListener('click', toggleLanguageDropdown);
      
      // Toggle dropdown
      languageToggle.addEventListener('click', toggleLanguageDropdown);

      // Fermer dropdown en cliquant ailleurs
      document.addEventListener('click', function(e) {
        if (!languageSelector.contains(e.target)) {
          languageSelector.classList.remove('open');
        }
      });

      // Gérer le changement de langue
      const languageOptions = languageDropdown.querySelectorAll('.language-option');
      console.log('Options de langue trouvées:', languageOptions.length);
      
      languageOptions.forEach(option => {
        option.addEventListener('click', function(e) {
          e.preventDefault();
          const selectedLang = this.dataset.lang;
          console.log('🌍 Changement de langue vers:', selectedLang);
          changeLanguage(selectedLang);
          languageSelector.classList.remove('open');
        });
      });
      
      console.log('✅ Sélecteur de langue initialisé avec succès');
    } else {
      console.warn('❌ Éléments du sélecteur de langue manquants');
      console.warn('DOM actuel:', document.querySelector('nav')?.innerHTML.substring(0, 200) + '...');
    }
  }

  // Fonction séparée pour le toggle (évite les doublons d'event listeners)
  function toggleLanguageDropdown(e) {
    e.preventDefault();
    e.stopPropagation();
    const languageSelector = document.querySelector('.language-selector');
    if (languageSelector) {
      languageSelector.classList.toggle('open');
      console.log('🔄 Toggle sélecteur de langue');
    }  }
  // Fonction pour changer la langue
  function changeLanguage(newLanguage) {
    if (typeof window.setSiteLanguage === 'function') {
      console.log('🔄 Changement de langue vers:', newLanguage);
      window.setSiteLanguage(newLanguage);
      
      // Utiliser le moteur de traduction intelligent
      if (window.smartTranslator) {
        console.log('🤖 Utilisation du moteur de traduction intelligent...');
        window.smartTranslator.translatePage(newLanguage).then(() => {
          console.log('✅ Traduction intelligente terminée');
          // Mettre à jour le sélecteur de langue
          updateLanguageSelector(newLanguage);
        });
      } else {
        console.log('🔄 Fallback: rechargement de la page...');
        // Fallback: recharger la page
        window.location.reload();
      }
    }
  }

  // Fonction pour mettre à jour le sélecteur de langue
  function updateLanguageSelector(newLanguage) {
    const languageToggle = document.getElementById('languageToggle');
    const languageText = languageToggle?.querySelector('.language-text');
    const languageFlag = languageToggle?.querySelector('.language-flag');
    
    if (languageText) {
      languageText.textContent = newLanguage.toUpperCase();
    }
    
    if (languageFlag) {
      languageFlag.className = `language-flag ${newLanguage}`;
    }
    
    // Mettre à jour les options actives
    const options = document.querySelectorAll('.language-option');
    options.forEach(option => {
      if (option.dataset.lang === newLanguage) {
        option.classList.add('active');
      } else {
        option.classList.remove('active');
      }
    });
  }

  // Fonction pour traduire les éléments de contenu sur la page
  window.translatePageContent = function() {
    const t = getTranslations();
    
    // Traduire les éléments spécifiques selon la page
    const elements = {
      // Titre de section projets
      '[data-translate="featured-projects"]': t.featuredProjects,
      '[data-translate="years-experience"]': t.yearsExperience,
      '[data-translate="successful-projects"]': t.successfulProjects,
      '[data-translate="happy-customers"]': t.happyCustomers,
      '[data-translate="request-quote"]': t.requestQuote,
      '[data-translate="read-more"]': t.readMore,
      '[data-translate="send-message"]': t.sendMessage,
      '[data-translate="first-name"]': t.firstName,
      '[data-translate="last-name"]': t.lastName,
      '[data-translate="select-services"]': t.selectServices,
      '[data-translate="phone"]': t.phone,
      '[data-translate="message"]': t.message,
      '[data-translate="appointment"]': t.appointment,
      '[data-translate="your-name"]': t.yourName,
      '[data-translate="your-email"]': t.yourEmail,
      '[data-translate="subject"]': t.subject
    };    // Appliquer les traductions
    Object.keys(elements).forEach(selector => {
      const element = document.querySelector(selector);
      if (element) {
        if (element.tagName === 'INPUT' && (element.type === 'text' || element.type === 'email')) {
          element.placeholder = elements[selector];
        } else if (element.tagName === 'TEXTAREA') {
          element.placeholder = elements[selector];
        } else {
          element.textContent = elements[selector];
        }
      }
    });
  };
  
  // Auto-chargement des composants au chargement de la page
  document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Initialisation des composants...');
      // Fonction d'initialisation des composants
    function initializeComponents() {
      console.log('✅ Initialisation des composants déclenchée');
      
      // Diagnostic préliminaire
      window.diagnoseComponentsLoading();
      
      // Diagnostic du système
      window.diagnoseLangSystem();
      
      // Charger navigation et footer
      console.log('🔄 Chargement navigation...');
      window.loadNavigation();
      
      console.log('🔄 Chargement footer...');
      window.loadFooter();
      
      // Traduire le contenu de la page
      window.translatePageContent();
      
      // Réinitialiser tous les plugins après chargement des composants
      reinitializePlugins();
      
      console.log('✅ Composants initialisés avec succès');
      
      // Diagnostic final
      setTimeout(() => {
        console.log('🔍 Diagnostic final après initialisation:');
        window.diagnoseComponentsLoading();
      }, 1000);
    }
      // Écouter l'événement globalDataReady
    window.addEventListener('globalDataReady', function(e) {
      console.log('📢 Événement globalDataReady reçu:', e.detail);
      initializeComponents();
    });
    
    // Fallback: si globalData est déjà prêt ou après délai
    setTimeout(() => {
      if (typeof window.getGlobalData === 'function' && typeof window.getTranslations === 'function') {
        console.log('⏰ Fallback: GlobalData déjà prêt, initialisation forcée');
        initializeComponents();
      } else {
        console.warn('⚠️ GlobalData pas encore prêt après 500ms, nouvelle tentative...');
        // Nouvelle tentative après 1 seconde
        setTimeout(() => {
          if (typeof window.getGlobalData === 'function') {
            console.log('⏰ Fallback 2: Initialisation tardive des composants');
            initializeComponents();
          } else {
            console.error('❌ GlobalData toujours pas prêt après 1.5s');
          }
        }, 1000);
      }
    }, 500);
  });
  
  // Fonction de diagnostic pour débugger les problèmes de chargement
  window.diagnoseComponentsLoading = function() {
    console.log('🔍 === DIAGNOSTIC COMPOSANTS ===');
    
    // Test éléments DOM
    const navElement = document.getElementById('navigation');
    const footerElement = document.getElementById('ftco-footer');
    
    console.log('📋 Éléments DOM:');
    console.log('- #navigation:', !!navElement);
    console.log('- #ftco-footer:', !!footerElement);
    
    // Test fonctions globales
    console.log('🔧 Fonctions disponibles:');
    console.log('- getGlobalData:', typeof window.getGlobalData);
    console.log('- getTranslations:', typeof window.getTranslations);
    console.log('- loadNavigation:', typeof window.loadNavigation);
    console.log('- loadFooter:', typeof window.loadFooter);
    
    // Test données
    try {
        const navData = window.getTranslations('navigation');
        console.log('📊 Données navigation:', navData ? navData.length + ' éléments' : 'Non disponible');
    } catch (error) {
        console.error('❌ Erreur données navigation:', error);
    }
    
    // Test contenu actuel
    if (navElement) {
        console.log('📋 Contenu navigation actuel:', navElement.innerHTML.length, 'caractères');
    }
    if (footerElement) {
        console.log('📋 Contenu footer actuel:', footerElement.innerHTML.length, 'caractères');
    }
    
    console.log('🔍 === FIN DIAGNOSTIC ===');
  };

  // Exposer la fonction pour usage manuel
  window.diagnoseComponents = window.diagnoseComponentsLoading;
  
  // Fonction pour initialiser l'effet sticky de la navigation
  function initStickyNavbar() {
    console.log('🔄 Initialisation de la navigation sticky...');
    
    // Utiliser jQuery si disponible, sinon vanilla JS
    if (typeof $ !== 'undefined') {
      // Version jQuery
      $(window).off('scroll.stickyNav').on('scroll.stickyNav', function() {
        const $w = $(this);
        const st = $w.scrollTop();
        const navbar = $('#ftco-navbar, .ftco-navbar-light');
        
        if (st > 150) {
          if (!navbar.hasClass('scrolled')) {
            navbar.addClass('scrolled');
            console.log('🔽 Navigation en mode scrolled');
          }
        } else {
          if (navbar.hasClass('scrolled')) {
            navbar.removeClass('scrolled sleep');
            console.log('🔼 Navigation en mode normal');
          }
        }
        
        if (st > 350) {
          if (!navbar.hasClass('awake')) {
            navbar.addClass('awake');
          }
        } else {
          if (navbar.hasClass('awake')) {
            navbar.removeClass('awake');
            navbar.addClass('sleep');
          }
        }
      });
    } else {
      // Version Vanilla JS comme fallback
      let isScrolling = false;
      
      window.addEventListener('scroll', function() {
        if (!isScrolling) {
          window.requestAnimationFrame(function() {
            const st = window.pageYOffset || document.documentElement.scrollTop;
            const navbar = document.querySelector('#ftco-navbar') || document.querySelector('.ftco-navbar-light');
            
            if (navbar) {
              if (st > 150) {
                if (!navbar.classList.contains('scrolled')) {
                  navbar.classList.add('scrolled');
                  console.log('🔽 Navigation en mode scrolled (vanilla)');
                }
              } else {
                if (navbar.classList.contains('scrolled')) {
                  navbar.classList.remove('scrolled', 'sleep');
                  console.log('🔼 Navigation en mode normal (vanilla)');
                }
              }
              
              if (st > 350) {
                if (!navbar.classList.contains('awake')) {
                  navbar.classList.add('awake');
                }
              } else {
                if (navbar.classList.contains('awake')) {
                  navbar.classList.remove('awake');
                  navbar.classList.add('sleep');
                }
              }
            }
            
            isScrolling = false;
          });
        }
        isScrolling = true;
      }, { passive: true });
    }
    
    console.log('✅ Navigation sticky initialisée');
  }
})();
