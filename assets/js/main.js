/**
 * Template Name: iPortfolio
 * Updated: May 30 2023 with Bootstrap v5.3.0
 * Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */
(function () {
  "use strict";

  /**
   * Dark mode toggle (saved in localStorage, persists across pages)
   */
  const STORAGE_KEY = "darkMode";
  function isDarkMode() {
    return document.body.classList.contains("dark-mode");
  }
  function setDarkMode(enabled) {
    if (enabled) {
      document.body.classList.add("dark-mode");
      localStorage.setItem(STORAGE_KEY, "true");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem(STORAGE_KEY, "false");
    }
    updateDarkModeIcon();
  }
  function updateDarkModeIcon() {
    const bi = document.getElementById("dark-mode-toggle");
    if (!bi) return;
    // Element can be the <i> itself or a button containing <i>
    const icon = bi.tagName === "I" ? bi : bi.querySelector("i");
    if (!icon) return;
    if (isDarkMode()) {
      icon.classList.remove("bi-moon-stars-fill");
      icon.classList.add("bi-sun-fill");
      bi.setAttribute("title", "Light mode");
      bi.setAttribute("aria-label", "Switch to light mode");
    } else {
      icon.classList.remove("bi-sun-fill");
      icon.classList.add("bi-moon-stars-fill");
      bi.setAttribute("title", "Dark mode");
      bi.setAttribute("aria-label", "Toggle dark mode");
    }
  }
  window.addEventListener("DOMContentLoaded", function () {
    updateDarkModeIcon();
    const bi = document.getElementById("dark-mode-toggle");
    if (bi) {
      bi.addEventListener("click", function () {
        setDarkMode(!isDarkMode());
      });
    }
  });

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener);
  };

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select("#navbar .scrollto", true);
  const navbarlinksActive = () => {
    let position = window.scrollY + 200;
    navbarlinks.forEach((navbarlink) => {
      if (!navbarlink.hash) return;
      let section = select(navbarlink.hash);
      if (!section) return;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        navbarlink.classList.add("active");
      } else {
        navbarlink.classList.remove("active");
      }
    });
  };
  window.addEventListener("load", navbarlinksActive);
  onscroll(document, navbarlinksActive);

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop;
    window.scrollTo({
      top: elementPos,
      behavior: "smooth",
    });
  };

  /**
   * Back to top button
   */
  let backtotop = select(".back-to-top");
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add("active");
      } else {
        backtotop.classList.remove("active");
      }
    };
    window.addEventListener("load", toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  /**
   * Mobile nav toggle
   */
  on("click", ".mobile-nav-toggle", function (e) {
    select("body").classList.toggle("mobile-nav-active");
    this.classList.toggle("bi-list");
    this.classList.toggle("bi-x");
  });

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on(
    "click",
    ".scrollto",
    function (e) {
      if (select(this.hash)) {
        e.preventDefault();

        let body = select("body");
        if (body.classList.contains("mobile-nav-active")) {
          body.classList.remove("mobile-nav-active");
          let navbarToggle = select(".mobile-nav-toggle");
          navbarToggle.classList.toggle("bi-list");
          navbarToggle.classList.toggle("bi-x");
        }
        scrollto(this.hash);
      }
    },
    true
  );

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener("load", () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash);
      }
    }
  });

  /**
   * Hero type effect
   */
  const typed = select(".typed");
  if (typed) {
    let typed_strings = typed.getAttribute("data-typed-items");
    typed_strings = typed_strings.split(",");
    new Typed(".typed", {
      strings: typed_strings,
      loop: true,
      // type: 1000,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000,
    });
  }

  /**
   * Skills animation
   */
  let skilsContent = select(".skills-content");
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: "80%",
      handler: function (direction) {
        let progress = select(".progress .progress-bar", true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute("aria-valuenow") + "%";
        });
      },
    });
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener("load", () => {
    let portfolioContainer = select(".portfolio-container");
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: ".portfolio-item",
      });

      let portfolioFilters = select("#portfolio-flters li", true);

      // SET DEFAULT FILTER TO '*'
      portfolioFilters.forEach(function (el) {
        el.classList.remove("filter-active");
      });
      // Pilih filter pertama (All)
      if (portfolioFilters.length > 0) {
        portfolioFilters[0].classList.add("filter-active");
        portfolioIsotope.arrange({ filter: "*" });
      }
      // Inisialisasi lightbox sesuai default
      portfolioIsotope.on("arrangeComplete", function () {
        AOS.refresh();
        initPortfolioLightbox();
      });
      // Panggil lightbox pertama kali
      initPortfolioLightbox();

      on(
        "click",
        "#portfolio-flters li",
        function (e) {
          e.preventDefault();
          portfolioFilters.forEach(function (el) {
            el.classList.remove("filter-active");
          });
          this.classList.add("filter-active");

          portfolioIsotope.arrange({
            filter: this.getAttribute("data-filter"),
          });
          // Lightbox akan diinisialisasi ulang di arrangeComplete
        },
        true
      );
    }
  });

  let portfolioLightbox = null;

  function initPortfolioLightbox() {
    if (portfolioLightbox) {
      portfolioLightbox.destroy();
    }
    // Tentukan filter aktif
    let activeFilter = document.querySelector('#portfolio-flters .filter-active');
    let selector = '';
    if (activeFilter) {
      const filter = activeFilter.getAttribute('data-filter');
      if (filter === '*') {
        selector = '.portfolio-item .portfolio-lightbox';
      } else if (filter === '.filter-web') {
        selector = '.portfolio-item.filter-web .portfolio-lightbox';
      } else if (filter === '.filter-achievements') {
        selector = '.portfolio-item.filter-achievements .portfolio-lightbox';
      } else if (filter === '.filter-other') {
        // Hanya item yang bukan web dan achievements
        selector = '.portfolio-item.filter-other .portfolio-lightbox';
      } else {
        // fallback ke visible
        selector = '.portfolio-item:not([style*="display: none"]) .portfolio-lightbox';
      }
    } else {
      selector = '.portfolio-item:not([style*="display: none"]) .portfolio-lightbox';
    }
    portfolioLightbox = GLightbox({
      selector: selector
    });
  }

  /**
   * Portfolio details slider
   */
  new Swiper(".portfolio-details-slider", {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
  });

  /**
   * Testimonials slider
   */
  new Swiper(".testimonials-slider", {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    slidesPerView: "auto",
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
    },
  });

  /**
   * Animation on scroll
   */
  window.addEventListener("load", () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: false,
      mirror: false,
    });
  });

  /**
   * Preloader
   */
  let preloader = select("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  function hidePortfolioLoaderWhenImagesLoaded(containerSelector, loaderSelector) {
    const container = document.querySelector(containerSelector);
    const loader = document.querySelector(loaderSelector);
    if (!container || !loader) return;

    const images = container.querySelectorAll('img');
    let loaded = 0;
    if (images.length === 0) {
      loader.style.display = 'none';
      return;
    }
    images.forEach(img => {
      if (img.complete) {
        loaded++;
        if (loaded === images.length) loader.style.display = 'none';
      } else {
        img.addEventListener('load', () => {
          loaded++;
          if (loaded === images.length) loader.style.display = 'none';
        });
        img.addEventListener('error', () => {
          loaded++;
          if (loaded === images.length) loader.style.display = 'none';
        });
      }
    });
  }

  // Untuk index.html (portofolio grid)
  window.addEventListener('DOMContentLoaded', function() {
    hidePortfolioLoaderWhenImagesLoaded('.portfolio-container', '#portfolio-loader');
  });

  // Untuk portfolio-details-siadu.html (misal slider)
  window.addEventListener('DOMContentLoaded', function() {
    hidePortfolioLoaderWhenImagesLoaded('.portfolio-details-slider', '#portfolio-loader');
  });
})();
