<template>
  <div class="q-pa-md q-gutter-sm">
    <q-breadcrumbs>
      <q-breadcrumbs-el label="Admin" icon="home" to="/admin" />
      <q-breadcrumbs-el label="News" icon="double_arrow" />
    </q-breadcrumbs>
  </div>
  <q-page padding>
    <!-- content -->
    <q-toolbar class="bg-primary text-white shadow-2">
      <q-toolbar-title>News List</q-toolbar-title>
    </q-toolbar>
    <q-toolbar class="text-primary">
      <q-toolbar-title>Action</q-toolbar-title>
      <q-btn
        icon="add"
        color="primary"
        label="New News"
        @click="redirectToName('AdminNewsNewPage')"
      />
    </q-toolbar>

    <q-list bordered padding class="rounded-borders">
      <div v-for="item in newsList" :key="item.date">
        <q-item clickable v-ripple @click="redirectToEdit(item.id)">
          <q-item-section avatar top>
            <q-avatar icon="folder" color="primary" text-color="white" />
          </q-item-section>

          <q-item-section>
            <q-item-label lines="1">{{ item.title }}</q-item-label>
            <q-item-label caption>{{ item.date }}</q-item-label>
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
  name: "AdminNewsListPage",

  data() {
    return {
      newsCollection: collection(firebaseFirestore, "news"),
      newsList: [],
    };
  },

  methods: {
    loadNewsListData() {
      onSnapshot(
        query(this.newsCollection, orderBy("date", "desc")),
        (snapshot) => {
          this.newsList = [];
          snapshot.forEach((doc) => {
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

            this.newsList.push(convertData);
          });
        }
      );
    },

    redirectToName(urlTagName) {
      this.$router.push({ name: urlTagName });
    },

    redirectToEdit(id) {
      this.$router.push({
        path: "/admin/news/" + id + "/edit",
      });
    },
  },

  setup() {
    checkForAdminAccount();

    useMeta(() => {
      return {
        title: "Onur Kol Web Page - Admin - News",
      };
    });
  },

  mounted() {
    this.loadNewsListData();
  },
};
</script>
