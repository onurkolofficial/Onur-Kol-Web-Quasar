<template>
  <div class="q-pa-md q-gutter-sm">
    <q-breadcrumbs>
      <q-breadcrumbs-el label="Admin" icon="home" />
    </q-breadcrumbs>
  </div>
  <q-page padding>
    <!-- content -->
  </q-page>
</template>

<script>
import { useMeta } from 'quasar';

import checkForAdminAccount from 'src/services/account/check-admin.js';

export default {
  name: 'AdminIndexPage',

  setup() {
    checkForAdminAccount();

    useMeta(() => {
      return {
        title: 'Onur Kol Web Page - Admin',
      };
    });
  },
};
</script>
