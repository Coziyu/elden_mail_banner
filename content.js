/*// in modo che non si blocchi quando cambia scena
const bannerImgUrl = chrome.runtime.getURL("assets/email_sent_yellow.png");
const soundUrl = chrome.runtime.getURL("assets/elden_ring_sound.mp3");


function showEldenRingBanner() {
    console.log("Banner function called");

    chrome.storage.sync.get(["soundEnabled", "bannerColor"], (prefs) => {
        const bannerColor = prefs.bannerColor || "yellow";
        const soundEnabled = prefs.soundEnabled !== false;

        const banner = document.createElement('div');
        banner.id = 'elden-ring-banner';
        banner.innerHTML = `<img src="${chrome.runtime.getURL(`assets/email_sent_${bannerColor}.png`)}" alt="Email Sent">`;
        document.body.appendChild(banner);
        console.log("Banner appended");

        if (soundEnabled) {
            const audio = new Audio(chrome.runtime.getURL('assets/elden_ring_sound.mp3'));
            audio.volume = 0.35;
            audio.play().catch(err => console.error("Errore nel suono:", err));
        }

        setTimeout(() => banner.classList.add('show'), 50);
        setTimeout(() => {
            banner.classList.remove('show');
            setTimeout(() => banner.remove(), 500);
        }, 3000);
    });
}




// Gmail observer
const gmailObserver = new MutationObserver(() => {
    const sendButtons = document.querySelectorAll('[aria-label^="Invia"], [data-tooltip^="Invia"]');
    sendButtons.forEach(btn => {
        if (!btn.dataset.eldenRingAttached) {
            btn.addEventListener('click', () => {
                console.log("Gmail send button clicked");
                setTimeout(showEldenRingBanner, 500);
            });
            btn.dataset.eldenRingAttached = "true";
        }
    });
});
gmailObserver.observe(document.body, { childList: true, subtree: true });

// Outlook observer
const outlookObserver = new MutationObserver(() => {
    const sendBtn = document.querySelector('button[title="Invia"]');
    if (sendBtn && !sendBtn.dataset.eldenRingAttached) {
        sendBtn.addEventListener('click', () => {
            console.log("Outlook send button clicked");
            setTimeout(showEldenRingBanner, 500);
        });
        sendBtn.dataset.eldenRingAttached = "true";
    }
});
outlookObserver.observe(document.body, { childList: true, subtree: true });
*/

// Percorsi pre-caricati
const soundUrl = chrome.runtime.getURL("assets/elden_ring_sound.mp3");

// Variabili per le impostazioni
let soundEnabled = true;
let bannerColor = "yellow";

// Carica le impostazioni all'avvio
chrome.storage.sync.get(["soundEnabled", "bannerColor"], (prefs) => {
    soundEnabled = prefs.soundEnabled !== false;
    bannerColor = prefs.bannerColor || "yellow";
});

// Aggiorna in tempo reale se cambiano dal popup
chrome.storage.onChanged.addListener((changes) => {
    if (changes.soundEnabled) {
        soundEnabled = changes.soundEnabled.newValue !== false;
    }
    if (changes.bannerColor) {
        bannerColor = changes.bannerColor.newValue || "yellow";
    }
});

function showEldenRingBanner() {
    console.log("Banner function called");

    const banner = document.createElement('div');
    banner.id = 'elden-ring-banner';
    const imgPath = chrome.runtime.getURL(`assets/email_sent_${bannerColor}.png`);
    banner.innerHTML = `<img src="${imgPath}" alt="Email Sent">`;
    document.body.appendChild(banner);
    console.log("Banner appended");

    if (soundEnabled) {
        const audio = new Audio(soundUrl);
        audio.volume = 0.35;
        audio.play().catch(err => console.error("Errore nel suono:", err));
    }

    setTimeout(() => banner.classList.add('show'), 50);
    setTimeout(() => {
        banner.classList.remove('show');
        setTimeout(() => banner.remove(), 500);
    }, 3000);
}

// Gmail observer
const gmailObserver = new MutationObserver(() => {
    const sendButtons = document.querySelectorAll('[aria-label^="Invia"], [data-tooltip^="Invia"]');
    sendButtons.forEach(btn => {
        if (!btn.dataset.eldenRingAttached) {
            btn.addEventListener('click', () => {
                console.log("Gmail send button clicked");
                setTimeout(showEldenRingBanner, 500);
            });
            btn.dataset.eldenRingAttached = "true";
        }
    });
});
gmailObserver.observe(document.body, { childList: true, subtree: true });

// Outlook observer
const outlookObserver = new MutationObserver(() => {
    const sendBtn = document.querySelector('button[title="Invia"]');
    if (sendBtn && !sendBtn.dataset.eldenRingAttached) {
        sendBtn.addEventListener('click', () => {
            console.log("Outlook send button clicked");
            setTimeout(showEldenRingBanner, 500);
        });
        sendBtn.dataset.eldenRingAttached = "true";
    }
});
outlookObserver.observe(document.body, { childList: true, subtree: true });
