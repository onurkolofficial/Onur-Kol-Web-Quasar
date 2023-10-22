<template>
  <div class="q-pa-md q-gutter-sm">
    <q-breadcrumbs active-color="accent">
      <q-breadcrumbs-el label="Admin" icon="home" to="/admin" />
      <q-breadcrumbs-el label="News" icon="double_arrow" to="/admin/news" />
      <q-breadcrumbs-el label="Edit" icon="edit" />
    </q-breadcrumbs>
  </div>
  <q-page padding>
    <!-- content -->
    <q-toolbar class="bg-primary text-white shadow-2">
      <q-toolbar-title>Edit News</q-toolbar-title>
    </q-toolbar>

    <q-card class="q-ma-xl">
      <div class="row">
        <div class="col-0 col-sm-5 bg-primary rounded-left-borders xs-hide">
          <div
            class="row full-width q-px-xl q-pb-xl full-height flex flex-center"
          >
            <div class="">
              <div
                class="text-h4 text-uppercase text-white fredoka"
                style="min-width: 220px"
              >
                {{ newsTitle }}
              </div>
              <div class="text-white q-my-sm text-subtitle1">
                {{ newsId }}
              </div>
            </div>
          </div>
        </div>

        <div class="col-12 col-sm-7">
          <div class="row q-pa-sm-sm q-pa-md">
            <div class="col-12">
              <q-card-section>
                <q-card
                  flat
                  bordered
                  class="my-card"
                  :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2'"
                >
                  <q-card-section>
                    <div class="row items-center no-wrap">
                      <div class="col">
                        <div class="text-h6 text-primary">Edit News</div>
                        <div class="text-subtitle2 text-primary">
                          {{ newsId }}
                        </div>
                      </div>

                      <div class="col-auto">
                        <q-btn color="grey-7" round flat icon="more_vert">
                          <q-menu fit auto-close>
                            <q-list>
                              <q-item
                                class="text-red"
                                clickable
                                @click="deleteNews()"
                              >
                                <q-item-section>Delete News</q-item-section>
                              </q-item>
                            </q-list>
                          </q-menu>
                        </q-btn>
                      </div>
                    </div>
                  </q-card-section>

                  <q-card-section>
                    <q-form class="q-gutter-md">
                      <q-input v-model="news.id" label="News Id" />
                      <q-input v-model="news.title" label="News Title" />
                      <q-input v-model="news.text" label="News Text" />
                    </q-form>
                  </q-card-section>

                  <q-separator />

                  <q-card-actions>
                    <q-btn @click="updateNews()" flat color="primary"
                      >Save Settings</q-btn
                    >
                    <q-btn @click="redirectToName('AdminNewsListPage')" flat
                      >Cancel</q-btn
                    >
                  </q-card-actions>
                </q-card>
              </q-card-section>
            </div>
          </div>
        </div>
      </div>
    </q-card>
  </q-page>
</template>

<script>
import { reactive } from "vue";
import { useMeta } from "quasar";

import { firebaseFirestore } from "boot/firebase";
import {
  collection,
  onSnapshot,
  query,
  where,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import checkForAdminAccount from "src/services/account/check-admin.js";

const news = reactive({
  id: null,
  title: null,
  text: null,
});

export default {
  name: "AdminNewsEditPage",

  data() {
    return {
      newsCollection: collection(firebaseFirestore, "news"),
      newsId: this.$route.params.nid,
      newsTitle: null,
      newsText: null,
      docId: null,
    };
  },

  methods: {
    loadNewsData() {
      onSnapshot(
        query(this.newsCollection, where("id", "==", this.newsId)),
        (snapshot) => {
          snapshot.forEach((doc) => {
            console.log(doc.data());
            this.docId = doc.id;
            this.newsId = doc.data().id;
            this.newsTitle = doc.data().title;
            this.newsText = doc.data().text;
          });

          news.id = this.newsId;
          news.title = this.newsTitle;
          news.text = this.newsText;
        }
      );
    },

    updateNews() {
      const docRef = doc(firebaseFirestore, "news/" + this.docId);
      updateDoc(docRef, "id", news.id);
      updateDoc(docRef, "title", news.title);
      updateDoc(docRef, "text", news.text);
      this.redirectToName("AdminNewsListPage");
    },

    deleteNews() {
      const docRef = doc(firebaseFirestore, "news/" + this.docId);
      deleteDoc(docRef).then(() => {
        this.redirectToName("AdminNewsListPage");
      });
    },

    redirectToLink(url) {
      this.$router.push({ path: url });
    },

    redirectToName(urlTagName) {
      this.$router.push({ name: urlTagName });
    },
  },

  setup() {
    checkForAdminAccount();

    useMeta(() => {
      return {
        title: "Onur Kol Web Page - Admin - Edit",
      };
    });

    return { news };
  },

  mounted() {
    this.loadNewsData();
  },
};
</script>
