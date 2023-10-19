<template>
  <div v-if="isRouter === true">
    <router-link tabindex="0" role="listitem" :to="link">
      <q-chip
        square
        size="18px"
        clickable
        color="transparent"
        text-color="white"
      >
        <q-avatar size="lg" :icon="icon" />
        {{ title }}
        <q-tooltip anchor="bottom middle" self="top middle">{{
          caption
        }}</q-tooltip>
      </q-chip>
      <!-- For Q-ITEM -->
      <!--
        <q-item clickable v-ripple>
          <q-avatar :icon="icon" />
          <q-item-section>{{ title }}</q-item-section>
        </q-item>
        <q-tooltip anchor="bottom middle" self="top middle"
          >{{ caption }}!</q-tooltip
        >
        -->
    </router-link>
  </div>
  <div v-else-if="isDropdown === true">
    <q-chip square size="18px" clickable color="transparent" text-color="white">
      <q-avatar size="lg" :icon="icon" />
      {{ title }}
      <q-menu fit>
        <q-list style="min-width: 100px">
          <q-item
            tag="a"
            target="_blank"
            href="https://github.com/onurkolofficial"
            clickable
            v-close-popup
          >
            <q-item-section>Github</q-item-section>
          </q-item>
          <q-item
            tag="a"
            target="_blank"
            href="https://twitter.com/onurkolofficial"
            clickable
            v-close-popup
          >
            <q-item-section>Twitter</q-item-section>
          </q-item>
          <q-item
            tag="a"
            target="_blank"
            href="https://instagram.com/onurkolofficial"
            clickable
            v-close-popup
          >
            <q-item-section>Instagram</q-item-section>
          </q-item>
          <q-item
            tag="a"
            target="_blank"
            href="https://facebook.com/onurkolofficial"
            clickable
            v-close-popup
          >
            <q-item-section>Facebook</q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-chip>
  </div>
  <div v-else-if="mobileOnly === true"></div>
  <div v-else>
    <a :href="link" :target="target">
      <q-chip
        square
        size="18px"
        clickable
        color="transparent"
        text-color="white"
      >
        <q-avatar size="lg" :icon="icon" />
        {{ title }}
        <q-tooltip anchor="bottom middle" self="top middle">{{
          caption
        }}</q-tooltip>
      </q-chip>
    </a>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "EssentialLinkForToolbar",
  props: {
    title: {
      type: String,
      required: true,
    },

    caption: {
      type: String,
      default: "",
    },

    link: {
      type: String,
      default: "#",
    },

    icon: {
      type: String,
      default: "",
    },

    target: {
      type: String,
      default: "_self",
    },

    isRouter: {
      type: Boolean,
      default: false,
    },

    mobileOnly: {
      type: Boolean,
      default: false,
    },

    isDropdown: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
