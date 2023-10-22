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
            <img src="/src/assets/images/ok_logo.png" />
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
          <!-- Logout Button -->
          <div v-show="isUserSignedIn">
            <q-item clickable @click="logout">
              <q-item-section avatar>
                <q-icon name="logout" />
              </q-item-section>

              <q-item-section>
                <q-item-label>Logout</q-item-label>
                <q-item-label caption>Logout App!</q-item-label>
              </q-item-section>
            </q-item>
          </div>
        </q-list>
      </q-drawer>
    </div>
    <!-- For Desktop/Tablet -->
    <div class="gt-xs">
      <q-header elevated>
        <q-toolbar>
          <q-avatar>
            <img src="/src/assets/images/ok_logo.png" />
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
              <!-- Logout Button -->
              <div v-show="isUserSignedIn">
                <q-chip
                  square
                  size="18px"
                  clickable
                  color="transparent"
                  text-color="white"
                  @click="logout"
                >
                  <q-avatar size="lg" icon="logout" />
                  Logout
                  <q-tooltip anchor="bottom middle" self="top middle"
                    >Logout App!</q-tooltip
                  >
                </q-chip>
              </div>
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

import { firebaseFirestore } from "boot/firebase";
import { collection, getDocs } from "firebase/firestore";

import logoutService from "src/services/account/firebase-logout";

const leftDrawerOpen = ref(false);
const isUserSignedIn = LocalStorage.has("user");
const userInfo = LocalStorage.getItem("user");

const linksList = [
  {
    title: "Home",
    caption: "page.home",
    icon: "home",
    link: "/",
    isRouter: true,
  },
  {
    title: "Apps",
    caption: "page.apps",
    icon: "double_arrow",
    link: "/apps",
    isRouter: true,
  },
  {
    title: "Social",
    caption: "list.social",
    icon: "double_arrow",
    isDropdown: true,
  },
];

// Login Button
if (!LocalStorage.has("user")) {
  linksList[linksList.length] = {
    title: "Login",
    caption: "Login your account.",
    icon: "login",
    link: "/login",
    isRouter: true,
  };
}

// Admin Button
if (LocalStorage.has("user")) {
  const userMail = userInfo.email;
  // Get Firestore Collection
  const usersCollection = collection(firebaseFirestore, "webAdmin");
  getDocs(usersCollection)
    .then((querySnapshot) => {
      for (var i in querySnapshot.docs) {
        const doc = querySnapshot.docs[i];

        const adminMails = doc.data().email;
        if (adminMails == userMail) {
          linksList[linksList.length] = {
            title: "Admin",
            caption: "Admin Panel",
            icon: "admin_panel_settings",
            link: "/admin",
            isRouter: false,
          };
          break;
        }
      }
    })
    .catch((error) => {
      // Handle database error
      console.log(error.message);
    });
}

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
  setup() {
    const logout = () => {
      logoutService().then(() => {
        window.location.href = "/";
        //router.push('/login');
      });
    };

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      userInfo,
      isUserSignedIn,
      logout,
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
  },
});
</script>
