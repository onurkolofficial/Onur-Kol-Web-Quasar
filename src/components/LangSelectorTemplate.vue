<template>
  <div class="q-pa-md q-gutter-sm">
    <q-select
      v-model="locale"
      :options="localeOptions"
      :label="$t('main.language')"
      dense
      borderless
      map-options
      options-dense
      style="min-width: 150px"
    />
  </div>
</template>

<script>
import { LocalStorage } from "quasar";

export default {
  name: "LangSelectorTemplate",

  data() {
    return {
      locale: this.$i18n.locale,
      localeOptions: [
        { value: "en-US", label: this.$t("main.english") },
        { value: "tr-TR", label: this.$t("main.turkish") },
        { value: "de-DE", label: this.$t("main.german") },
      ],
    };
  },

  watch: {
    locale(lang) {
      this.$i18n.locale = lang.value;
      LocalStorage.set("lang", lang.value);
    },
  },
};
</script>
