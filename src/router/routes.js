import Home from "../layouts/HomeLayout";

const routes = [
  {
    path: "/",
    component: Home
  },

  {
    path: "/home",
    component: () => import("layouts/Layout.vue"),
    children: [
      { path: "", component: () => import("pages/Dashboard.vue") },
      { path: "/settings", component: () => import("pages/Settings.vue") }
    ]
  }
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue")
  });
}

export default routes;
