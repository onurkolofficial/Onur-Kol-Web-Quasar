<template>
  <div class="q-pa-md q-gutter-sm">
    <q-breadcrumbs active-color="accent">
      <q-breadcrumbs-el :label="$t('navigation.home')" icon="home" to="/" />
      <q-breadcrumbs-el
        :label="$t('navigation.apps')"
        icon="double_arrow"
        to="/apps"
      />
      <q-breadcrumbs-el :label="categoryName" icon="double_arrow" />
    </q-breadcrumbs>
  </div>
  <div>
    <LangSelectorTemplate />
  </div>
  <q-page padding>
    <!-- content -->
    <q-toolbar class="bg-primary text-white shadow-2">
      <q-toolbar-title
        >{{
          categoryType == "app"
            ? $t("apps.applicationText")
            : categoryType == "game"
            ? $t("apps.gameText")
            : categoryType
        }}
        / {{ categoryName }}</q-toolbar-title
      >
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
      <div v-for="item in appList" :key="item.id">
        <q-item
          clickable
          v-ripple
          @click="redirectAppDetail(categoryId, item.id)"
        >
          <q-item-section avatar top>
            <q-avatar icon="folder" color="primary" text-color="white" />
          </q-item-section>

          <q-item-section>
            <q-item-label lines="1">{{ item.name }}</q-item-label>
            <q-item-label caption>{{ item.date }}</q-item-label>
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
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
} from "firebase/firestore";

import LangSelectorTemplate from "components/LangSelectorTemplate.vue";

export default {
  name: "AppListPage",

  components: {
    LangSelectorTemplate,
  },

  data() {
    return {
      categoryCollection: collection(firebaseFirestore, "appCategory"),
      appCollection: collection(firebaseFirestore, "appData"),
      categoryId: this.$route.params.cid,
      categoryName: null,
      categoryType: null,
      appList: [],
      isLoadedList: false,
    };
  },

  methods: {
    loadAppListData() {
      onSnapshot(
        query(this.appCollection, orderBy("date", "desc")),
        (snapshot) => {
          this.appList = [];
          snapshot.forEach((doc) => {
            if (this.categoryId == doc.data().categoryId) {
              const convertData = doc.data();

              // Convert Date
              const getDate = new Date(convertData.date.seconds * 1000);
              let year = getDate.getFullYear();
              let month = "";
              let cMonth = getDate.getMonth() + 1;
              let day = getDate.getDate();
              let hours = "";
              let cHours = getDate.getHours();
              let minutes = "";
              let cMinutes = getDate.getMinutes();
              if (cMonth <= 9) month = "0" + cMonth;
              else month = cMonth;
              if (cHours <= 9) hours = "0" + cHours;
              else hours = cHours;
              if (cMinutes <= 9) minutes = "0" + cMinutes;
              else minutes = cMinutes;

              convertData.date =
                day + "/" + month + "/" + year + ", " + hours + ":" + minutes;

              this.appList.push(convertData);
              this.isLoadedList = true;
            }
          });
        }
      );
    },

    getCategoryData() {
      onSnapshot(
        query(this.categoryCollection, where("id", "==", this.categoryId)),
        (snapshot) => {
          snapshot.forEach((doc) => {
            this.categoryName = doc.data().name;
            this.categoryType = doc.data().type;
          });
        }
      );
    },

    redirectAppDetail(categoryId, appId) {
      this.$router.push({
        path: "/apps/" + categoryId + "/" + appId,
      });
    },
  },

  setup() {
    const { t } = useI18n({ useScope: "global" });

    useMeta(() => {
      return {
        title: t("main.webTitle") + " - " + t("navigation.appsCaption"),
      };
    });
  },

  mounted() {
    this.loadAppListData();
    this.getCategoryData();
  },
};
</script>
