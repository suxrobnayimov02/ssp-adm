export default [
   {
      path: '/proposal/proposal',
      name: 'Proposal',
      component: () => import('@/views/proposal/proposal/index.vue'),
      meta: {
         pageTitle: 'Proposal',
         breadcrumb: [
            {
               text: 'Document'
            },
            {
               text: 'Proposal',
               active: true
            }
         ]
      }
   },
   {
      path: '/proposal/proposal/edit/id=:id',
      name: 'EditProposal',
      component: () => import('@/views/proposal/proposal/edit.vue'),
      meta: {
         pageTitle: 'Proposal',
         breadcrumb: [
            {
               text: 'Document'
            },
            {
               text: 'Proposal',
               active: true
            }
         ]
      }
   },
   {
      path: "/proposal/proposal/view/id=:id",
      name: "ViewProposal",
      component: () => import("@/views/proposal/proposal/view.vue"),
      meta: {
        pageTitle: "ViewProposal",
        breadcrumb: [
          {
            text: "proposal",
          },
          {
            text: "ViewProposal",
            active: true,
          },
        ],
      },
    },
];
