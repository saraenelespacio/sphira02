let logo;
let gradient;
let rotX, rotY, rotZ;
let saveButton, toggleButton;
let rotXText, rotYText, rotZText; // Paragraphs for rotation degrees
let useTexture = false; // Toggle state

let myShader;

let gradientColors = [
    hexToRGB('#032461'),
    hexToRGB('#0b31b7'),
    hexToRGB('#2066a0'),
    hexToRGB('#f8b583'),
    hexToRGB('#f2e6db'),
];

let colorStops = [0.0, 0.25, 0.5, 0.75, 1.0];
// let colorStops = [0.0, 0.2, 0.3, 0.9, 1.0];

function hexToRGB(hex) {
    let r = parseInt(hex.slice(1, 3), 16) / 255;
    let g = parseInt(hex.slice(3, 5), 16) / 255;
    let b = parseInt(hex.slice(5, 7), 16) / 255;
    return [r, g, b];
}

function preload() {
    gradient = loadImage('Sphira-logo-36.png');
    logo = loadModel('Sphira-logo-11.obj', true);
    myShader = loadShader('vert.glsl', 'frag.glsl');
}

function setup() {
    createCanvas(700, 700, WEBGL);

    // Create sliders with default value set to 50 degrees (≈ 0.87 radians)
    rotX = createSlider(0, TWO_PI, radians(50), 0.01);
    rotX.position(10, height + 10);

    rotY = createSlider(0, TWO_PI, radians(50), 0.01);
    rotY.position(10, height + 40);

    rotZ = createSlider(0, TWO_PI, radians(50), 0.01);
    rotZ.position(10, height + 70);

    // Create text elements for rotation degrees
    rotXText = createP();
    rotXText.position(rotX.x + rotX.width + 10, rotX.y - 5);

    rotYText = createP();
    rotYText.position(rotY.x + rotY.width + 10, rotY.y - 5);

    rotZText = createP();
    rotZText.position(rotZ.x + rotZ.width + 10, rotZ.y - 5);

    // Create toggle button
    toggleButton = createButton('Switch color');
    toggleButton.position(10, height + 130);
    toggleButton.mousePressed(toggleMaterial);

    // Create save button
    saveButton = createButton('Save Image');
    saveButton.position(10, height + 160);
    saveButton.mousePressed(() => saveCanvas('3D_Model', 'png'));
}

function draw() {
    background('#f2f2e2');

    // Convert radians to degrees
    let degX = nf(degrees(rotX.value()), 0, 1);
    let degY = nf(degrees(rotY.value()), 0, 1);
    let degZ = nf(degrees(rotZ.value()), 0, 1);

    // Update text elements
    rotXText.html(`X: ${degX}°`);
    rotYText.html(`Y: ${degY}°`);
    rotZText.html(`Z: ${degZ}°`);

    // Apply 3D transformations
    scale(2);
    rotateX(rotX.value());
    rotateY(rotY.value());
    rotateZ(rotZ.value());

    noStroke();

    // Use the custom shader
    shader(myShader);
    for (let i = 0; i < gradientColors.length; i++) {
        myShader.setUniform(`color${i}`, gradientColors[i]);
    }
    myShader.setUniform('stops', colorStops);

    // Toggle between normal material and texture
    // if (useTexture) {
    //   texture(gradient);
    // } else {
    //   normalMaterial();
    // }

    model(logo);
}

// Toggle function
function toggleMaterial() {
    useTexture = !useTexture;
    toggleButton.html(useTexture ? 'Switch color' : 'Switch color');
}


