if (Meteor.isClient) {

  Meteor.subscribe('basic_info');
  var personId = new ReactiveVar(null),
      infoSub;
  Tracker.autorun(function() {
    infoSub = Meteor.subscribe('all_info', personId.get());
  });

  UI.body.helpers({
    opts: function () {
      return {
        layoutTemplate: 'layoutTemplate',
        configuration: configuration
      };
    }
  });

  Template.layoutTemplate.helpers({
    location: function() {
      return this.pageSwiper.getLocation();
    }
  });

  Template['choice-page'].helpers({
    people: function () {
      return People.find({}, {limit: 3});
    }
  });
  Template['choice-page'].events({
    'click [data-action="show-basic"]': function () {
      Meteor.PageSwiper.transitionTo(Meteor.PageSwiper.pageRight(), 'basic-info', {_id: this._id});
    },
    'click [data-action="show-all"]': function () {
      personId.set(this._id);
      Tracker.flush();
      Meteor.PageSwiper.transitionTo(Meteor.PageSwiper.pageRight(), 'all-info', {_id: this._id}, [infoSub, waitForMe(1000)]);
    }
  });


  Template['moveable-buttons'].created = function() {
    this.click = new Deps.Dependency();
  };
  Template['moveable-buttons'].helpers({
    canMoveIcon: function (direction) {
      Template.instance().click.depend();
      return this.subPage.moveable[direction] ? 'fa-check' : 'fa-times';
    }
  });
  Template['moveable-buttons'].events({
    'click [data-action="enable-swipe"]': function (evt, tmp) {
      var direction = tmp.$(evt.currentTarget).data('direction'),
          moveable = this.subPage.moveable[direction];
      this.subPage.setMoveable(direction, !moveable);
      this.subPage.ps.reposition();
      Template.instance().click.changed();
    }
  });

  Template.registerHelper('person', function() {
      return People.findOne(this._id);
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