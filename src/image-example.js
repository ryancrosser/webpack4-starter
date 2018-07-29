import codeURL from './images/code.png';
import text from './assets/test.txt';

console.log(text); // eslint-disable-line

// console.log(codeURL);
const img = document.createElement('img');
img.src = codeURL;
img.style = 'background: #2B3A42; padding: 20px';
img.width = 32;
document.body.appendChild(img);
