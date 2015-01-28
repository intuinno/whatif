configuration = [
  {
    location: [0, 0],
    seedTemplate: 'page',
    layoutClass: 'pagecol1',
    onTransitioned: null,
    moveable: null,
    data: {
      heading: 'Meteor Page-Swiper',
      subheading: 'Because we all love a good swipe'
    }
  },
  {
    location: [1, 0],
    seedTemplate: 'page',
    layoutClass: 'pagecol1',
    onTransitioned: null,
    moveable: null,
    data: {
      heading: 'Why?',
      bullets: [
        'Genuine single-page site laid out in a grid',
        'Swipe between pages',
        'Simpler and more natural (but more limited) than Iron-Router solutions (e.g. Momentum)',
        'More Meteoric than repurposing an existing front-end package'
      ]
    }
  },
  {
    location: [2, 0],
    seedTemplate: 'page',
    layoutClass: 'pagecol1',
    onTransitioned: null,
    moveable: null,
    data: {
      heading: 'Primary direction is horizontal',
    }
  },
  {
    location: [3, 0],
    seedTemplate: 'page',
    layoutClass: 'pagecol1',
    onTransitioned: null,
    moveable: {
      up: true,
      down: true,
      left: true,
      right: false
    },
    data: {
      heading: "Secondary direction is vertical",
      subheading: '...and I might add the option to reverse these'
    }
  },
  {
    location: [3, 1],
    seedTemplate: 'page',
    layoutClass: 'pagecol2',
    onTransitioned: null,
    moveable: null,
    data: {
      heading: 'Easy to customise the appearance',
      bullets: [
        'Specify CSS classes to be added to each page',
        'Custom arrow colours',
        'Layout template (see bottom-right)'
      ]
    },
    arrowCol: 'green'
  },
  {
    location: [4, 0],
    seedTemplate: 'page',
    layoutClass: 'pagecol2',
    onTransitioned: function(oldPage, newPage) {
      Meteor.setTimeout(function() {alert('Welcome to page ' + newPage);}, 1000);
    },
    moveable: null,
    data: {
      heading: 'Callbacks when you arrive at a new page',
    },
  },
  {
    location: [5, 0],
    seedTemplate: 'choice-page',
    layoutClass: 'pagecol3',
    moveable: {
      right: false,
      left: true,
      up: true,
      down: true
    },
    data: null
  },
  {
    location: [6, 0],
    seedTemplate: null,
    layoutClass: 'pagecol4',
    moveable: null,
    data: null
  },
  {
    location: [7, 0],
    seedTemplate: 'moveable-buttons',
    layoutClass: 'pagecol6',
    moveable: {
      up: false,
      down: false,
      left: false,
      right: false
    },
    data: null
  },
  {
    location: [8, 0],
    seedTemplate: 'page',
    layoutClass: 'pagecol1',
    moveable: null,
    data: {
      heading: 'Questions',
      bullets: [
        'Is it potentially useful?',
        'What else should it be doing?',
        'Specifically, is there something ISOMORPHIC it should be doing?'
      ]
    }
  }
];

People = new Mongo.Collection('people');

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

if (Meteor.isServer) {

  faker = Meteor.npmRequire('faker');

  if (!People.find().count()) {
    Array.apply(0, Array(10)).forEach(function() {
      person = {
        name: faker.name.findName(),
        email: faker.internet.email(),
        phone: faker.phone.phoneNumber(),
        avatar: faker.image.avatar(),
        street: faker.address.streetName(),
        city: faker.address.city(),
        zipcode: faker.address.zipCode(),
        companyName: faker.company.companyName(),
        companyCatchPhrase: faker.company.catchPhrase()
      }
      People.insert(person);
    });
  }

  Meteor.publish('basic_info', function() {
    return People.find({}, {fields: {name: 1, city: 1, companyName: 1}});
  });

  Meteor.publish('all_info', function(id) {
    return People.find(id);
  });
}