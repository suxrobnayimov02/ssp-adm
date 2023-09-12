export default [
  {
    path: "/report/prtnapplicationandcontractinfo",
    name: "PrtnApplicationAndContractInfo",
    component: () =>
      import("@/views/report/PrtnApplicationAndContractInfo/index.vue"),
    meta: {
      pageTitle: "prtnapplicationandcontractinfo",
      breadcrumb: [
        {
          text: "Report",
        },
        {
          text: "prtnapplicationandcontractinfo",
          active: true,
        },
      ],
    },
  },
  {
    path: "/report/prtnapplicationandcontractinfbyregion",
    name: "GetPrtnApplicationAndContractInfoByRegion",
    component: () =>
      import(
        "@/views/report/GetPrtnApplicationAndContractInfoByRegion/index.vue"
      ),
    meta: {
      pageTitle: "GetPrtnApplicationAndContractInfoByRegion",
      breadcrumb: [
        {
          text: "Report",
        },
        {
          text: "GetPrtnApplicationAndContractInfoByRegion",
          active: true,
        },
      ],
    },
  },
];
