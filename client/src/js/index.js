import { Workbox } from 'workbox-window';
import Editor from './editor';
import './database';
import '../css/style.css';

const main = document.querySelector('#main');
main.innerHTML = '';

const loadSpinner = () => {
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  spinner.innerHTML = `
  <div class="loading-container">
  <div class="loading-spinner" />
  </div>
  `;
  main.appendChild(spinner);
};

const editor = new Editor();

if (typeof editor === 'undefined') {
  loadSpinner();
}

// Check if service workers are supported
try {
  if ('serviceWorker' in navigator) {
    // Use the window load event to keep the page load performant
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/src-sw.js');
    });
  }

  // if ('serviceWorker' in navigator) {
  //   // register workbox service worker
  //   const workboxSW = new Workbox('./src-sw.js');
  //   const registration = workboxSW.register();
  //   console.log("sw registered", registration)
  // } else {
  //   console.error('Service workers are not supported in this browser.');
  // }
} catch (err) {
  console.log("sw err:", err)
}

