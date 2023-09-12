export default [
   {
      header: 'InfoGlob',
      visible: ['CountryView', 'OblastView', 'RegionView', 'OkedView', 'EmployeeView']
   },
   {
      title: 'InfoCountty',
      icon: 'GlobeIcon',
      visible: ['CountryView', 'OblastView', 'RegionView', 'EmployeeView', 'PrtnContractTypeView'],
      children: [
         {
            title: 'Country',
            route: 'country',
            visible: 'CountryView'
         },

         // {
         //   title: "Oblast",
         //   route: "oblast",
         //   visible: "OblastView",
         // },
         {
            title: 'Oblast',
            route: 'region',
            visible: 'RegionView'
         },
         {
            title: 'Region',
            route: 'District',
            visible: 'DistrictView'
         },
         {
            title: 'Department',
            route: 'Department',
            visible: 'DepartmentView'
         },
         {
            title: 'mfy',
            route: 'Mfy',
            visible: 'MfyView'
         }
      ]
   },
   {
      title: 'InfoGlob',
      icon: 'LayersIcon',
      visible: ['PrtnContractTypeView'],
      children: [
         {
            title: 'prtnContractType',
            route: 'PrtnContractType',
            visible: 'PrtnContractTypeView'
         },
         {
            title: 'prtnRejectReason',
            route: 'PrtnRejectReason',
            visible: 'PrtnRejectReasonView'
         },
         {
            title: 'OrganizationLegalForm',
            route: 'OrganizationLegalForm',
            visible: 'OrganizationLegalFormView'
         },
         {
            title: 'RelativeDegree',
            route: 'RelativeDegree',
            visible: 'RelativeDegreeView'
         },
         {
            title: 'IdentityDocument',
            route: 'IdentityDocument',
            visible: 'IdentityDocumentView'
         },
         {
            title: 'WorkSchedule',
            route: 'WorkSchedule',
            visible: 'WorkScheduleView'
         },
         {
            title: 'Contractor',
            route: 'Contractor',
            visible: 'ContractorView'
         }
      ]
   },
   {
      title: 'InfoSchool',
      icon: 'LayersIcon',
      visible: ['OkedView'],
      children: [
         {
            title: 'Oked',
            route: 'oked',
            visible: 'OkedView'
         },
         {
            title: 'fctrlformcontrol',
            route: 'FctrlFormControl',
            visible: 'FormControlView'
         },
         {
            title: 'fctrlformcontrolref',
            route: 'FctrlFormControlRef',
            visible: 'FormControlRefView'
         },
         {
            title: 'applicationclassification',
            route: 'ApplicationClassification',
            visible: 'ApplicationClassificationView'
         },
         {
            title: 'applicationclassification2',
            route: 'ApplicationClassification2',
            visible: 'ApplicationClassificationView'
         },
         {
            title: 'VideoCategory',
            route: 'VideoCategory',
            visible: 'VideoCategoryView'
         },
         {
            title: 'VideoLesson',
            route: 'VideoLesson',
            visible: 'VideoLessonView'
         },
         {
            title: 'News',
            route: 'News',
            visible: 'NewsView'
         },
         {
            title: 'Faq',
            route: 'Faq',
            visible: 'FaqView'
         }
      ]
   }
   // ]/
   // },
];
