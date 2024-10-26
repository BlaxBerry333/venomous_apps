export default function (i18nLangCode: string) {
  switch (i18nLangCode) {
    case "en":
      return "usa";
    case "ja":
      return "japan";
    case "zh":
      return "china";

    default:
      throw Error(`[404] cannot find country flag of ${i18nLangCode}`);
  }
}
