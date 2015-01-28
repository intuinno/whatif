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
        'Specifically, is there something <em>isomorphic</em> it should be doing?'
      ]
    }
  },
  {
    location: [8, 1],
    seedTemplate: 'page',
    layoutClass: 'pagecol2',
    moveable: null,
    data: {
      heading: 'github.com/richsilv/meteor-page-swiper<br>github.com/richsilv/swiper-demo',
    }
  }
];