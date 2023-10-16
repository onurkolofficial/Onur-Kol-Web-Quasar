<template>
  <div class="q-pa-md q-gutter-sm">
    <q-breadcrumbs>
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
      <div v-for="item in categoryList" :key="item.id">
        <q-item clickable v-ripple @click="redirectToEdit(item.id)">
          <q-item-section avatar top>
            <q-avatar icon="folder" color="primary" text-color="white" />
          </q-item-section>

          <q-item-section>
            <q-item-label lines="1">{{ item.name }}</q-item-label>
            <q-item-label caption>February 22nd, 2019</q-item-label>
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
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useMeta, useQuasar, LocalStorage } from 'quasar';

import { firebaseApp, firebaseFirestore } from 'boot/firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

import checkForAdminAccount from 'src/services/account/check-admin.js';

export default {
  name: 'AdminCategoryListPage',

  data() {
    return {
      categoryCollection: collection(firebaseFirestore, 'appCategory'),
      categoryList: [],
    };
  },

  methods: {
    loadCategoryListData() {
      onSnapshot(
        query(this.categoryCollection, orderBy('id', 'asc')),
        (snapshot) => {
          this.categoryList = [];
          snapshot.forEach((doc) => {
            this.categoryList.push(doc.data());
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

    redirectToName(urlTagName) {
      this.$router.push({ name: urlTagName });
    },

    redirectToEdit(id) {
      this.$router.push({
        path: '/admin/category/' + id + '/edit',
      });
    },
  },

  setup() {
    checkForAdminAccount();

    useMeta(() => {
      return {
        title: 'Onur Kol Web Page - Admin - Category',
      };
    });
  },

  mounted() {
    this.loadCategoryListData();
  },
};
</script>