import * as fs from 'fs';
import svgCaptcha from 'svg-captcha';
import svg2img from 'svg2img';


// Customize the CAPTCHA options
const captchaOptions = {
  size: 6, // Increase character length
  noise: 13, // Add noise
  color: true, // Use random font colors
  width: 400, // Width of the image
  height: 100, // Height of the image
  fontSize: 110, // Font size
  charPreset: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', // Character set
};

// Create a CAPTCHA using svg-captcha
const captcha = svgCaptcha.create(captchaOptions);
const correctCaptchaText = captcha.text;

// Number of rectangles in the background
const numRectangles = 1500; // Increase the number of rectangles

// Define the two background colors: black and white
const backgroundColor1 = 'black';
const backgroundColor2 = 'white';

// Create an SVG background with alternating black and white rectangles
let svgBackground = '';
let currentBackgroundColor = backgroundColor1;

for (let i = 0; i < numRectangles; i++) {
  const x = Math.random() * captchaOptions.width;
  const y = Math.random() * captchaOptions.height;
  const rectWidth = Math.random() * 350 + 10; // Random width between 10 and 60
  const rectHeight = Math.random() * 350 + 10; // Random height between 10 and 60

  svgBackground += `<rect x="${x}" y="${y}" width="${rectWidth}" height="${rectHeight}" fill="${currentBackgroundColor}" />`;

  // Toggle between black and white background colors
  currentBackgroundColor = currentBackgroundColor === backgroundColor1 ? backgroundColor2 : backgroundColor1;
}

// Combine the CAPTCHA and the background in an SVG
const svgData = `
  <svg width="${captchaOptions.width}" height="${captchaOptions.height}" xmlns="http://www.w3.org/2000/svg">
    ${svgBackground}
    ${captcha.data}
  </svg>
`;

// Save the SVG data as a file
fs.writeFileSync('captcha.svg', svgData);



// Save the SVG data as a file
fs.writeFileSync('captcha.svg', svgData);

// Convert SVG to PNG (optional, you can remove this part if not needed)
svg2img(svgData, function (error, buffer) {
  if (error) {
    console.error('Error converting SVG to PNG:', error);
  } else {
    fs.writeFileSync('captcha.png', buffer);
    console.log('CAPTCHA images saved as captcha.svg and captcha.png');
  }
});





console.log('CAPTCHA image with alternating black and white rectangle background saved as captcha.svg');

