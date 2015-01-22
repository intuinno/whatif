if (Meteor.isClient) {
  UI.body.helpers({
    opts: function () {
      return {
        layout: [1, 2, 3, 1], 
        seedTemplates: [['page1'], ['page2', 'page3'], ['page3', 'page4', 'page1'], ['page4']]
      };
    }
  });
}
