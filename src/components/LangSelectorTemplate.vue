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

  <!-- Dialog for Reload Page -->
  <q-dialog v-model="reloadPageDialog">
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="translate" color="primary" text-color="white" />
        <span class="q-ml-sm"> {{ $t("dialogs.reloadPageQuestText") }}</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          flat
          :label="$t('dialogs.cancelText')"
          color="primary"
          v-close-popup
        />
        <q-btn
          flat
          :label="$t('dialogs.refreshText')"
          color="primary"
          v-close-popup
          @click="refreshPage()"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref } from "vue";
import { LocalStorage } from "quasar";

export default {
  name: "LangSelectorTemplate",

  methods: {
    refreshPage() {
      window.location.reload();
    },
  },

  data() {
    return {
      locale: this.$i18n.locale,
      localeOptions: [
        { value: "en-US", label: this.$t("main.english") },
        { value: "tr-TR", label: this.$t("main.turkish") },
        { value: "de-DE", label: this.$t("main.german") },
      ],
      reloadPageDialog: ref(false),
    };
  },

  watch: {
    locale(lang) {
      this.$i18n.locale = lang.value;
      LocalStorage.set("lang", lang.value);

      this.reloadPageDialog = true;
    },
  },
};
</script>
