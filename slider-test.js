if (Meteor.isClient) {
  UI.body.helpers({
    opts: function () {
      return {
        layout: [1, 2, 3, 1],
        layoutTemplate: 'layoutTemplate',
        seedTemplates: [['page1'], ['page2', 'page3'], ['page3', 'page4', 'page1'], ['page4']]
      };
    }
  });

  Template.page1.events({
  	'click [data-action="quick-move"]': function () {
  		Meteor.PageSlider.transitionTo([1, 0], 'page4');

  	},
  	'click [data-action="slow-move"]': function () {
  		Meteor.PageSlider.transitionTo([1, 0], 'page3', {}, [waitForMe(2000), waitForMe(1000)]);

  	}
  });

  var templateRegex = /page(\d+)/,
  	  pageNames = ['null', 'one', 'two', 'three', 'four'];

  Template.layoutTemplate.helpers({
  	templateIndex: function () {
  		var regexRes = templateRegex.exec(this.template),
  			num = regexRes ? regexRes[1] : '0'
  		return pageNames[parseInt(num, 10)];
  	}
  });

  waitForMe = function(time) {
  	var done = false,
  		dep = new Tracker.Dependency();

  	Meteor.setTimeout(function() {
  		done = true;
  		dep.changed();
  	}, time);

  	return {
  		ready: function() {
  			dep.depend();
  			return done;
  		}
  	}
  }

}
