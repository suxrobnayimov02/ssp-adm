export default [
  {
    path: "/managment/organization",
    name: "Organization",
    component: () => import("@/views/managment/organization/index.vue"),
    meta: {
      pageTitle: "Organization",
      breadcrumb: [
        {
          text: "Management",
        },
        {
          text: "Organization",
          active: true,
        },
      ],
    },
  },
  {
    path: "/managment/integration",
    name: "integration",
    component: () => import("@/views/managment/integration/index.vue"),
    meta: {
      pageTitle: "integration",
      breadcrumb: [
        {
          text: "Management",
        },
        {
          text: "integration",
          active: true,
        },
      ],
    },
  },
  {
    path: "/managment/organization/edit/id=:id",
    name: "EditOrganization",
    component: () => import("@/views/managment/organization/edit.vue"),
    meta: {
      pageTitle: "Organization",
      breadcrumb: [
        {
          text: "Management",
        },
        // {
        //   text: "Organization",
        //   active: true,
        // },
        {
          text: "Organization",
          active: true,
        },
      ],
    },
  },
  {
    path: "/managment/organization/view/id=:id",
    name: "ViewOrganization",
    component: () => import("@/views/managment/organization/view.vue"),
    meta: {
      pageTitle: "ViewOrganization",
      breadcrumb: [
        {
          text: "Management",
        },
        {
          text: "Organization",
          active: true,
        },
        {
          text: "ViewOrganization",
        },
      ],
    },
  },
  {
    path: "/managment/user",
    name: "user",
    component: () => import("@/views/managment/user/index.vue"),
    meta: {
      pageTitle: "User",
      breadcrumb: [
        {
          text: "Management",
        },
        {
          text: "User",
          active: true,
        },
      ],
    },
  },
  {
    path: "/managment/user/edit/id=:id",
    name: "EditUser",
    component: () => import("@/views/managment/user/edit.vue"),
    meta: {
      pageTitle: "User",
      breadcrumb: [
        {
          text: "Management",
        },
        {
          text: "User",
          active: true,
        },
      ],
    },
  },
  {
    path: "/managment/role",
    name: "role",
    component: () => import("@/views/managment/role/index.vue"),
    meta: {
      pageTitle: "Role",
      breadcrumb: [
        {
          text: "Management",
        },
        {
          text: "Role",
          active: true,
        },
      ],
    },
  },
  {
    path: "/managment/role/edit/id=:id",
    name: "EditRole",
    component: () => import("@/views/managment/role/edit.vue"),
    meta: {
      pageTitle: "EditRole",
      breadcrumb: [
        {
          text: "Management",
        },
        {
          text: "Role",
          active: true,
        },
        {
          text: "EditRole",
          active: true,
        },
      ],
    },
  },
  {
    path: "/managment/businessmancard",
    name: "BusinessmanCard",
    component: () => import("@/views/managment/businessmancard/index.vue"),
    meta: {
      pageTitle: "BusinessmanCard",
      breadcrumb: [
        {
          text: "Management",
        },
        {
          text: "BusinessmanCard",
          active: true,
        },
      ],
    },
  },
];
