//Layout
let uiContainer;
let canvasContainer;

//UI
let sliders = [];
let buttons = [];
let inputs = [];


//Helix
let coils = 12; // Number of loops
let pointsPerCoil = 3000; // Number of points per loop
let totalPoints = coils * pointsPerCoil;
let radiusX = 400; // Horizontal radius of the helix
let radiusY = 40; // Vertical radius (ellipticity)
let height = 800; // Overall height of the helix
let trail = []; // Array to store trail points
let maxTrailLength = 5000; // Maximum length of the trail
let pointsPerFrame = 80; // Number of points to draw each frame
let thickness = 8;

function setup(){
  
  uiContainer = select('#ui-container');
  createUI();
  
  canvasContainer = select('#canvas-container');
  createCanvas(windowWidth-180, windowHeight);
 
  background(0);

  noSmooth();
  frameRate(240);
  fill(0);
}

function createUI() {
let uiContainer = select('#ui-container');

  // Title
  // let label0 = createP(`
  //    <span class="label-left"><img src="assets/logo.png" alt="icon" style="width:135px; vertical-align:bottom"></span>
  // `);
  // label0.class('label-container');
  // label0.parent(uiContainer);

  // // Description
  // let label1 = createP(`
  //    <span class="label-left">Drag .png / .jpg<br>to the canvas to stylize<br>a raster image, or .svg<br>to extrude a 3D model.<br><br>Rotate and zoom 3D model with mouse, move around with keyboard arrows.</span>
  // `);
  // label1.class('label-container');
  // label1.parent(uiContainer);
  
  
  // Coils Label
  let label1 = createP(`
    <span class="label-left">Витки</span>
    <span class="label-right">${coils}</span>
  `);
  label1.class('label-container');
  label1.parent(uiContainer);

  // Coils Slider
  sliders.coils = createSlider(1, 36, coils);
  sliders.coils.class('slider');
  sliders.coils.input(() => {
    coils = sliders.coils.value();
    label1.html(`
      <span class="label-left">Витки</span>
      <span class="label-right">${coils}</span>
    `);
  });
  sliders.coils.parent(uiContainer);
  
  
  
    // RadiusX Label
  let label2 = createP(`
    <span class="label-left">Ширина</span>
    <span class="label-right">${radiusX}</span>
  `);
  label2.class('label-container');
  label2.parent(uiContainer);

  // RadiusX Slider
  sliders.radiusX = createSlider(200, 600, radiusX);
  sliders.radiusX.class('slider');
  sliders.radiusX.input(() => {
    radiusX = sliders.radiusX.value();
    label2.html(`
      <span class="label-left">Ширина</span>
      <span class="label-right">${radiusX}</span>
    `);
  });
  sliders.radiusX.parent(uiContainer);
  
  
      // RadiusY Label
  let labelRadiusY = createP(`
    <span class="label-left">Высота</span>
    <span class="label-right">${radiusY}</span>
  `);
  labelRadiusY.class('label-container');
  labelRadiusY.parent(uiContainer);

  // RadiusY Slider
  sliders.radiusY = createSlider(50, 200, radiusY);
  sliders.radiusY.class('slider');
  sliders.radiusY.input(() => {
    radiusY = sliders.radiusY.value();
    labelRadiusY.html(`
      <span class="label-left">Высота</span>
      <span class="label-right">${radiusY}</span>
    `);
  });
  sliders.radiusY.parent(uiContainer);
  
  // //Trail Label
  // let label3 = createP(`
  //   <span class="label-left">trail length</span>
  //   <span class="label-right">${maxTrailLength}</span>
  // `);
  // label3.class('label-container');
  // label3.parent(uiContainer);

  // // Trail Slider
  // sliders.maxTrailLength = createSlider(0, 5000, maxTrailLength);
  // sliders.maxTrailLength.class('slider');
  // sliders.maxTrailLength.input(() => {
  //   maxTrailLength = sliders.maxTrailLength.value();
  //   label3.html(`
  //     <span class="label-left">trail length</span>
  //     <span class="label-right">${maxTrailLength}</span>
  //   `);
  // });
  // sliders.maxTrailLength.parent(uiContainer);


  
//    //Points Label
//   let label4 = createP(`
//     <span class="label-left">points per coil</span>
//     <span class="label-right">${pointsPerCoil}</span>
//   `);
//   label4.class('label-container');
//   label4.parent(uiContainer);

//   //Points Slider
//   sliders.pointsPerCoil = createSlider(1, 3000, pointsPerCoil);
//   sliders.pointsPerCoil.class('slider');
//   sliders.pointsPerCoil.input(() => {
//     pointsPerCoil = sliders.pointsPerCoil.value();
//     label4.html(`
//       <span class="label-left">points per coil</span>
//       <span class="label-right">${pointsPerCoil}</span>
//     `);
//   });
//   sliders.pointsPerCoil.parent(uiContainer);
  
     //Thickness Label
  let label5 = createP(`
    <span class="label-left">Толщина</span>
    <span class="label-right">${thickness}</span>
  `);
  label5.class('label-container');
  label5.parent(uiContainer);

  // Thickness Slider
  sliders.thickness = createSlider(1, 300, thickness);
  sliders.thickness.class('slider');
  sliders.thickness.input(() => {
    thickness = sliders.thickness.value();
    label5.html(`
      <span class="label-left">Толщина</span>
      <span class="label-right">${thickness}</span>
    `);
  });
  sliders.thickness.parent(uiContainer);
  
  //pointsPerFrame Label
  let label6 = createP(`
    <span class="label-left">Скорость</span>
    <span class="label-right">${pointsPerFrame}</span>
  `);
  label6.class('label-container');
  label6.parent(uiContainer);

  // pointsPerFrame Slider
  sliders.pointsPerFrame = createSlider(20, 200, pointsPerFrame);
  sliders.pointsPerFrame.class('slider');
  sliders.pointsPerFrame.input(() => {
    pointsPerFrame = sliders.pointsPerFrame.value();
    label6.html(`
      <span class="label-left">Cкорость</span>
      <span class="label-right">${pointsPerFrame}</span>
    `);
  });
  sliders.pointsPerFrame.parent(uiContainer);
  
}

function draw() {
  strokeWeight(thickness);
  noSmooth();
  background(0,255);
  
  // Draw multiple points per frame for speed
  for(let p = 0; p < pointsPerFrame; p++) {
    // Calculate the index of the current point based on frameCount
    let i = (frameCount * pointsPerFrame + p) % totalPoints;
    
    // Calculate the angle and position for the current point
    let angle = map(i, 0, totalPoints, 0, TWO_PI * coils);
    let x = width / 2 + cos(angle) * radiusX;
    let y = map(i, 0, totalPoints, height+150, -150);
    let z = sin(angle) * radiusY;
    
    // Add the current point to the trail array
    trail.push({ x: x, y: y + z });
    
    // Limit the trail length
    if (trail.length > maxTrailLength) {
      trail.shift();
    }
  }
  
  // Draw each point in the trail with gradually changing colors
  if (trail.length > 1) {  // Only draw if we have at least 2 points
    for (let j = 0; j < trail.length; j++) {
      let trailPoint = trail[j];
      
      // Calculate color based on the point's position in the trail
      let colorStage = j / Math.max(1, trail.length - 1);  // Prevent division by zero
      let col;
      
      if (colorStage < 0.2) {
        col = lerpColor(color(0, 0, 0), color(83, 30, 113), colorStage * 5);
      } else if (colorStage < 0.4) {
        col = lerpColor(color(83, 30, 113), color(252, 63, 29), (colorStage - 0.2) * 5);
      } else if (colorStage < 0.6) {
        col = lerpColor(color(252, 63, 29), color(255, 72, 0), (colorStage - 0.4) * 5);
      } else if (colorStage < 0.8) {
        col = lerpColor(color(255, 72, 0), color(255, 128, 0), (colorStage - 0.6) * 5);
      } else {
        col = lerpColor(color(255, 128, 0), color(255, 255, 255), (colorStage - 0.8) * 5);
      }
      
      stroke(col);
      point(trailPoint.x, trailPoint.y);
    }
  }
  
  
 
}


function createUIElement(type, variable, displayedName, min = null, max = null) {
  // Create the label
  let labelname = createP(`
    <span class="label-left">${displayedName}</span>
    <span class="label-right">${variable}</span>
  `);
  labelname.class('label-container');
  labelname.parent(uiContainer);
//   if (type === 'slider' && min !== null && max !== null) {
//     sliders[variable] = createSlider(min, max, variable);
//     sliders[variable].class('slider');
//     sliders[variable].input(() => {
//       variable = sliders[variable].value();
//       labelname.html(`
//         <span class="label-left">${displayedName}</span>
//         <span class="label-right">${variable}</span>
//       `);
//     });
//     sliders[variable].parent(uiContainer);
//   }

}