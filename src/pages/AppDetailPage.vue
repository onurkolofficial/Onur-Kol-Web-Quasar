<template>
  <div class="q-pa-md q-gutter-sm">
    <q-breadcrumbs active-color="accent">
      <q-breadcrumbs-el label="Home" icon="home" to="/" />
      <q-breadcrumbs-el label="Apps" icon="double_arrow" to="/apps" />
      <q-breadcrumbs-el
        label="Category"
        icon="double_arrow"
        to="/"
        @click="redirectOnHistoryClick"
      />
      <q-breadcrumbs-el label="Detail" icon="double_arrow" />
    </q-breadcrumbs>
  </div>
  <q-page padding>
    <!-- content -->
    <q-toolbar class="bg-primary text-white shadow-2">
      <q-toolbar-title>Application Detail</q-toolbar-title>
    </q-toolbar>

    <q-card v-if="appName != null" class="q-ma-xl">
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
              <div class="text-white q-my-sm text-subtitle1">
                {{ categoryName }}/{{
                  categoryType == "app"
                    ? "Application"
                    : categoryType == "game"
                    ? "Game"
                    : categoryType
                }}
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
                        <div class="text-h6 text-primary">Version</div>
                        <div class="text-subtitle2 text-primary">
                          {{ appVersion }}
                        </div>
                      </div>

                      <div
                        v-if="isDownloadable || isSourceable"
                        class="col-auto"
                      >
                        <q-btn color="grey-7" round flat icon="more_vert">
                          <q-menu fit auto-close>
                            <q-list>
                              <q-item
                                v-if="isDownloadable"
                                clickable
                                @click="copyLink('this')"
                              >
                                <q-item-section>Copy Page Link</q-item-section>
                              </q-item>
                              <q-item
                                v-if="isDownloadable"
                                clickable
                                @click="copyLink(appDownload)"
                              >
                                <q-item-section
                                  >Copy Download Link</q-item-section
                                >
                              </q-item>
                              <q-item
                                v-if="isSourceable"
                                clickable
                                @click="copyLink(appSource)"
                              >
                                <q-item-section
                                  >Copy Source Link</q-item-section
                                >
                              </q-item>
                            </q-list>
                          </q-menu>
                        </q-btn>
                      </div>
                    </div>
                  </q-card-section>

                  <q-card-section> App Content </q-card-section>

                  <q-separator />

                  <q-card-actions>
                    <q-btn
                      v-if="isDownloadable"
                      @click="redirectLink(appDownload)"
                      flat
                      color="primary"
                      >Download App</q-btn
                    >
                    <q-btn
                      v-if="isSourceable"
                      @click="redirectLink(appSource)"
                      flat
                      >Source Code</q-btn
                    >
                  </q-card-actions>
                </q-card>
              </q-card-section>
            </div>
          </div>
        </div>
      </div>
    </q-card>

    <q-card v-if="appName == null" class="q-ma-xl">
      <div class="row full-width bg-primary">
        <div class="row q-pa-sm-sm q-pa-md">
          <div
            class="row full-width q-px-xl q-pb-xl full-height flex flex-center"
          >
            <div class="">
              <div
                class="text-h3 text-uppercase text-white fredoka"
                style="min-width: 220px"
              >
                Application Not Found!
              </div>
              <div
                class="text-white q-my-sm text-subtitle1"
                style="margin-top: 20px"
              >
                <div class="text-h3" style="opacity: 0.8">
                  Oops. Nothing here...
                </div>

                <q-btn
                  class="q-mt-xl"
                  color="white"
                  text-color="blue"
                  unelevated
                  to="/"
                  label="Go Home"
                  no-caps
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </q-card>
  </q-page>
</template>

<script>
import { useMeta, copyToClipboard } from "quasar";

import { firebaseFirestore } from "boot/firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";

export default {
  name: "AppDetailPage",

  data() {
    return {
      categoryCollection: collection(firebaseFirestore, "appCategory"),
      appCollection: collection(firebaseFirestore, "appData"),
      categoryId: this.$route.params.cid,
      categoryName: null,
      categoryType: null,
      appId: this.$route.params.aid,
      appName: null,
      appVersion: null,
      appDownload: null,
      appSource: null,
      isDownloadable: null,
      isSourceable: null,
    };
  },

  methods: {
    loadAppData() {
      onSnapshot(
        query(this.appCollection, where("id", "==", this.appId)),
        (snapshot) => {
          snapshot.forEach((doc) => {
            this.appName = doc.data().name;
            this.appVersion = doc.data().version;
            this.appDownload = doc.data().downloadUrl;
            this.appSource = doc.data().sourceUrl;
          });

          if (this.appDownload == "") this.isDownloadable = false;
          else this.isDownloadable = true;
          if (this.appSource == "") this.isSourceable = false;
          else this.isSourceable = true;
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

    redirectOnHistoryClick(e, go) {
      e.preventDefault();
      // Go Back
      history.back();
    },

    redirectLink(url) {
      window.location.href = url;
    },

    copyLink(url) {
      if (url == "this") copyToClipboard(window.location.href);
      else copyToClipboard(url);
    },
  },

  setup() {
    useMeta(() => {
      return {
        title: "Onur Kol Web Page - App Detail",
      };
    });
  },

  mounted() {
    this.loadAppData();
    this.getCategoryData();
  },
};
</script>
