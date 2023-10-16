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
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'EssentialLinkForToolbar',
  props: {
    title: {
      type: String,
      required: true,
    },

    caption: {
      type: String,
      default: '',
    },

    link: {
      type: String,
      default: '#',
    },

    icon: {
      type: String,
      default: '',
    },

    target: {
      type: String,
      default: '_self',
    },

    isRouter: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
