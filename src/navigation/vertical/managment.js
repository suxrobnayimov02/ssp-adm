export default [
  {
    header: "Management",
    visible: [
      "OrganizationView",
      "OrganizationTypeView",
      "FillGroupFormByEduDirectionView",
      "UserView",
      "RoleView",
    ],
  },
  {
    title: "Management",
    icon: "SettingsIcon",
    visible: [
      "OrganizationView",
      "UserView",
      "RoleView",
      "EmployeeView",
      "PositionView",
    ],
    children: [
      {
        title: "employee",
        route: "Employee",
        visible: "EmployeeView",
      },
      {
        title: "BusinessmanCard",
        route: "BusinessmanCard",
        visible: "BusinessmanCardView",
      },
      {
        title: "position",
        route: "Position",
        visible: "PositionView",
      },
      {
        title: "Organization",
        route: "Organization",
        visible: "OrganizationView",
      },
      {
        title: "OrganizationType",
        route: "organizationtype",
        // visible : "OrganizationView"
        visible: "OrganizationTypeView",
      },
      {
        title: "User",
        route: "user",
        visible: "UserView",
      },
      {
        title: "Role",
        route: "role",
        visible: "RoleView",
      },
      {
        title: "integration",
        route: "integration",
        visible: "Integration",
      },
    ],
  },
];
