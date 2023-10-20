<template>
  <div v-if="isRouter === true">
    <router-link
      class="q-item q-item-type row no-wrap q-item--clickable q-link cursor-pointer q-hoverable"
      tabindex="0"
      role="listitem"
      :to="link"
    >
      <div class="q-focus-helper" tabindex="-1"></div>
      <q-item-section v-if="icon" avatar>
        <q-icon :name="icon" />
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ title }}</q-item-label>
        <q-item-label caption>{{ caption }}</q-item-label>
      </q-item-section>
    </router-link>
  </div>
  <!-- Dropdowns not showing mobile drawer.-->
  <div v-else-if="isDropdown === true">
    <q-list class="rounded-borders">
      <q-expansion-item
        :content-inset-level="0.5"
        expand-separator
        :icon="icon"
        :label="title"
        :caption="caption"
      >
        <q-item
          tag="a"
          target="_blank"
          href="https://github.com/onurkolofficial"
        >
          <q-item-section v-if="icon" avatar>
            <q-icon name="link" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Github</q-item-label>
            <q-item-label caption>@onurkolofficial</q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          tag="a"
          target="_blank"
          href="https://twitter.com/onurkolofficial"
        >
          <q-item-section v-if="icon" avatar>
            <q-icon name="link" />
          </q-item-section>

          <q-item-section>
            <q-item-label>X (Twitter)</q-item-label>
            <q-item-label caption>@onurkolofficial</q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          tag="a"
          target="_blank"
          href="https://instagram.com/onurkolofficial"
        >
          <q-item-section v-if="icon" avatar>
            <q-icon name="link" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Instagram</q-item-label>
            <q-item-label caption>@onurkolofficial</q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          tag="a"
          target="_blank"
          href="https://facebook.com/onurkolofficial"
        >
          <q-item-section v-if="icon" avatar>
            <q-icon name="link" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Facebook</q-item-label>
            <q-item-label caption>@onurkolofficial</q-item-label>
          </q-item-section>
        </q-item>
      </q-expansion-item>
    </q-list>
  </div>
  <div v-else>
    <q-item tag="a" :target="target" :href="link">
      <q-item-section v-if="icon" avatar>
        <q-icon :name="icon" />
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ title }}</q-item-label>
        <q-item-label caption>{{ caption }}</q-item-label>
      </q-item-section>
    </q-item>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "EssentialLinkForDrawer",
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

    isDropdown: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
