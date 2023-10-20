<template>
  <div class="q-pa-md q-gutter-sm">
    <q-breadcrumbs>
      <q-breadcrumbs-el label="Home" icon="home" />
    </q-breadcrumbs>
  </div>
  <q-page padding class="bg-image">
    <div class="bg-image-filter">
      <div class="text-white text-center q-pa-xl">
        <div>
          <div class="text-h3" style="opacity: 0.8">
            Welcome to my official web page.
          </div>
        </div>
      </div>
      <div class="q-px-lg q-py-md">
        <q-timeline color="purple">
          <q-timeline-entry class="text-h6 text-white" heading>
            Latest Updates
          </q-timeline-entry>

          <q-timeline-entry
            v-for="item in newsList"
            :key="item.date"
            class="text-white"
            :title="item.title"
            :subtitle="item.date"
            icon="done"
          >
            <div>
              {{ item.text }}
            </div>
          </q-timeline-entry>
        </q-timeline>
      </div>
    </div>
  </q-page>
</template>

<script>
import { useMeta } from "quasar";

import { firebaseFirestore } from "boot/firebase";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  limit,
} from "firebase/firestore";

export default {
  name: "IndexPage",

  data() {
    return {
      newsCollection: collection(firebaseFirestore, "news"),
      newsList: [],
    };
  },

  methods: {
    loadNewsListData() {
      onSnapshot(
        query(this.newsCollection, orderBy("date", "desc"), limit(4)),
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
  },

  setup() {
    useMeta(() => {
      return {
        title: "Onur Kol Web Page",
      };
    });
  },

  mounted() {
    this.loadNewsListData();
  },
};
</script>
