export default [
  {
    path: '/hrm/appointemployee',
    name: 'AppointEmployee',
    component: () => import('@/views/hrm/appointemployee/index.vue'),
    meta: {
      pageTitle: "appointemployee",
      breadcrumb: [
        {
          text: "Hrm",
        },
        {
          text: "appointemployee",
          active: true,
        },
      ],
    },
  },
  {
    path: "/hrm/appointemployee/edit/id=:id",
    name: "EditAppointEmployee",
    component: () => import("@/views/hrm/appointemployee/edit.vue"),
    meta: {
      pageTitle: "appointemployee",
      breadcrumb: [
        {
          text: "Hrm",
        },
        {
          text: "appointemployee",
          active: true,
        },
      ],
    },
  },
  {
    path: "/hrm/employeesendtrain",
    name: "EmployeeSendTrain",
    component: () => import("@/views/hrm/employeesendtrain/index.vue"),
    meta: {
      pageTitle: "employeesendtrain",
      breadcrumb: [
        {
          text: "Hrm",
        },
        {
          text: "employeesendtrain",
          active: true,
        },
      ],
    },
  },
  {
    path: "/hrm/employeesendtrain/edit/id=:id",
    name: "EditEmployeeSendTrain",
    component: () => import("@/views/hrm/employeesendtrain/edit.vue"),
    meta: {
      pageTitle: "employeesendtrain",
      breadcrumb: [
        {
          text: "Hrm",
        },
        {
          text: "employeesendtrain",
          active: true,
        },
      ],
    },
  },
  {
    path: "/hrm/timesheet",
    name: "Timesheet",
    component: () => import("@/views/hrm/timesheet/index.vue"),
    meta: {
      pageTitle: "timesheet",
      breadcrumb: [
        {
          text: "Hrm",
        },
        {
          text: "timesheet",
          active: true,
        },
      ],
    },
  },
  {
    path: "/hrm/timesheet/edit/id=:id",
    name: "EditTimesheet",
    component: () => import("@/views/hrm/timesheet/edit.vue"),
    meta: {
      pageTitle: "timesheet",
      breadcrumb: [
        {
          text: "Hrm",
        },
        {
          text: "timesheet",
          active: true,
        },
      ],
    },
  },
  {
    path: "/hrm/employeesickleave",
    name: "EmployeeSickLeave",
    component: () => import("@/views/hrm/employeesickleave/index.vue"),
    meta: {
      pageTitle: "employeesickleave",
      breadcrumb: [
        {
          text: "Hrm",
        },
        {
          text: "employeesickleave",
          active: true,
        },
      ],
    },
  },
  {
    path: "/hrm/employeesickleave/edit/id=:id",
    name: "EditEmployeeSickLeave",
    component: () => import("@/views/hrm/employeesickleave/edit.vue"),
    meta: {
      pageTitle: "employeesickleave",
      breadcrumb: [
        {
          text: "Hrm",
        },
        {
          text: "employeesickleave",
          active: true,
        },
      ],
    },
  },
  {
    path: '/hrm/plannedcalculation',
    name: 'PlannedCalculation',
    component: () => import('@/views/hrm/plannedcalculation/index.vue'),
    meta: {
      pageTitle: 'plannedcalculation',
      breadcrumb: [
        {
          text: 'Hrm'
        },
        {
          text: 'plannedcalculation',
          active: true
        }
      ]
    }
  },
  {
    path: '/hrm/plannedcalculation/edit/id=:id',
    name: 'EditPlannedCalculation',
    component: () => import('@/views/hrm/plannedcalculation/edit.vue'),
    meta: {
      pageTitle: 'plannedcalculation',
      breadcrumb: [
        {
          text: 'Hrm'
        },
        {
          text: 'plannedcalculation',
          active: true
        }
      ]
    }
  },
  {
    path: "/hrm/employeemanage",
    name: "EmployeeManage",
    component: () => import("@/views/hrm/employeemanage/index.vue"),
    meta: {
      pageTitle: "employeemanage",
      breadcrumb: [
        {
          text: "Hrm",
        },
        {
          text: "employeemanage",
          active: true,
        },
      ],
    },
  },
  {
    path: '/hrm/employeeleaveorder',
    name: 'EmployeeLeaveOrder',
    component: () => import('@/views/hrm/employeeleaveorder/index.vue'),
    meta: {
      pageTitle: 'employeeleaveorder',
      breadcrumb: [
        {
          text: 'Hrm'
        },
        {
          text: 'employeeleaveorder',
          active: true
        }
      ]
    }
  },
  {
    path: '/hrm/employeeleaveorder/edit/id=:id',
    name: 'EditEmployeeLeaveOrder',
    component: () => import('@/views/hrm/employeeleaveorder/edit.vue'),
    meta: {
      pageTitle: 'employeeleaveorder',
      breadcrumb: [
        {
          text: 'Hrm'
        },
        {
          text: 'employeeleaveorder',
          active: true
        }
      ]
    }
  },
  {
    path: '/hrm/tempcalckind',
    name: 'TempCalcKind',
    component: () => import('@/views/hrm/tempcalckind/index.vue'),
    meta: {
      pageTitle: 'tempcalckind',
      breadcrumb: [
        {
          text: 'Hrm'
        },
        {
          text: 'tempcalckind',
          active: true
        }
      ]
    }
  },
  {
    path: '/hrm/tempcalckind/edit/id=:id',
    name: 'EditTempCalcKind',
    component: () => import('@/views/hrm/tempcalckind/edit.vue'),
    meta: {
      pageTitle: 'tempcalckind',
      breadcrumb: [
        {
          text: 'Hrm'
        },
        {
          text: 'tempcalckind',
          active: true
        }
      ]
    }
  },
];

