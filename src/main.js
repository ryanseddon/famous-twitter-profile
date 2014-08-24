'use strict';
// import dependencies
require('famous.css');
require('./styles/app.css');
require('famous-polyfills');

var Engine        = require('Engine');
var View          = require('View');
var Surface         = require('Surface');
var ImageSurface      = require('ImageSurface');
var ContainerSurface    = require('ContainerSurface');
var Transform       = require('Transform');
var StateModifier     = require('StateModifier');
var HeaderFooterLayout  = require('HeaderFooterLayout');
var FlexibleLayout    = require('FlexibleLayout');
var Easing        = require('Easing');

var GenericSync       = require('GenericSync');
var MouseSync       = require('MouseSync');
var TouchSync       = require('TouchSync');
GenericSync.register({'mouse': MouseSync, 'touch': TouchSync});

var mainContext = Engine.createContext();
var appView = new View();
var canopyView = new View();
var timelineView = new View();

var defaultRatio = [1.2, 1.4];

var layout = new HeaderFooterLayout({
  headerSize: 44,
  footerSize: 44
});

var sync = new GenericSync(
  ['mouse', 'touch'],
  {direction : GenericSync.DIRECTION_Y}
);

var flex = new FlexibleLayout({
  direction: 1,
  ratios: defaultRatio
});

var profileCanopyContainer = new ContainerSurface();
var profileCanopy = new Surface({
  classes: ['ProfileCanopy'],
  size: [undefined, undefined]
});
var profileCanopyModifier = new StateModifier();

var avatar = new ImageSurface({
  content: 'https://pbs.twimg.com/profile_images/487037479078227969/j2TTmx2H_400x400.jpeg',
  size: [70, 70],
  classes: ['ProfileCanopy-avatar']
});
var avatarModifier = new StateModifier({
  origin: [0.5, 0.5],
  align: [0.5, 0.5]
});
var name = new Surface({
  content: '<h1>Ryan Seddon</h1>'
});
var nameModifier = new StateModifier({
  origin: [0.5, 0.5],
  align: [0.5, 0.5]
});

canopyView._add(profileCanopyModifier).add(profileCanopy);
canopyView._add(avatarModifier).add(avatar);
//canopyView._add(nameModifier).add(name);

var timeline = new ImageSurface({
  content: require('./assets/timeline.png'),
  classes: ['timeline'],
  size: [undefined, 212]
});
var timelineModifier = new StateModifier();
timelineView._add(timelineModifier).add(timeline);

flex.sequenceFrom([canopyView, timelineView]);

appView.add(flex);
Engine.pipe(sync);

sync.on('update', function(data) {
   var curRatios = flex._ratios.state,
     pos = (data.position/100)/100,
     ratios = [Math.min(2, curRatios[0] + pos), Math.max(1, curRatios[1] - pos)];

  if(data.position > 0) {
    flex.setRatios(ratios);
  }
});

sync.on('end', function() {
  flex.setRatios(defaultRatio, {curve: Easing.outQuad, duration: 300});
});

layout.header.add(new ImageSurface({
  size: [undefined, 44],
  content: require('./assets/header.png'),
  classes: ['header']
}));

layout.content.add(appView);

layout.footer.add(new ImageSurface({
  size: [undefined, 44],
  content: require('./assets/footer.png'),
  classes: ['footer']
}));

mainContext.add(layout);

