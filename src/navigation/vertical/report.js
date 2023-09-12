export default [
  // {
  //   header: "Report",
  //   visible: ["OrganizationView"],
  // },
  {
    title: "Reports",
    icon: "ClipboardIcon",
    visible: ["ReportPrtnApplicationAndContractInfoByRegionView","ReportPrtnApplicationAndContractInfoView"],
    children: [
      {
        title: "prtnapplicationandcontractinfo",
        route: "PrtnApplicationAndContractInfo",
        visible: "ReportPrtnApplicationAndContractInfoView",
      },
      {
        title: "GetPrtnApplicationAndContractInfoByRegion",
        route: "GetPrtnApplicationAndContractInfoByRegion",
        visible: "ReportPrtnApplicationAndContractInfoByRegionView",
      },
    ],
  },
];
