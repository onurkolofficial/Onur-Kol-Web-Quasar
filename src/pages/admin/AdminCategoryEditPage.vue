<template>
  <div class="q-pa-md q-gutter-sm">
    <q-breadcrumbs>
      <q-breadcrumbs-el label="Admin" icon="home" to="/admin" />
      <q-breadcrumbs-el
        label="Category"
        icon="double_arrow"
        to="/admin/category"
      />
      <q-breadcrumbs-el label="Edit" icon="edit" />
    </q-breadcrumbs>
  </div>
  <q-page padding>
    <!-- content -->
    <q-toolbar class="bg-primary text-white shadow-2">
      <q-toolbar-title>Edit Category</q-toolbar-title>
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
                {{ categoryName }}
              </div>
              <div class="text-white q-my-sm text-subtitle1">
                {{ categoryId }}
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
                        <div class="text-h6 text-primary">Edit Category</div>
                        <div class="text-subtitle2 text-primary">
                          {{ categoryId }}
                        </div>
                      </div>

                      <div class="col-auto">
                        <q-btn color="grey-7" round flat icon="more_vert">
                          <q-menu fit auto-close>
                            <q-list>
                              <q-item
                                class="text-red"
                                clickable
                                @click="deleteCategory()"
                              >
                                <q-item-section>Delete Category</q-item-section>
                              </q-item>
                            </q-list>
                          </q-menu>
                        </q-btn>
                      </div>
                    </div>
                  </q-card-section>

                  <q-card-section>
                    <q-form class="q-gutter-md">
                      <q-input v-model="category.name" label="Category Name" />
                      <q-input v-model="category.id" label="Category Id" />
                      <q-input v-model="category.type" label="Category Type" />
                    </q-form>
                  </q-card-section>

                  <q-separator />

                  <q-card-actions>
                    <q-btn @click="updateCategory()" flat color="primary"
                      >Save Settings</q-btn
                    >
                    <q-btn @click="redirectToName('AdminCategoryListPage')" flat
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

const category = reactive({
  id: null,
  name: null,
  type: null,
});

export default {
  name: "AdminCategoryEditPage",

  data() {
    return {
      categoryCollection: collection(firebaseFirestore, "appCategory"),
      categoryId: this.$route.params.cid,
      categoryName: null,
      categoryType: null,
      docId: null,
    };
  },

  methods: {
    getCategoryData() {
      onSnapshot(
        query(this.categoryCollection, where("id", "==", this.categoryId)),
        (snapshot) => {
          snapshot.forEach((doc) => {
            this.docId = doc.id;
            this.categoryName = doc.data().name;
            this.categoryType = doc.data().type;
          });

          category.id = this.categoryId;
          category.name = this.categoryName;
          category.type = this.categoryType;
        }
      );
    },

    updateCategory() {
      const docRef = doc(firebaseFirestore, "appCategory/" + this.docId);
      updateDoc(docRef, "id", category.id);
      updateDoc(docRef, "name", category.name);
      updateDoc(docRef, "type", category.type);
      this.redirectToName("AdminCategoryListPage");
    },

    deleteCategory() {
      const docRef = doc(firebaseFirestore, "appCategory/" + this.docId);
      deleteDoc(docRef).then(() => {
        this.redirectToName("AdminCategoryListPage");
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

    return { category };
  },

  mounted() {
    this.getCategoryData();
  },
};
</script>
