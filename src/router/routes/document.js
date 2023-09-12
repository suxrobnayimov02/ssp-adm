export default [
  // SportSchoolAdmissionQuota
  // Application
  {
    path: "/document/application",
    name: "Application",
    component: () => import("@/views/document/application/index.vue"),
    meta: {
      pageTitle: "Application",
      breadcrumb: [
        {
          text: "Document",
        },
        {
          text: "Application",
          active: true,
        },
      ],
    },
  },
  {
    path: "/document/application/edit/id=:id",
    name: "EditApplication",
    component: () => import("@/views/document/application/edit.vue"),
    meta: {
      pageTitle: "Application",
      breadcrumb: [
        {
          text: "Document",
        },
        {
          text: "Application",
          active: true,
        },
      ],
    },
  },
  {
    path: "/document/applicationcustom",
    name: "ApplicationCustom",
    component: () => import("@/views/document/applicationcustom/index.vue"),
    meta: {
      pageTitle: "ApplicationCustom",
      breadcrumb: [
        {
          text: "Document",
        },
        {
          text: "ApplicationCustom",
          active: true,
        },
      ],
    },
  },
  {
    path: "/document/applicationcustom/edit/id=:id",
    name: "EditApplicationCustom",
    component: () => import("@/views/document/applicationcustom/edit.vue"),
    meta: {
      pageTitle: "ApplicationCustom",
      breadcrumb: [
        {
          text: "Document",
        },
        {
          text: "ApplicationCustom",
          active: true,
        },
      ],
    },
  },
  // PrtnContract
  {
    path: "/document/prtncontract",
    name: "PrtnContract",
    component: () => import("@/views/document/prtncontract/index.vue"),
    meta: {
      pageTitle: "prtncontract",
      breadcrumb: [
        {
          text: "Document",
        },
        {
          text: "prtncontract",
          active: true,
        },
      ],
    },
  },
  {
    path: "/document/prtncontract/view/id=:id",
    name: "ViewPrtnContract",
    component: () => import("@/views/document/prtncontract/view.vue"),
    meta: {
      pageTitle: "prtncontract",
      breadcrumb: [
        {
          text: "Document",
        },
        {
          text: "prtncontract",
          active: true,
        },
      ],
    },
  },
  {
    path: "/document/prtncontract/edit/id=:id",
    name: "EditPrtnContract",
    component: () => import("@/views/document/prtncontract/edit.vue"),
    meta: {
      pageTitle: "prtncontract",
      breadcrumb: [
        {
          text: "Document",
        },
        {
          text: "prtncontract",
          active: true,
        },
      ],
    },
  },
  // PrtnCertificate
  {
    path: "/document/prtncertificate",
    name: "PrtnCertificate",
    component: () => import("@/views/document/prtncertificate/index.vue"),
    meta: {
      pageTitle: "prtncertificate",
      breadcrumb: [
        {
          text: "Document",
        },
        {
          text: "prtncertificate",
          active: true,
        },
      ],
    },
  },
  {
    path: "/document/prtncertificate/view/id=:id",
    name: "ViewPrtnCertificate",
    component: () => import("@/views/document/prtncertificate/view.vue"),
    meta: {
      pageTitle: "prtncertificate",
      breadcrumb: [
        {
          text: "Document",
        },
        {
          text: "prtncertificate",
          active: true,
        },
      ],
    },
  },
  {
    path: "/document/prtncertificate/edit/id=:id",
    name: "EditPrtnCertificate",
    component: () => import("@/views/document/prtncertificate/edit.vue"),
    meta: {
      pageTitle: "prtncertificate",
      breadcrumb: [
        {
          text: "Document",
        },
        {
          text: "prtncertificate",
          active: true,
        },
      ],
    },
  },
];
