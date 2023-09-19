import * as fs from 'fs';
import { createCanvas } from 'canvas';
import svg2img from 'svg2img';
import svgCaptcha from 'svg-captcha';

// Generate a CAPTCHA image
const captchaOptions = {
  size: 6, // Increase character length
  noise: 2, // Add noise
  color: true, // Use random font colors
  background: '#f0f0f0', // Set a background color
  width: 400, // Width of the image
  height: 100, // Height of the image
  fontSize: 70, // Font size
  charPreset: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', // Character set
};

const captcha = svgCaptcha.create(captchaOptions);
const correctCaptchaText = captcha.text; // Store the correct answer

// Create a canvas
const image = createCanvas(captchaOptions.width, captchaOptions.height);
const ctx = image.getContext('2d');

ctx.antialias = 'gray';
ctx.fillStyle = captchaOptions.background;
ctx.fillRect(0, 0, captchaOptions.width, captchaOptions.height);

// Randomly distort the CAPTCHA text (your distortion code here)

// Serialize the canvas to SVG
const svgData = captcha.data;

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



console.log(`Correct CAPTCHA answer: ${correctCaptchaText}`);

