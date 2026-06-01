const LANGUAGE_STORAGE_KEY = "siteLanguage";
const LANGUAGE_FILES = {
  id: "assets/i18n/indonesia.json",
  en: "assets/i18n/english.json",
};
const LANGUAGE_LABELS = {
  id: "ID",
  en: "EN",
};

function getSavedLanguage() {
  const lang = localStorage.getItem(LANGUAGE_STORAGE_KEY);
  return lang === "en" ? "en" : "id";
}

function updateLanguageDropdownLabel(lang) {
  const label = document.getElementById("language-dropdown-label");
  const flag = document.getElementById("language-dropdown-flag");
  const flagCode = lang === "en" ? "us" : lang;

  if (flag) {
    flag.className = `fi fi-${flagCode}`;
  }

  if (label) {
    label.textContent = LANGUAGE_LABELS[lang] || lang.toUpperCase();
  }
}

function resolveTranslation(translations, key) {
  return key.split(".").reduce((obj, part) => {
    return obj && obj[part] !== undefined ? obj[part] : null;
  }, translations);
}

function applyTranslations(translations, lang) {
  document.documentElement.lang = lang === "en" ? "en" : "id";

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    const translation = resolveTranslation(translations, key);
    if (translation !== null) {
      element.textContent = translation;
    }
  });

  document.querySelectorAll("[data-i18n-title]").forEach((element) => {
    const key = element.dataset.i18nTitle;
    const translation = resolveTranslation(translations, key);
    if (translation !== null) {
      element.setAttribute("title", translation);
    }
  });
}

async function loadLanguage(lang) {
  try {
    const file = LANGUAGE_FILES[lang] || LANGUAGE_FILES.id;
    const response = await fetch(file);
    if (!response.ok) {
      throw new Error(`Unable to load language file: ${file}`);
    }
    const translations = await response.json();
    applyTranslations(translations, lang);
    updateLanguageDropdownLabel(lang);
  } catch (error) {
    console.error(error);
  }
}

function setLanguage(lang) {
  localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
  updateLanguageDropdownLabel(lang);
  loadLanguage(lang);
}

function initLanguage() {
  const lang = getSavedLanguage();
  updateLanguageDropdownLabel(lang);
  loadLanguage(lang);

  document.querySelectorAll("[data-lang]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const selectedLang = event.currentTarget.getAttribute("data-lang");
      if (selectedLang) {
        setLanguage(selectedLang);
      }
    });
  });
}

window.addEventListener("DOMContentLoaded", initLanguage);
