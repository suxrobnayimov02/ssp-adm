export default [
   {
      header: 'prtncontractH',
      visible: ['PrtnContractView', 'OrganizationView', 'ApplicationView', 'PrtnCertificateView']
   },
   {
      title: 'document',
      icon: 'FileTextIcon',
      visible: [
         'PrtnContractView',
         'OrganizationView',
         'ApplicationView',
         'PrtnCertificateView',
         'EmployeeSendTrainView',
         'AppointEmployeeView',
         'EmployeeSickLeaveView',
         'TimesheetView',
         'EmployeeManageView',
         'EmployeeLeaveOrderView',
         'TempCalcKindView'
      ],
      children: [
         {
            title: 'Application',
            route: 'Application',
            visible: 'ApplicationView'
         }
         //  {
         //     title: 'ApplicationCustom',
         //     route: 'ApplicationCustom',
         //     visible: 'PrtnContractCreateManually'
         //  },
         //  {
         //     title: 'prtncontract',
         //     route: 'PrtnContract',
         //     visible: 'PrtnContractView'
         //  },
         //  {
         //     title: 'prtncertificate',
         //     route: 'PrtnCertificate',
         //     visible: 'PrtnCertificateView'
         //  }
         // {
         //   title: "prtnapplicationandcontractinfo",
         //   route: "PrtnApplicationAndContractInfo",
         //   visible: "ReportPrtnApplicationAndContractInfoView",
         // },
         // {
         //   title: 'Hrm',
         //   icon: 'FileTextIcon',
         //   visible: ['EmployeeSendTrainView', 'AppointEmployeeView', 'EmployeeSickLeaveView', 'TimesheetView', 'EmployeeManageView', 'EmployeeLeaveOrderView', 'TempCalcKindView'],
         //   children: [
         //     {
         //       title: 'appointemployee',
         //       route: 'AppointEmployee',
         //       visible: 'AppointEmployeeView'
         //     },
         //     {
         //       title: 'employeeleaveorder',
         //       route: 'EmployeeLeaveOrder',
         //       visible: 'EmployeeLeaveOrderView'
         //     },
         //     {
         //       title: 'employeesendtrain',
         //       route: 'EmployeeSendTrain',
         //       visible: 'EmployeeSendTrainView'
         //     },
         //     {
         //       title: 'employeesickleave',
         //       route: 'EmployeeSickLeave',
         //       visible: 'EmployeeSickLeaveView'
         //     },
         //     {
         //       title: 'timesheet',
         //       route: 'Timesheet',
         //       visible: 'TimesheetView'
         //     },
         //     {
         //       title: 'employeemanage',
         //       route: 'EmployeeManage',
         //       visible: 'EmployeeManageView'
         //     },
         //     {
         //       title: 'tempcalckind',
         //       route: 'TempCalcKind',
         //       visible: 'TempCalcKindView'
         //     }
         //   ]
         // }
      ]
   }
];
