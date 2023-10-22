const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        name: "HomePage",
        path: "",
        component: () => import("pages/IndexPage.vue"),
      },
      {
        name: "AppCategoryPage",
        path: "apps",
        component: () => import("pages/AppCategoryListPage.vue"),
      },
      {
        name: "AppListPage",
        path: "apps/:cid",
        component: () => import("pages/AppListPage.vue"),
      },
      {
        name: "AppDetailPage",
        path: "apps/:cid/:aid",
        component: () => import("pages/AppDetailPage.vue"),
      },
      {
        name: "LoginPage",
        path: "login",
        component: () => import("pages/LoginPage.vue"),
      },
      {
        name: "RegisterPage",
        path: "register",
        component: () => import("pages/RegisterPage.vue"),
      },
      {
        name: "JobListPage",
        path: "jobs",
        component: () => import("pages/JobListPage.vue"),
      },
      {
        name: "JobCreatePage",
        path: "jobs/new",
        component: () => import("pages/JobCreatePage.vue"),
      },
      {
        name: "DonatePage",
        path: "donate",
        component: () => import("pages/DonatePage.vue"),
      },
      {
        name: "AboutPage",
        path: "about",
        component: () => import("pages/AboutPage.vue"),
      },
      {
        name: "ContactPage",
        path: "contact",
        component: () => import("pages/ContactPage.vue"),
      },
    ],
  },

  {
    path: "/admin",
    component: () => import("layouts/AdminMainLayout.vue"),
    children: [
      {
        name: "AdminHomePage",
        path: "",
        component: () => import("pages/admin/IndexPage.vue"),
      },
      {
        name: "AdminCategoryListPage",
        path: "category",
        component: () => import("pages/admin/AdminCategoryListPage.vue"),
      },
      {
        name: "AdminCategoryEditPage",
        path: "category/:cid/edit",
        component: () => import("pages/admin/AdminCategoryEditPage.vue"),
      },
      {
        name: "AdminCategoryNewPage",
        path: "category/new",
        component: () => import("pages/admin/AdminCategoryNewPage.vue"),
      },
      {
        name: "AdminAppListPage",
        path: "apps",
        component: () => import("pages/admin/AdminAppListPage.vue"),
      },
      {
        name: "AdminAppEditPage",
        path: "apps/:aid/edit",
        component: () => import("pages/admin/AdminAppEditPage.vue"),
      },
      {
        name: "AdminAppNewPage",
        path: "apps/new",
        component: () => import("pages/admin/AdminAppNewPage.vue"),
      },
      {
        name: "AdminNewsListPage",
        path: "news",
        component: () => import("pages/admin/AdminNewsListPage.vue"),
      },
      {
        name: "AdminNewsEditPage",
        path: "news/:nid/edit",
        component: () => import("pages/admin/AdminNewsEditPage.vue"),
      },
      {
        name: "AdminNewsNewPage",
        path: "news/new",
        component: () => import("pages/admin/AdminNewsNewPage.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/404ErrorPage.vue"),
  },
];

export default routes;
