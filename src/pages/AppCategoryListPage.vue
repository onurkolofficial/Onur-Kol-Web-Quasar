<template>
  <div class="q-pa-md q-gutter-sm">
    <q-breadcrumbs>
      <q-breadcrumbs-el label="Home" icon="home" to="/" />
      <q-breadcrumbs-el label="Apps" icon="double_arrow" />
    </q-breadcrumbs>
  </div>
  <q-page padding>
    <!-- content -->
    <q-toolbar class="bg-primary text-white shadow-2">
      <q-toolbar-title>Application Category</q-toolbar-title>
    </q-toolbar>

    <q-list bordered padding class="rounded-borders">
      <div v-for="item in categoryList" :key="item.id">
        <q-item clickable v-ripple @click="redirectAppList(item.id)">
          <q-item-section avatar top>
            <q-avatar icon="folder" color="primary" text-color="white" />
          </q-item-section>

          <q-item-section>
            <q-item-label lines="1">{{ item.name }}</q-item-label>
            <q-item-label caption>{{
              item.type == "app"
                ? "Application"
                : item.type == "game"
                ? "Game"
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
import { ref } from "vue";
import { useMeta } from "quasar";

import { firebaseFirestore } from "boot/firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

let categoryId = ref(null);

export default {
  name: "AppCategoryPage",

  data() {
    return {
      categoryCollection: collection(firebaseFirestore, "appCategory"),
      categoryList: [],
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
          });
        }
      );
    },

    redirectAppList(id) {
      this.$router.push({
        path: "/apps/" + id,
      });
      /*
      // Alternative: Using history state.
      // For Details: 'AppListPage.vue' - data()
      // and check routes.js
      this.$router.push({
        name: 'AppListPage',
        state: { categoryId: id, categoryName: name },
      });
      */
    },
  },

  setup() {
    useMeta(() => {
      return {
        title: "Onur Kol Web Page - Category",
      };
    });
  },

  mounted() {
    this.loadCategoryListData();
  },
};
</script>
