/* global AOS */
(function ($) {
  "use strict";

  const initAos = () => {
    if (typeof AOS !== "undefined") {
      AOS.init({ duration: 800, once: true });
    }
  };

  const initStickyHeader = () => {
    const $nav = $(".navbar");
    if (!$nav.length) return;
    const toggleClass = () => {
      $nav.toggleClass("is-scrolled", window.scrollY > 40);
    };
    toggleClass();
    window.addEventListener("scroll", toggleClass, { passive: true });
  };

  const initBackToTop = () => {
    const $btn = $(".back-to-top");
    if (!$btn.length) return;
    $(window).on("scroll", () => {
      $btn.toggle($(window).scrollTop() > 400);
    });
    $btn.on("click", (e) => {
      e.preventDefault();
      $("html, body").animate({ scrollTop: 0 }, 600);
    });
  };

  const initSmoothScroll = () => {
    $("a[href^=\"#\"]").on("click", function (e) {
      const target = $(this.getAttribute("href"));
      if (!target.length) return;
      e.preventDefault();
      $("html, body").animate({ scrollTop: target.offset().top - 80 }, 600);
    });
  };

  const initCounters = () => {
    const $counters = $("[data-count]");
    if (!$counters.length) return;
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const $el = $(entry.target);
          const end = parseInt($el.data("count"), 10);
          let current = 0;
          const step = Math.max(1, Math.floor(end / 80));
          const timer = setInterval(() => {
            current += step;
            if (current >= end) {
              current = end;
              clearInterval(timer);
            }
            $el.text(current.toLocaleString());
          }, 20);
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.4 }
    );
    $counters.each((_, el) => observer.observe(el));
  };

  const initLightbox = () => {
    if ($.fn.magnificPopup) {
      $(".portfolio-lightbox").magnificPopup({
        type: "image",
        gallery: { enabled: true },
      });
    }
  };

  const initCarousels = () => {
    if ($.fn.owlCarousel) {
      $(".testimonials-carousel").owlCarousel({
        items: 1,
        loop: true,
        margin: 20,
        autoplay: true,
        autoplayTimeout: 5000,
        dots: true,
      });

      $(".case-studies-carousel").owlCarousel({
        items: 2,
        loop: true,
        margin: 24,
        autoplay: true,
        responsive: {
          0: { items: 1 },
          992: { items: 2 },
        },
      });

      $(".logo-carousel").owlCarousel({
        items: 4,
        loop: true,
        margin: 16,
        autoplay: true,
        responsive: {
          0: { items: 2 },
          768: { items: 3 },
          992: { items: 4 },
        },
      });
    }
  };

  const initIsotope = () => {
    if (!window.Isotope) return;
    const $grid = $(".portfolio-grid, .services-grid");
    if (!$grid.length) return;
    const iso = new Isotope(".portfolio-grid, .services-grid", {
      itemSelector: ".grid-item",
      layoutMode: "fitRows",
    });
    $(".filter-btn").on("click", function () {
      const filterValue = $(this).data("filter");
      iso.arrange({ filter: filterValue });
      $(".filter-btn").removeClass("active");
      $(this).addClass("active");
    });
  };

  const initTabsToggle = () => {
    $(".pricing-toggle input").on("change", function () {
      const isAnnual = $(this).is(":checked");
      $("[data-monthly]").toggleClass("d-none", isAnnual);
      $("[data-annual]").toggleClass("d-none", !isAnnual);
    });
  };

  const initServiceViewToggle = () => {
    $(".view-toggle").on("click", function () {
      const view = $(this).data("view");
      $(".view-toggle").removeClass("active");
      $(this).addClass("active");
      const $grid = $(".services-view");
      if (!$grid.length) return;
      if (view === "list") {
        $grid.find(".grid-item").removeClass("col-lg-4").addClass("col-12");
      } else {
        $grid.find(".grid-item").addClass("col-lg-4").removeClass("col-12");
      }
    });
  };

  const initMultiStepForm = () => {
    const $form = $(".multi-step-form");
    if (!$form.length) return;
    let step = 0;
    const $steps = $form.find(".form-step");
    const update = () => {
      $steps.removeClass("active").eq(step).addClass("active");
      $form.find(".step-indicator").each((idx, el) => {
        $(el).toggleClass("active", idx <= step);
      });
    };
    $form.on("click", "[data-step-next]", (e) => {
      e.preventDefault();
      step = Math.min(step + 1, $steps.length - 1);
      update();
    });
    $form.on("click", "[data-step-prev]", (e) => {
      e.preventDefault();
      step = Math.max(step - 1, 0);
      update();
    });
    update();
  };

  const initReadingProgress = () => {
    const $bar = $(".progress-reading");
    if (!$bar.length) return;
    window.addEventListener("scroll", () => {
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrolled = (window.scrollY / docHeight) * 100;
      $bar.css("width", `${scrolled}%`);
    });
  };

  const initToast = () => {
    $(".toast-trigger").on("submit", function (e) {
      e.preventDefault();
      const toastEl = document.getElementById("formToast");
      if (toastEl && window.bootstrap) {
        const toast = new window.bootstrap.Toast(toastEl);
        toast.show();
      }
      this.reset();
    });
  };

  const initCountdown = () => {
    const countdown = document.querySelector("[data-countdown]");
    if (!countdown) return;
    const target = new Date(countdown.getAttribute("data-countdown")).getTime();
    const update = () => {
      const now = Date.now();
      const distance = Math.max(target - now, 0);
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((distance / (1000 * 60)) % 60);
      const seconds = Math.floor((distance / 1000) % 60);
      countdown.querySelector("[data-days]").textContent = String(days).padStart(2, "0");
      countdown.querySelector("[data-hours]").textContent = String(hours).padStart(2, "0");
      countdown.querySelector("[data-minutes]").textContent = String(minutes).padStart(2, "0");
      countdown.querySelector("[data-seconds]").textContent = String(seconds).padStart(2, "0");
    };
    update();
    setInterval(update, 1000);
  };

  $(document).ready(() => {
    initAos();
    initStickyHeader();
    initBackToTop();
    initSmoothScroll();
    initCounters();
    initLightbox();
    initCarousels();
    initIsotope();
    initTabsToggle();
    initServiceViewToggle();
    initMultiStepForm();
    initReadingProgress();
    initToast();
    initCountdown();
  });
})(jQuery);
