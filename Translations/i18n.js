// Sample translations
const EnTranslation = {
  firstScreen: {
    firstApplication: "The First Application For Direct Calls",
    secondParagraph: "With Your Favorite Star",
    availableOn: "Available On",
    reserveCall: "RESERVE A CALL",
    facebook: "FACEBOOK",
    insta: "INSTAGRAM",
    youtube: "YOUTUBE",
    tiktok: "TIK TOK",
  },
};
const arTranslation = {
  firstScreen: {
    firstApplication: "اول تطبيق للإتصال المباشر",
    secondParagraph: "بنجمك المفضل",
    availableOn: "متوفر علي",
    reserveCall: "احجز مكالمة معي",
    facebook: "فيسبوك",
    insta: "انستجرام",
    youtube: "يوتيوب",
    tiktok: "تيك توك",
  },
};

// Resources object
const resources = {
  en: {
    translation: EnTranslation,
  },
  ar: {
    translation: arTranslation,
  },
};

// i18n initialization function
function initI18n() {
  const i18n = {
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  };

  return i18n;
}

// Initialize i18n
const i18n = initI18n();

// Sample usage:
console.log(i18n.t("firstScreen.firstApplication"));
