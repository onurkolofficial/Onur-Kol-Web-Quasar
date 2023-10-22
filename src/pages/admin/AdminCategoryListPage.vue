<template>
  <div class="q-pa-md q-gutter-sm">
    <q-breadcrumbs active-color="accent">
      <q-breadcrumbs-el label="Admin" icon="home" to="/admin" />
      <q-breadcrumbs-el label="Category" icon="double_arrow" />
    </q-breadcrumbs>
  </div>
  <q-page padding>
    <!-- content -->
    <q-toolbar class="bg-primary text-white shadow-2">
      <q-toolbar-title>Category List</q-toolbar-title>
    </q-toolbar>
    <q-toolbar class="text-primary">
      <q-toolbar-title>Action</q-toolbar-title>
      <q-btn
        icon="add"
        color="primary"
        label="New Category"
        @click="redirectToName('AdminCategoryNewPage')"
      />
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
        <q-item clickable v-ripple @click="redirectToEdit(item.id)">
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
            <q-icon name="edit" />
          </q-item-section>
        </q-item>
      </div>
    </q-list>
  </q-page>
</template>

<script>
import { useMeta } from "quasar";

import { firebaseFirestore } from "boot/firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

import checkForAdminAccount from "src/services/account/check-admin.js";

export default {
  name: "AdminCategoryListPage",

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

    getCategoryData() {
      onSnapshot(
        query(this.categoryCollection, where("id", "==", this.categoryId)),
        (snapshot) => {
          snapshot.forEach((doc) => {
            this.categoryName = doc.data().name;
          });
        }
      );
    },

    redirectToName(urlTagName) {
      this.$router.push({ name: urlTagName });
    },

    redirectToEdit(id) {
      this.$router.push({
        path: "/admin/category/" + id + "/edit",
      });
    },
  },

  setup() {
    checkForAdminAccount();

    useMeta(() => {
      return {
        title: "Onur Kol Web Page - Admin - Category",
      };
    });
  },

  mounted() {
    this.loadCategoryListData();
  },
};
</script>
