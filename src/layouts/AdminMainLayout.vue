<template>
  <q-layout view="lHh Lpr lFf">
    <!-- For Mobile -->
    <div class="lt-sm">
      <q-header elevated>
        <q-toolbar>
          <q-btn
            flat
            dense
            round
            :width="200"
            icon="menu"
            aria-label="Menu"
            @click="toggleLeftDrawer"
          />

          <q-avatar size="32px">
            <img src="~assets/images/ok_logo.png" />
          </q-avatar>

          <q-toolbar-title> </q-toolbar-title>

          <div>{{ userDisplayInfo }}</div>
        </q-toolbar>
      </q-header>
      <!-- Drawer -->
      <q-drawer v-model="leftDrawerOpen" elevated>
        <q-list>
          <q-item-label header>Menu</q-item-label>
          <EssentialLinkForDrawer
            v-for="link in essentialLinks"
            :key="link.title"
            v-bind="link"
          />
        </q-list>
      </q-drawer>
    </div>
    <!-- For Desktop/Tablet -->
    <div class="gt-xs">
      <q-header elevated>
        <q-toolbar>
          <q-avatar>
            <img src="~assets/images/ok_logo.png" />
          </q-avatar>
          <q-toolbar-title>Onur Kol Web Page</q-toolbar-title>

          <div>{{ userDisplayInfo }}</div>
        </q-toolbar>
        <q-toolbar inset>
          <q-scroll-area
            :thumb-style="toolbarScrollbarThumbStyle"
            :bar-style="toolbarScrollbarStyle"
            style="height: 54px; width: 100%; max-width: 100%"
          >
            <div class="row no-wrap">
              <EssentialLinkForToolbar
                v-for="link in essentialLinks"
                :key="link.title"
                v-bind="link"
              />
            </div>
            <q-space />
          </q-scroll-area>
        </q-toolbar>
      </q-header>
    </div>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script>
import { defineComponent, ref } from "vue";
import { useQuasar, LocalStorage } from "quasar";
import EssentialLinkForDrawer from "components/EssentialLinkForDrawer.vue";
import EssentialLinkForToolbar from "components/EssentialLinkForToolbar.vue";

const leftDrawerOpen = ref(false);
const userInfo = LocalStorage.getItem("user");

const showLoadingScreen = () => {
  // Show Loading
  const $q = useQuasar();
  let timer;

  timer = setTimeout(() => {
    $q.loading.hide();
    timer = void 0;
  }, 1500);

  $q.loading.show();
};

export default defineComponent({
  name: "MainLayout",
  components: {
    EssentialLinkForDrawer,
    EssentialLinkForToolbar,
  },
  computed: {
    userDisplayInfo() {
      return userInfo == null ? "User" : userInfo.displayName;
    },
  },
  data() {
    return { essentialLinks: [] };
  },
  methods: {
    initNavigationMenu() {
      this.essentialLinks = [
        {
          title: this.$t("navigationAdmin.homeAdmin"),
          caption: this.$t("navigationAdmin.homeAdminCaption"),
          icon: "home",
          link: "/admin",
          isRouter: true,
        },
        {
          title: this.$t("navigationAdmin.home"),
          caption: this.$t("navigationAdmin.homeCaption"),
          icon: "double_arrow",
          link: "/",
          isRouter: true,
        },
        {
          title: this.$t("navigationAdmin.category"),
          caption: this.$t("navigationAdmin.categoryCaption"),
          icon: "list",
          link: "/admin/category",
          isRouter: true,
        },
        {
          title: this.$t("navigationAdmin.apps"),
          caption: this.$t("navigationAdmin.appsCaption"),
          icon: "list",
          link: "/admin/apps",
          isRouter: true,
        },
        {
          title: this.$t("navigationAdmin.news"),
          caption: this.$t("navigationAdmin.newsCaption"),
          icon: "list",
          link: "/admin/news",
          isRouter: true,
        },
      ];
    },
  },
  setup() {
    return {
      leftDrawerOpen,
      userInfo,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      toolbarScrollbarThumbStyle: {
        right: "4px",
        borderRadius: "5px",
        backgroundColor: "#ffffff",
        width: "5px",
        height: "6px",
        opacity: 0.78,
      },
      toolbarScrollbarStyle: {
        right: "2px",
        borderRadius: "9px",
        backgroundColor: "#027be3",
        height: "6px",
        opacity: 0.4,
      },
    };
  },
  beforeMount() {
    showLoadingScreen();
    this.initNavigationMenu();
  },
});
</script>
