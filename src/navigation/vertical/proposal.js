export default [
   {
      header: 'Proposal1',
      visible: ['ProposalView']
   },
   {
      title: 'Proposal',
      icon: 'SettingsIcon',
      visible: ['ProposalView'],
      children: [
         {
            title: 'Proposal',
            route: 'Proposal',
            visible: 'ProposalView'
         }
      ]
   }
];
