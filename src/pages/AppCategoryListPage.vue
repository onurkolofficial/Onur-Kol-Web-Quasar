<template>
  <div class="q-pa-md q-gutter-sm">
    <q-breadcrumbs active-color="accent">
      <q-breadcrumbs-el :label="$t('navigation.home')" icon="home" to="/" />
      <q-breadcrumbs-el :label="$t('navigation.apps')" icon="double_arrow" />
    </q-breadcrumbs>
  </div>
  <div>
    <LangSelectorTemplate />
  </div>
  <q-page padding>
    <!-- content -->
    <q-toolbar class="bg-primary text-white shadow-2">
      <q-toolbar-title>{{ $t("apps.appCategoryText") }}</q-toolbar-title>
    </q-toolbar>

    <q-list bordered padding class="rounded-borders">
      <q-circular-progress
        v-if="!isLoadedList"
        indeterminate
        rounded
        size="50px"
        color="primary"
        class="q-ma-md center"
      />
      <div v-for="item in categoryList" :key="item.id">
        <q-item clickable v-ripple @click="redirectAppList(item.id)">
          <q-item-section avatar top>
            <q-avatar icon="folder" color="primary" text-color="white" />
          </q-item-section>

          <q-item-section>
            <q-item-label lines="1">{{ item.name }}</q-item-label>
            <q-item-label caption>{{
              item.type == "app"
                ? $t("apps.applicationText")
                : item.type == "game"
                ? $t("apps.gameText")
                : item.type
            }}</q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-icon name="info" />
          </q-item-section>
        </q-item>
      </div>
    </q-list>
  </q-page>
</template>

<script>
import { useI18n } from "vue-i18n";
import { useMeta } from "quasar";

import { firebaseFirestore } from "boot/firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

import LangSelectorTemplate from "components/LangSelectorTemplate.vue";

export default {
  name: "AppCategoryPage",

  components: {
    LangSelectorTemplate,
  },

  data() {
    return {
      categoryCollection: collection(firebaseFirestore, "appCategory"),
      categoryList: [],
      isLoadedList: false,
    };
  },

  methods: {
    loadCategoryListData() {
      onSnapshot(
        query(this.categoryCollection, orderBy("id", "asc")),
        (snapshot) => {
          this.categoryList = [];
          snapshot.forEach((doc) => {
            this.categoryList.push(doc.data());
            this.isLoadedList = true;
          });
        }
      );
    },

    redirectAppList(id) {
      this.$router.push({
        path: "/apps/" + id,
      });
    },
  },

  setup() {
    const { t } = useI18n({ useScope: "global" });

    useMeta(() => {
      return {
        title: t("main.webTitle") + " - " + t("navigation.apps"),
      };
    });
  },

  mounted() {
    this.loadCategoryListData();
  },
};
</script>
