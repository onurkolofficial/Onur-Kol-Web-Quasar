<template>
  <div class="q-pa-md q-gutter-sm">
    <q-breadcrumbs>
      <q-breadcrumbs-el label="Admin" icon="home" to="/admin" />
      <q-breadcrumbs-el label="Apps" icon="double_arrow" to="/admin/apps" />
      <q-breadcrumbs-el label="Edit" icon="edit" />
    </q-breadcrumbs>
  </div>
  <q-page padding>
    <!-- content -->
    <q-toolbar class="bg-primary text-white shadow-2">
      <q-toolbar-title>Edit Application</q-toolbar-title>
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
                {{ appName }}
              </div>
              <div class="text-white q-my-sm text-subtitle1">{{ appId }}</div>
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
                        <div class="text-h6 text-primary">Edit Application</div>
                        <div class="text-subtitle2 text-primary">
                          {{ appId }}
                        </div>
                      </div>

                      <div class="col-auto">
                        <q-btn color="grey-7" round flat icon="more_vert">
                          <q-menu fit auto-close>
                            <q-list>
                              <q-item
                                class="text-red"
                                clickable
                                @click="deleteApp()"
                              >
                                <q-item-section
                                  >Delete Application</q-item-section
                                >
                              </q-item>
                            </q-list>
                          </q-menu>
                        </q-btn>
                      </div>
                    </div>
                  </q-card-section>

                  <q-card-section>
                    <q-form class="q-gutter-md">
                      <q-input
                        v-model="app.name"
                        label="Application Name"
                        name="appName"
                      />
                      <q-input
                        v-model="app.id"
                        label="Application Id"
                        name="appId"
                      />
                      <q-input
                        v-model="app.version"
                        label="Application Version"
                        name="appVer"
                      />
                      <q-input
                        v-model="app.category"
                        label="Application Category Id"
                        name="appCatId"
                      />
                      <q-input
                        v-model="app.download"
                        label="Application Download Link"
                        name="appDownload"
                      />
                      <q-input
                        v-model="app.source"
                        label="Application Source Link"
                        name="appSource"
                      />
                    </q-form>
                  </q-card-section>

                  <q-separator />

                  <q-card-actions>
                    <q-btn @click="updateApp()" flat color="primary"
                      >Save Settings</q-btn
                    >
                    <q-btn @click="redirectToName('AdminAppListPage')" flat
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

const app = reactive({
  id: null,
  name: null,
  version: null,
  category: null,
  download: null,
  source: null,
});

export default {
  name: "AdminAppEditPage",

  data() {
    return {
      appCollection: collection(firebaseFirestore, "appData"),
      appId: this.$route.params.aid,
      appName: null,
      appVersion: null,
      appCategory: null,
      appDownload: null,
      appSource: null,
      docId: null,
    };
  },

  methods: {
    loadAppData() {
      onSnapshot(
        query(this.appCollection, where("id", "==", this.appId)),
        (snapshot) => {
          snapshot.forEach((doc) => {
            this.docId = doc.id;
            this.appName = doc.data().name;
            this.appVersion = doc.data().version;
            this.appCategory = doc.data().categoryId;
            this.appDownload = doc.data().downloadUrl;
            this.appSource = doc.data().sourceUrl;
          });

          app.name = this.appName;
          app.id = this.appId;
          app.version = this.appVersion;
          app.category = this.appCategory;
          app.download = this.appDownload;
          app.source = this.appSource;
        }
      );
    },

    updateApp() {
      const docRef = doc(firebaseFirestore, "appData/" + this.docId);
      updateDoc(docRef, "id", app.id);
      updateDoc(docRef, "name", app.name);
      updateDoc(docRef, "version", app.version);
      updateDoc(docRef, "categoryId", app.category);
      updateDoc(docRef, "downloadUrl", app.download);
      updateDoc(docRef, "sourceUrl", app.source);
      this.redirectToName("AdminAppListPage");
    },

    deleteApp() {
      const docRef = doc(firebaseFirestore, "appData/" + this.docId);
      deleteDoc(docRef).then(() => {
        this.redirectToName("AdminAppListPage");
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

    return { app };
  },

  mounted() {
    this.loadAppData();
  },
};
</script>
