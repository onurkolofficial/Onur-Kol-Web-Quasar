const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'HomePage',
        path: '',
        component: () => import('pages/IndexPage.vue'),
      },
      {
        name: 'AppCategoryPage',
        path: 'apps',
        component: () => import('pages/AppCategoryListPage.vue'),
      },
      {
        name: 'AppListPage',
        path: 'apps/:cid',
        component: () => import('pages/AppListPage.vue'),
      },
      {
        name: 'AppDetailPage',
        path: 'apps/:cid/:aid',
        component: () => import('pages/AppDetailPage.vue'),
      },

      /*
      // If use to history.state
      {
        name: 'AppListPage',
        path: 'apps/category',
        component: () => import('pages/AppListPage.vue'),
      },
      {
        name: 'AppDetailPage',
        path: 'apps/app',
        component: () => import('pages/AppDetailPage.vue'),
      },
      */
      {
        name: 'LoginPage',
        path: 'login',
        component: () => import('pages/LoginPage.vue'),
      },
      {
        name: 'RegisterPage',
        path: 'register',
        component: () => import('pages/RegisterPage.vue'),
      },
    ],
  },

  {
    path: '/admin',
    component: () => import('layouts/AdminMainLayout.vue'),
    children: [
      {
        name: 'AdminHomePage',
        path: '',
        component: () => import('pages/admin/IndexPage.vue'),
      },
      {
        name: 'AdminCategoryListPage',
        path: 'category',
        component: () => import('pages/admin/AdminCategoryListPage.vue'),
      },
      {
        name: 'AdminCategoryEditPage',
        path: 'category/:cid/edit',
        component: () => import('pages/admin/AdminCategoryEditPage.vue'),
      },
      {
        name: 'AdminCategoryNewPage',
        path: 'category/new',
        component: () => import('pages/admin/AdminCategoryNewPage.vue'),
      },
      {
        name: 'AdminAppListPage',
        path: 'apps',
        component: () => import('pages/admin/AdminAppListPage.vue'),
      },
      {
        name: 'AdminAppEditPage',
        path: 'apps/:aid/edit',
        component: () => import('pages/admin/AdminAppEditPage.vue'),
      },
      {
        name: 'AdminAppNewPage',
        path: 'apps/new',
        component: () => import('pages/admin/AdminAppNewPage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/404ErrorPage.vue'),
  },
];

export default routes;