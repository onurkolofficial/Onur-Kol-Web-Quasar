<template>
  <div class="q-pa-md q-gutter-sm">
    <q-breadcrumbs>
      <q-breadcrumbs-el label="Home" icon="home" to="/" />
      <q-breadcrumbs-el label="Apps" icon="double_arrow" to="/apps" />
      <q-breadcrumbs-el label="Category" icon="double_arrow" />
    </q-breadcrumbs>
  </div>
  <q-page padding>
    <!-- content -->
    <q-toolbar class="bg-primary text-white shadow-2">
      <q-toolbar-title>Applications / {{ categoryName }}</q-toolbar-title>
    </q-toolbar>

    <q-list bordered padding class="rounded-borders">
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
            <q-item-label caption>February 22nd, 2019</q-item-label>
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
import { ref } from 'vue';
import { useMeta } from 'quasar';

import { firebaseApp, firebaseFirestore } from 'boot/firebase';
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
} from 'firebase/firestore';

export default {
  name: 'AppListPage',

  data() {
    // If using state method to write 'history.state.VARIABLE_NAME'
    return {
      categoryCollection: collection(firebaseFirestore, 'appCategory'),
      appCollection: collection(firebaseFirestore, 'appData'),
      categoryId: this.$route.params.cid,
      categoryName: null,
      appList: [],
    };
  },

  methods: {
    loadAppListData() {
      onSnapshot(
        query(this.appCollection, orderBy('id', 'asc')),
        (snapshot) => {
          this.appList = [];
          snapshot.forEach((doc) => {
            if (this.categoryId == doc.data().categoryId)
              this.appList.push(doc.data());
          });
        }
      );
    },

    getCategoryData() {
      onSnapshot(
        query(this.categoryCollection, where('id', '==', this.categoryId)),
        (snapshot) => {
          snapshot.forEach((doc) => {
            this.categoryName = doc.data().name;
          });
        }
      );
    },

    redirectAppDetail(categoryId, appId) {
      this.$router.push({
        path: '/apps/' + categoryId + '/' + appId,
      });
      /*
      // State, Details: AppCategoryList.vue - redirectAppList()
      this.$router.push({
        name: 'AppDetailPage',
        state: {
          categoryId: categoryId,
          categoryName: categoryName,
          appId: id,
          appName: name,
          appVersion: version,
          appDownload: downloadUrl,
          appSource: sourceUrl,
        },
      });
      */
    },
  },

  setup() {
    useMeta(() => {
      return {
        title: 'Onur Kol Web Page - App List',
      };
    });
  },

  mounted() {
    this.loadAppListData();
    this.getCategoryData();
  },
};
</script>
