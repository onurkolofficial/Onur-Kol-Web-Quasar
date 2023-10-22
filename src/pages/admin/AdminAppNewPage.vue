<template>
  <div class="q-pa-md q-gutter-sm">
    <q-breadcrumbs active-color="accent">
      <q-breadcrumbs-el label="Admin" icon="home" to="/admin" />
      <q-breadcrumbs-el label="Apps" icon="double_arrow" to="/admin/apps" />
      <q-breadcrumbs-el label="New" icon="add" />
    </q-breadcrumbs>
  </div>
  <q-page padding>
    <!-- content -->
    <q-toolbar class="bg-primary text-white shadow-2">
      <q-toolbar-title>New Application</q-toolbar-title>
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
                New Application
              </div>
              <div class="text-white q-my-sm text-subtitle1">
                Add your application.
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
                        <div class="text-h6 text-primary">New Application</div>
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
                    <q-btn @click="newApp()" flat color="primary"
                      >Add Application</q-btn
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
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

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
  name: "AdminAppNewPage",

  methods: {
    newApp() {
      let newDocId = this.randomString(20);
      setDoc(doc(firebaseFirestore, "appData", newDocId), {
        date: serverTimestamp(),
        id: app.id,
        name: app.name,
        version: app.version,
        categoryId: app.category,
        downloadUrl: app.download,
        sourceUrl: app.source,
      }).then(() => {
        this.redirectToName("AdminAppListPage");
      });
    },

    redirectToLink(url) {
      this.$router.push({ path: url });
    },

    redirectToName(urlTagName) {
      this.$router.push({ name: urlTagName });
    },

    randomString(length) {
      let text = " ";
      let chars =
        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

      for (let i = 0; i < length; i++) {
        text += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return text;
    },
  },

  setup() {
    checkForAdminAccount();

    useMeta(() => {
      return {
        title: "Onur Kol Web Page - Admin - New",
      };
    });

    return { app };
  },
};
</script>
