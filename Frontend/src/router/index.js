import { createWebHistory, createRouter } from "vue-router";

const routes = [
    {
        path: "/",
        name: "HomePage",
        component: () => import("@/views/HomePage.vue"),
        props: true
    },
    {
        path: "/header",
        name: "Header",
        component: () => import("@/components/Header.vue"),
    },
    {
        path: "/footer",
        name: "Footer",
        component: () => import("@/components/Footer.vue"),
    },
    {
    path: "/nhanvien",
    name: "HomeNhanVien",
    component: () => import("@/views/HomeNhanVien.vue"),
    },
    {
    path: "/login",
    name: "Login",
    component: () => import("@/views/LoginPage.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/views/RegisterPage.vue"),
  },
  {
    path: "/findBook/:name",
    name: "FindBook",
    component: () => import("@/views/FindBook.vue"),
  },
  {
    path: "/infoUser/:id",
    name: "InfoUser",
    component: () => import("@/views/InfoUser.vue"),
    props: true
  },
  {
    path: "/loanpage",
    name: "LoanSpace",
    component: () => import("@/views/LoanPage.vue"),
  },
  {
    path: "/categoryBook/:name",
    name: "CategoryBook",
    component: () => import("@/views/CategoryBook.vue"),
    props: true
  },
  {
    path: "/detail/:id",
    name: "Details",
    component: () => import("@/views/DetailsBook.vue"),
    props: true
  },
  {
    path: "/introduce",
    name: "Introduce",
    component: () => import("@/views/IntroducePage.vue"),
  },
  {
    path: "/contact",
    name: "Contact",
    component: () => import("@/views/ContactPage.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name:"PageNotFound",
    component: () => import("@/views/404NotFound.vue"),
  },
  {
    path: "/editinfoUser/:id",
    name: "editInfoUser",
    component: () => import("@/views/EditDocGia.vue"),
    props: true
  },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;