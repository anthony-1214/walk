const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const fs = require('fs');

const html = fs.readFileSync('/tmp/boids_concept.html', 'utf8');

const prefix = `
  // Mock Date.now to test deterministically
  // Date.now = () => 1000;
  
  // Intercept fillRect to see if anything is drawn
  const originalArc = CanvasRenderingContext2D.prototype.arc;
  CanvasRenderingContext2D.prototype.arc = function(...args) {
     if(isNaN(args[0]) || isNaN(args[1])) console.log("NaN in arc!", args);
     originalArc.apply(this, args);
  }
`;

const dom = new JSDOM(html, { runScripts: "dangerously", resources: "usable" });
dom.window.addEventListener('load', () => {
   console.log("Loaded. Boids:", dom.window.flock.length);
   if(dom.window.flock[0]) {
       console.log("Boid0 pos:", dom.window.flock[0].pos);
       console.log("Boid0 vel:", dom.window.flock[0].vel);
   }
});
