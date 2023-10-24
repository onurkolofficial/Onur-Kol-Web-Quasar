import { createI18n } from "vue-i18n";
import messages from "src/i18n";

import { LocalStorage } from "quasar";

export default ({ app }) => {
  // Check Default Language
  let defaultLanguage = "";
  const isSetLanguage = LocalStorage.has("lang");
  if (!isSetLanguage) LocalStorage.set("lang", "en-US");
  defaultLanguage = LocalStorage.getItem("lang");

  // Create I18n instance
  const i18n = createI18n({
    locale: defaultLanguage,
    legacy: false,
    globalInjection: true,
    messages,
  });

  // Tell app to use the I18n instance
  app.use(i18n);
};
