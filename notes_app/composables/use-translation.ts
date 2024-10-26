import type { LocaleObject } from "@nuxtjs/i18n";

export default function () {
  const i18n = useI18n();

  const supportedI18nLangs = computed<LocaleObject[]>(() => i18n.locales.value);

  const selectableI18nLangs = computed<LocaleObject[]>(() =>
    supportedI18nLangs.value.filter((lang) => lang.code !== i18n.locale.value),
  );

  const storedLang = useCookie<string>("language");

  function changeI18nLang(lang: string): void {
    storedLang.value = lang;
    i18n.setLocale(lang);
    i18n.setLocaleCookie(lang);
  }

  // ------------------------------------------------------------------------------------------

  onMounted(() => {
    if (storedLang.value) {
      i18n.locale.value = storedLang.value;
    }
  });

  return {
    t: i18n.t,
    currentLang: i18n.locale,
    supportedLangs: supportedI18nLangs,
    selectableLangs: selectableI18nLangs,
    changeLang: changeI18nLang,
  };
}
