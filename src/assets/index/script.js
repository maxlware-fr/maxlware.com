// M   M  AAAAA  X   X  L      W   W  AAAAA  RRRR   EEEEE
// MM MM  A   A   X X   L      W   W  A   A  R   R  E
// M M M  AAAAA    X    L      W W W  AAAAA  RRRR   EEE
// M   M  A   A   X X   L      WW WW  A   A  R  R   E
// M   M  A   A  X   X  LLLLL  W   W  A   A  R   R  EEEEE

document.addEventListener('DOMContentLoaded', function() {
      const elements = document.querySelectorAll('.typewriter');
      elements.forEach(el => {
        const text = el.textContent;
        let i = 0;
        el.textContent = '';
        const typing = setInterval(function() {
          if (i < text.length) {
            el.textContent += text.charAt(i);
            i++;
          } else {
            clearInterval(typing);
          }
        }, 100);
      });
    });

  const partenaires = [
    { logo: "assets/Nathxn_Azuur.png", lien: "https://nathxnazuur.fr/"},
    { logo: "assets/logo_iptron.png", lien: "https://iptron.xyz" },
    { logo: "assets/logo_cloud.png", lien: "https://cryptdev.fr" },
  ];

  const img = document.querySelector(".diapo img");
  const lien = document.querySelector(".diapo a");
  let index = 0;

  function nextLogo() {
    index = (index + 1) % partenaires.length;
    img.style.opacity = "0";
    setTimeout(() => {
      img.src = partenaires[index].logo;
      lien.href = partenaires[index].lien;
      img.style.opacity = "1";
    }, 400);
  }

  setInterval(nextLogo, 3000);


(() => {
  const secret = ['a', 'd', 'a', 'm'];
  let pos = 0;

  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const audioCtx = new (AudioContext)();

  function playKeyClick() {
    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(2400, now);
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.08);
  }

  function activateEasterEgg() {
    document.documentElement.style.setProperty('--dark', '#ff66b2');
    const title = document.querySelector('.title');
    if (title) title.textContent = 'Adam <3';
  }

  window.addEventListener('keydown', async (e) => {
    if (audioCtx.state === 'suspended') await audioCtx.resume();

    const key = e.key.toLowerCase();
    if (key.length !== 1) return;

    playKeyClick();

    if (key === secret[pos]) {
      pos++;
      if (pos === secret.length) {
        activateEasterEgg();
        pos = 0;
      }
    } else {
      pos = 0;
    }
  });
})();

async function fetchAndDisplayNotification() {
    try {
        const response = await fetch('https://api.maxlware.com/v1/com/notification');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.actived === "true") {
            const existingBanner = document.getElementById('notification-banner');
            if (existingBanner) {
                existingBanner.remove();
            }
            
            createNotificationBanner(data);
        }
    } catch (error) {
        console.error('Erreur lors de la récupération de la notification:', error);
    }
}

function createNotificationBanner(notificationData) {
    const banner = document.createElement('div');
    banner.className = 'notification-banner';
    banner.id = 'notification-banner';
    
    if (notificationData.marker) {
        banner.setAttribute('data-marker', notificationData.marker.toLowerCase());
    }
    
    banner.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${notificationData.message || ''}</span>
            ${notificationData.autor ? `<span class="notification-author">— ${notificationData.autor}</span>` : ''}
        </div>
        <button class="close-notification" id="close-notification" aria-label="Fermer la notification">×</button>
    `;
    
    document.body.appendChild(banner);
    
    setTimeout(() => {
        banner.classList.add('show');
    }, 100);
    
    const closeButton = banner.querySelector('#close-notification');
    closeButton.addEventListener('click', () => {
        closeNotification(banner);
    });
}

function closeNotification(banner) {
    banner.classList.remove('show');
    banner.classList.add('hide');
    
    setTimeout(() => {
        if (banner.parentNode) {
            banner.remove();
        }
    }, 300);
}

function shouldShowNotification() {
    const lastClosed = localStorage.getItem('notificationLastClosed');
    if (lastClosed) {
        const lastClosedDate = new Date(lastClosed);
        const now = new Date();
        const hoursDiff = (now - lastClosedDate) / (1000 * 60 * 60);
        
        if (hoursDiff < 24) {
            return false;
        }
    }
    return true;
}

function saveCloseTime() {
    localStorage.setItem('notificationLastClosed', new Date().toISOString());
}

function initNotification() {
    if (shouldShowNotification()) {
        fetchAndDisplayNotification();
    }
}

document.addEventListener('DOMContentLoaded', initNotification);


async function fetchWeather() {
  const widget = document.getElementById('weather-widget');
  if (!widget) return;

  try {
    const geoRes = await fetch('https://api.maxlware.com/v1/com/geo');
    if (!geoRes.ok) throw new Error('Géolocalisation échouée');
    const geoData = await geoRes.json();

    const rawCity = geoData.city || 'Paris';
    const city = rawCity.replace(/\s+/g, '-');

    const meteoRes = await fetch(`https://api.maxlware.com/v1/com/meteo?city=${encodeURIComponent(city)}`);
    if (!meteoRes.ok) throw new Error('API météo indisponible');
    const meteo = await meteoRes.json();

    const iconMap = {
      soleil: 'assets/soleil.png',
      nuage:  'assets/nuage.png',
      pluie:  'assets/pluie.png',
    };
    const iconSrc = iconMap[meteo.weather_category] || 'assets/nuage.png';

    widget.innerHTML = `
      <div class="weather-content">
        <div class="weather-top">
          <img class="weather-icon" src="${iconSrc}" alt="${meteo.weather_category}">
          <div>
            <div class="weather-temp">${Math.round(meteo.temperature)}<span>°C</span></div>
            <div class="weather-cat">${meteo.weather_category}</div>
          </div>
        </div>
        <div class="weather-city">📍 ${meteo.city}, ${meteo.country}</div>
        <div class="weather-source">${meteo.source}</div>
      </div>
    `;
  } catch (err) {
    console.warn('Météo non disponible :', err.message);
    widget.innerHTML = `<div class="weather-error">Météo indisponible</div>`;
  }
}

document.addEventListener('DOMContentLoaded', fetchWeather);



let activiteTickInterval = null;

async function fetchActivity() {
  const container = document.getElementById('activite-content');
  if (!container) return;

  if (activiteTickInterval) {
    clearInterval(activiteTickInterval);
    activiteTickInterval = null;
  }

  try {
    const res = await fetch('https://api.maxlware.com/v1/com/time');
    if (!res.ok) throw new Error('API indisponible');
    const data = await res.json();

    const apps = Array.isArray(data.app) && data.app.length > 0 ? data.app : null;

    const fetchedAt = Date.now();
    const serverMs = data.time * 1000;
    const offset = serverMs - fetchedAt;

    function buildTimeHTML() {
      const now = new Date(Date.now() + offset);
      const hours = now.getHours();
      const isDay = hours >= 7 && hours < 20;
      return {
        timeStr: now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        dateStr: now.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
        dayNightIcon: isDay ? 'assets/jour.png' : 'assets/nuit.png',
        dayNightLabel: isDay ? 'Jour' : 'Nuit',
      };
    }

    const { timeStr, dateStr, dayNightIcon, dayNightLabel } = buildTimeHTML();

    container.innerHTML = `
      <div class="activite-grid">

        <div class="activite-time-card">
          <div class="activite-time-top">
            <img src="${dayNightIcon}" alt="${dayNightLabel}" class="activite-daynight-icon" id="activite-daynight-icon">
            <div>
              <div class="activite-time-value" id="activite-time-value">${timeStr}</div>
              <div class="activite-date-value" id="activite-date-value">${dateStr}</div>
            </div>
          </div>
          <div class="activite-timezone">🌍 Europe/Paris</div>
        </div>

        ${apps ? `
        <div class="activite-app-card">
          <span class="activite-app-label">Application en cours</span>
          <div class="activite-app-inner">
            <img src="${apps[0].logo}" alt="${apps[0].name}" class="activite-app-logo">
            <span class="activite-app-name">${apps[0].name}</span>
          </div>
          ${apps.length > 1 ? `
          <div class="activite-app-others">
            ${apps.slice(1).map(a => `
              <div class="activite-app-other">
                <img src="${a.logo}" alt="${a.name}" class="activite-app-logo-sm">
                <span>${a.name}</span>
              </div>
            `).join('')}
          </div>` : ''}
        </div>
        ` : `
        <div class="activite-app-card activite-app-idle">
          <span class="activite-app-label">Application en cours</span>
          <div class="activite-app-inner activite-idle-inner">
            <span class="activite-idle-icon">💤</span>
            <span class="activite-app-name">Aucune activité</span>
          </div>
        </div>
        `}

      </div>
    `;

    activiteTickInterval = setInterval(() => {
      const timeEl  = document.getElementById('activite-time-value');
      const dateEl  = document.getElementById('activite-date-value');
      const iconEl  = document.getElementById('activite-daynight-icon');
      if (!timeEl) { clearInterval(activiteTickInterval); return; }

      const t = buildTimeHTML();
      timeEl.textContent = t.timeStr;
      dateEl.textContent = t.dateStr;
      if (iconEl && iconEl.src !== t.dayNightIcon) {
        iconEl.src = t.dayNightIcon;
        iconEl.alt = t.dayNightLabel;
      }
    }, 1000);

  } catch (err) {
    console.warn('Activité non disponible :', err.message);
    const container = document.getElementById('activite-content');
    if (container) container.innerHTML = `<div class="activite-error">Activité indisponible</div>`;
  }
}

document.addEventListener('DOMContentLoaded', fetchActivity);
