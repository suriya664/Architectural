(function () {
  "use strict";

  const themeToggle = document.getElementById("themeToggle");
  const langToggle = document.getElementById("langToggle");
  const root = document.documentElement;
  const bootstrapLink = document.getElementById("bootstrapCss");
  const rtlStylesheet = document.getElementById("rtlStylesheet");

  const applyTheme = (theme) => {
    root.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    if (themeToggle) {
      themeToggle.setAttribute("aria-pressed", theme === "dark");
    }
  };

  const applyRtl = (isRtl) => {
    root.setAttribute("dir", isRtl ? "rtl" : "ltr");
    root.setAttribute("lang", isRtl ? "ar" : "en");
    localStorage.setItem("dir", isRtl ? "rtl" : "ltr");
    if (bootstrapLink) {
      bootstrapLink.href = isRtl
        ? "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.rtl.min.css"
        : "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css";
    }
    if (rtlStylesheet) {
      rtlStylesheet.disabled = !isRtl;
    }
    if (langToggle) {
      langToggle.setAttribute("aria-pressed", isRtl);
    }
  };

  const storedTheme = localStorage.getItem("theme") || "light";
  const storedDir = localStorage.getItem("dir") || "ltr";
  applyTheme(storedTheme);
  applyRtl(storedDir === "rtl");

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
    });
  }

  if (langToggle) {
    langToggle.addEventListener("click", () => {
      const isRtl = root.getAttribute("dir") !== "rtl";
      applyRtl(isRtl);
    });
  }
})();
