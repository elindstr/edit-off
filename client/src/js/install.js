const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// Adds an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    console.log('beforeinstallprompt fired', event);
    window.deferredPrompt = event;
    console.log('deferredPrompt set', window.deferredPrompt);
    butInstall.classList.toggle('hidden', false);
  });

// Implements a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    console.log('install click')

    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
        console.log('no promptEvent')
     return;
    }

    console.log('triggering prompt')
    promptEvent.prompt();
    window.deferredPrompt = null;
    butInstall.classList.toggle('hidden', true);
});

// Adds a handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    window.deferredPrompt = null;
});
