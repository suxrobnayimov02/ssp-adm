export default [
   {
      path: '/info/employee',
      name: 'Employee',
      component: () => import('@/views/info/employee/index.vue'),
      meta: {
         pageTitle: 'employee',
         breadcrumb: [
            {
               text: 'Info'
            },
            {
               text: 'employee',
               active: true
            }
         ]
      }
   },
   {
      path: '/info/employee/edit/id=:id',
      name: 'EditEmployee',
      component: () => import('@/views/info/employee/edit.vue'),
      meta: {
         pageTitle: 'employee',
         breadcrumb: [
            {
               text: 'Info'
            },
            {
               text: 'employee',
               active: true
            }
         ]
      }
   },
   {
      path: '/info/position',
      name: 'Position',
      component: () => import('@/views/info/position/index.vue'),
      meta: {
         pageTitle: 'position',
         breadcrumb: [
            {
               text: 'Info'
            },
            {
               text: 'position',
               active: true
            }
         ]
      }
   },
   {
      path: '/info/position/edit/id=:id',
      name: 'EditPosition',
      component: () => import('@/views/info/position/edit.vue'),
      meta: {
         pageTitle: 'position',
         breadcrumb: [
            {
               text: 'Info'
            },
            {
               text: 'position',
               active: true
            }
         ]
      }
   },
   {
      path: '/info/prtncontracttype',
      name: 'PrtnContractType',
      component: () => import('@/views/info/prtncontracttype/index.vue'),
      meta: {
         pageTitle: 'prtnContractType',
         breadcrumb: [
            {
               text: 'Info'
            },
            {
               text: 'prtnContractType',
               active: true
            }
         ]
      }
   },
   {
      path: '/info/prtncontracttype/edit/id=:id',
      name: 'EditPrtnContractType',
      component: () => import('@/views/info/prtncontracttype/edit.vue'),
      meta: {
         pageTitle: 'prtnContractType',
         breadcrumb: [
            {
               text: 'Info'
            },
            {
               text: 'prtnContractType',
               active: true
            }
         ]
      }
   },
   {
      path: '/info/prtnrejectreason',
      name: 'PrtnRejectReason',
      component: () => import('@/views/info/prtnrejectreason/index.vue'),
      meta: {
         pageTitle: 'prtnRejectReason',
         breadcrumb: [
            {
               text: 'Info'
            },
            {
               text: 'prtnRejectReason',
               active: true
            }
         ]
      }
   },
   {
      path: '/info/prtnrejectreason/edit/id=:id',
      name: 'EditPrtnRejectReason',
      component: () => import('@/views/info/prtnrejectreason/edit.vue'),
      meta: {
         pageTitle: 'prtnRejectReason',
         breadcrumb: [
            {
               text: 'Info'
            },
            {
               text: 'prtnRejectReason',
               active: true
            }
         ]
      }
   },
   {
      path: '/info/mfy',
      name: 'Mfy',
      component: () => import('@/views/info/mfy/index.vue'),
      meta: {
         pageTitle: 'mfy',
         breadcrumb: [
            {
               text: 'Info'
            },
            {
               text: 'mfy',
               active: true
            }
         ]
      }
   },
   {
      path: '/info/mfy/edit/id=:id',
      name: 'EditMfy',
      component: () => import('@/views/info/mfy/edit.vue'),
      meta: {
         pageTitle: 'mfy',
         breadcrumb: [
            {
               text: 'Info'
            },
            {
               text: 'mfy',
               active: true
            }
         ]
      }
   },

   {
      path: '/info/country',
      name: 'country',
      component: () => import('@/views/info/country/index.vue'),
      meta: {
         pageTitle: 'Country',
         breadcrumb: [
            {
               text: 'Info'
            },
            {
               text: 'Country',
               active: true
            }
         ]
      }
   },

   {
      path: '/info/country/edit/id=:id',
      name: 'EditCountry',
      component: () => import('@/views/info/country/edit.vue'),
      meta: {
         pageTitle: 'country',
         breadcrumb: [
            {
               text: 'Info'
            },
            {
               text: 'country',
               active: true
            }
         ]
      }
   },

   {
      path: '/info/contractor',
      name: 'Contractor',
      component: () => import('@/views/info/contractor/index.vue'),
      meta: {
         pageTitle: 'Contractor',
         breadcrumb: [
            {
               text: 'Info'
            },
            {
               text: 'Contractor',
               active: true
            }
         ]
      }
   },

   {
      path: '/info/contractor/view/id=:id',
      name: 'ViewContractor',
      component: () => import('@/views/info/contractor/view.vue'),
      meta: {
         pageTitle: 'Contractor',
         breadcrumb: [
            {
               text: 'Info'
            },
            {
               text: 'contractor',
               active: true
            }
         ]
      }
   },
   {
      path: '/info/district',
      name: 'District',
      component: () => import('@/views/info/district/index.vue'),
      meta: {
         pageTitle: 'Region',
         breadcrumb: [
            {
               text: 'Info'
            },
            {
               text: 'Region',
               active: true
            }
         ]
      }
   },
   {
      path: '/info/district/edit/id=:id',
      name: 'EditDistrict',
      component: () => import('@/views/info/district/edit.vue'),
      meta: {
         pageTitle: 'District',
         breadcrumb: [
            {
               text: 'Info'
            },
            {
               text: 'District',
               active: true
            }
         ]
      }
   },
   {
      path: '/info/oked',
      name: 'oked',
      component: () => import('@/views/info/oked/index.vue'),
      meta: {
         pageTitle: 'Oked',
         breadcrumb: [
            {
               text: 'Info'
            },
            {
               text: 'Oked',
               active: true
            }
         ]
      }
   },
   {
      path: '/info/region',
      name: 'region',
      component: () => import('@/views/info/region/index.vue'),
      meta: {
         pageTitle: 'Oblast',
         breadcrumb: [
            {
               text: 'Info'
            },
            {
               text: 'Oblast',
               active: true
            }
         ]
      }
   },
   {
      path: '/info/region/edit/id=:id',
      name: 'EditRegion',
      component: () => import('@/views/info/region/edit.vue'),
      meta: {
         pageTitle: 'region',
         breadcrumb: [
            {
               text: 'Info'
            },
            {
               text: 'region',
               active: true
            }
         ]
      }
   },
   {
      path: '/info/organizationlegalform',
      name: 'OrganizationLegalForm',
      component: () => import('@/views/info/organizationlegalform/index.vue'),
      meta: {
         pageTitle: 'OrganizationLegalForm',
         breadcrumb: [
            {
               text: 'Info'
            },
            {
               text: 'OrganizationLegalForm',
               active: true
            }
         ]
      }
   },
   {
      path: '/info/organizationlegalform/edit/id=:id',
      name: 'EditOrganizationLegalForm',
      component: () => import('@/views/info/organizationlegalform/edit.vue'),
      meta: {
         pageTitle: 'OrganizationLegalForm',
         breadcrumb: [
            {
               text: 'Info'
            },
            {
               text: 'OrganizationLegalForm',
               active: true
            }
         ]
      }
   },
   {
      path: '/info/relativedegree',
      name: 'RelativeDegree',
      component: () => import('@/views/info/relativedegree/index.vue'),
      meta: {
         pageTitle: 'RelativeDegree',
         breadcrumb: [
            {
               text: 'Info'
            },
            {
               text: 'RelativeDegree',
               active: true
            }
         ]
      }
   },
   {
      path: '/info/relativedegree/edit/id=:id',
      name: 'EditRelativeDegree',
      component: () => import('@/views/info/relativedegree/edit.vue'),
      meta: {
         pageTitle: 'RelativeDegree',
         breadcrumb: [
            {
               text: 'Info'
            },
            {
               text: 'RelativeDegree',
               active: true
            }
         ]
      }
   },
   {
      path: '/info/identitydocument',
      name: 'IdentityDocument',
      component: () => import('@/views/info/identitydocument/index.vue'),
      meta: {
         pageTitle: 'IdentityDocument',
         breadcrumb: [
            {
               text: 'Info'
            },
            {
               text: 'IdentityDocument',
               active: true
            }
         ]
      }
   },
   {
      path: '/info/identitydocument/edit/id=:id',
      name: 'EditIdentityDocument',
      component: () => import('@/views/info/identitydocument/edit.vue'),
      meta: {
         pageTitle: 'IdentityDocument',
         breadcrumb: [
            {
               text: 'Info'
            },
            {
               text: 'IdentityDocument',
               active: true
            }
         ]
      }
   },
   {
      path: '/info/workschedule',
      name: 'WorkSchedule',
      component: () => import('@/views/info/workschedule/index.vue'),
      meta: {
         pageTitle: 'WorkSchedule',
         breadcrumb: [
            {
               text: 'Info'
            },
            {
               text: 'WorkSchedule',
               active: true
            }
         ]
      }
   },
   {
      path: '/info/workschedule/edit/id=:id',
      name: 'EditWorkSchedule',
      component: () => import('@/views/info/workschedule/edit.vue'),
      meta: {
         pageTitle: 'WorkSchedule',
         breadcrumb: [
            {
               text: 'Info'
            },
            {
               text: 'WorkSchedule',
               active: true
            }
         ]
      }
   },
   {
      path: '/info/department',
      name: 'Department',
      component: () => import('@/views/info/department/index.vue'),
      meta: {
         pageTitle: 'Department',
         breadcrumb: [
            {
               text: 'Info'
            },
            {
               text: 'Department',
               active: true
            }
         ]
      }
   },
   {
      path: '/info/department/edit/id=:id',
      name: 'EditDepartment',
      component: () => import('@/views/info/department/edit.vue'),
      meta: {
         pageTitle: 'Department',
         breadcrumb: [
            {
               text: 'Info'
            },
            {
               text: 'Department',
               active: true
            }
         ]
      }
   },
   // ombudsman 2
   {
      path: '/info/fctrlformcontrol',
      name: 'FctrlFormControl',
      component: () => import('@/views/info/fctrlformcontrol/index.vue'),
      meta: {
         pageTitle: 'fctrlformcontrol',
         breadcrumb: [
            {
               text: 'Info'
            },
            {
               text: 'fctrlformcontrol',
               active: true
            }
         ]
      }
   },
   {
      path: '/info/fctrlformcontrol/edit/id=:id',
      name: 'EditFctrlFormControl',
      component: () => import('@/views/info/fctrlformcontrol/edit.vue'),
      meta: {
         pageTitle: 'fctrlformcontrol',
         breadcrumb: [
            {
               text: 'Info'
            },
            {
               text: 'fctrlformcontrol',
               active: true
            }
         ]
      }
   },
   {
      path: '/info/fctrlformcontrolref',
      name: 'FctrlFormControlRef',
      component: () => import('@/views/info/fctrlformcontrolref/index.vue'),
      meta: {
         pageTitle: 'fctrlformcontrolref',
         breadcrumb: [
            {
               text: 'Info'
            },
            {
               text: 'fctrlformcontrolref',
               active: true
            }
         ]
      }
   },
   {
      path: '/info/fctrlformcontrolref/edit/id=:id',
      name: 'EditFctrlFormControlRef',
      component: () => import('@/views/info/fctrlformcontrolref/edit.vue'),
      meta: {
         pageTitle: 'fctrlformcontrolref',
         breadcrumb: [
            {
               text: 'Info'
            },
            {
               text: 'fctrlformcontrolref',
               active: true
            }
         ]
      }
   },
   {
      path: '/info/applicationclassification',
      name: 'ApplicationClassification',
      component: () => import('@/views/info/applicationclassification/index.vue'),
      meta: {
         pageTitle: 'applicationclassification',
         breadcrumb: [
            {
               text: 'Info'
            },
            {
               text: 'applicationclassification',
               active: true
            }
         ]
      }
   },
   {
      path: '/info/applicationclassification/edit/id=:id',
      name: 'EditApplicationClassification',
      component: () => import('@/views/info/applicationclassification/edit.vue'),
      meta: {
         pageTitle: 'applicationclassification',
         breadcrumb: [
            {
               text: 'Info'
            },
            {
               text: 'applicationclassification',
               active: true
            }
         ]
      }
   },
   {
      path: '/info/applicationclassification2',
      name: 'ApplicationClassification2',
      component: () => import('@/views/info/applicationclassification2/index.vue'),
      meta: {
         pageTitle: 'applicationclassification',
         breadcrumb: [
            {
               text: 'Info'
            },
            {
               text: 'applicationclassification',
               active: true
            }
         ]
      }
   },
   // video category
   {
      path: '/info/videocategory',
      name: 'VideoCategory',
      component: () => import('@/views/info/videocategory/index.vue'),
      meta: {
         pageTitle: 'VideoCategory',
         breadcrumb: [
            {
               text: 'Info'
            },
            {
               text: 'VideoCategory',
               active: true
            }
         ]
      }
   },
   {
      path: '/info/videocategory/edit/id=:id',
      name: 'EditVideoCategory',
      component: () => import('@/views/info/videocategory/edit.vue'),
      meta: {
         pageTitle: 'VideoCategory',
         breadcrumb: [
            {
               text: 'Info'
            },
            {
               text: 'VideoCategory',
               active: true
            }
         ]
      }
   },
   // video lesson
   {
      path: '/info/videolesson',
      name: 'VideoLesson',
      component: () => import('@/views/info/videolesson/index.vue'),
      meta: {
         pageTitle: 'VideoLesson',
         breadcrumb: [
            {
               text: 'Info'
            },
            {
               text: 'VideoLesson',
               active: true
            }
         ]
      }
   },
   {
      path: '/info/videolesson/edit/id=:id',
      name: 'EditVideoLesson',
      component: () => import('@/views/info/videolesson/edit.vue'),
      meta: {
         pageTitle: 'VideoLesson',
         breadcrumb: [
            {
               text: 'Info'
            },
            {
               text: 'VideoLesson',
               active: true
            }
         ]
      }
   },
   // news
   {
      path: '/info/news',
      name: 'News',
      component: () => import('@/views/info/news/index.vue'),
      meta: {
         pageTitle: 'News',
         breadcrumb: [
            {
               text: 'Info'
            },
            {
               text: 'News',
               active: true
            }
         ]
      }
   },
   {
      path: '/info/news/edit/id=:id',
      name: 'EditNews',
      component: () => import('@/views/info/news/edit.vue'),
      meta: {
         pageTitle: 'News',
         breadcrumb: [
            {
               text: 'Info'
            },
            {
               text: 'News',
               active: true
            }
         ]
      }
   },
   // faq
   {
      path: '/info/faq',
      name: 'Faq',
      component: () => import('@/views/info/faq/index.vue'),
      meta: {
         pageTitle: 'Faq',
         breadcrumb: [
            {
               text: 'Info'
            },
            {
               text: 'Faq',
               active: true
            }
         ]
      }
   },
   {
      path: '/info/faq/edit/id=:id',
      name: 'EditFaq',
      component: () => import('@/views/info/faq/edit.vue'),
      meta: {
         pageTitle: 'Faq',
         breadcrumb: [
            {
               text: 'Info'
            },
            {
               text: 'Faq',
               active: true
            }
         ]
      }
   }
];
