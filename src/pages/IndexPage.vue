<template>
  <div class="q-pa-md q-gutter-sm">
    <q-breadcrumbs>
      <q-breadcrumbs-el label="Home" icon="home" />
    </q-breadcrumbs>
  </div>
  <q-page padding class="bg-blue">
    <div class="text-white text-center q-pa-xl">
      <div>
        <div class="text-h3" style="opacity: 0.8">
          Welcome to my official web page.
        </div>
      </div>
    </div>
    <div class="q-px-lg q-py-md">
      <q-timeline color="purple">
        <q-timeline-entry class="text-h6 text-white" heading>
          Latest Updates
        </q-timeline-entry>

        <q-timeline-entry
          class="text-white"
          title="New Release!"
          subtitle="October 16, 2023"
          icon="done"
        >
          <div>
            The website software has been completely renewed. You can explore
            our site that offers new and advanced features. Our new site uses
            the Quasar framework.
          </div>
        </q-timeline-entry>

        <q-timeline-entry
          class="text-white"
          title="New Domain!"
          subtitle="October 01, 2023"
          icon="done"
        >
          <div>
            My new internet address was changed from
            <span style="color: #bdbdbd"
              >https://onurkolofficial.epizy.com</span
            >
            to
            <span style="color: #6200ee"><b>https://onurkol.web.app</b></span> .
          </div>
        </q-timeline-entry>
      </q-timeline>
    </div>
  </q-page>
</template>

<script>
import { ref } from "vue";
import { firebaseApp } from "boot/firebase";
import { useMeta } from "quasar";

export default {
  name: "IndexPage",

  setup() {
    useMeta(() => {
      return {
        title: "Onur Kol Web Page",
      };
    });
  },
};
</script>
