// april.js

(function() {
  function addStyle(css) {
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
  }

  function showPrankBanner() {
    let banner = document.querySelector('.notification-banner');
    if (!banner) {
      banner = document.createElement('div');
      banner.className = 'notification-banner';
      banner.setAttribute('data-marker', 'warn');
      document.body.prepend(banner);
    }
    banner.innerHTML = `
      <div class="notification-content">
        <span class="notification-message">
          🐟 POISSON D'AVRIL ! 🐟<br>
          Aujourd'hui, Maxlware est en mode "développeur qui pèche du poisson dans le Périgord". Tous les projets sont provisoirement transformés en produits de la mer. 🐠
        </span>
        <span class="notification-author">- Nemo</span>
        <button class="close-notification" aria-label="Fermer">×</button>
      </div>
    `;
    banner.style.display = 'flex';
    banner.classList.add('show');

    const closeBtn = banner.querySelector('.close-notification');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        banner.classList.remove('show');
        banner.classList.add('hide');
        setTimeout(() => {
          banner.style.display = 'none';
          banner.classList.remove('hide');
        }, 300);
      });
    }
  }

  function addFloatingFish() {
    addStyle(`
      .fish {
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        font-size: 2rem;
        user-select: none;
        animation: floatFish linear infinite;
      }
      @keyframes floatFish {
        0% {
          transform: translateX(-100vw) rotate(0deg);
          opacity: 0;
        }
        10% {
          opacity: 1;
        }
        90% {
          opacity: 1;
        }
        100% {
          transform: translateX(100vw) rotate(360deg);
          opacity: 0;
        }
      }
    `);

    const fishEmojis = ['🐟', '🐠', '🐡', '🎣', '🐙', '🐬', '🐳', '🐋'];
    for (let i = 0; i < 30; i++) {
      const fish = document.createElement('div');
      fish.className = 'fish';
      fish.textContent = fishEmojis[Math.floor(Math.random() * fishEmojis.length)];
      const size = Math.random() * 1.5 + 1;
      fish.style.fontSize = `${size}rem`;
      fish.style.top = `${Math.random() * 100}vh`;
      const duration = Math.random() * 8 + 5;
      fish.style.animationDuration = `${duration}s`;
      fish.style.animationDelay = `${Math.random() * 10}s`;
      document.body.appendChild(fish);
    }
  }

  function modifyText() {
    const title = document.querySelector('.hero .title');
    if (title) {
      title.innerHTML = 'Maxlware<span class="blink">_</span> 🐟';
    }

    const subtitle = document.querySelector('.hero .subtitle');
    if (subtitle) {
      subtitle.textContent = 'Développeur indépendant en France (et pêcheur le 1er avril)';
    }

    const projects = document.querySelectorAll('.project-card');
    if (projects.length) {
      const jokeNames = [
        'EcoleDirecte Poissonnière',
        'Serveur Minecraft Aquatique (glou glou)',
        'maxlware.com (version némo dans l\'océan)',
        'API Poisson d\'Avril'
      ];
      projects.forEach((card, idx) => {
        const nameElem = card.querySelector('.project-name');
        if (nameElem && idx < jokeNames.length) {
          nameElem.textContent = jokeNames[idx];
        }
        const statusElem = card.querySelector('.project-status');
        if (statusElem) {
          statusElem.textContent = '🐟 Poisson d\'avril';
          statusElem.classList.add('live');
        }
        const descElem = card.querySelector('.project-desc');
        if (descElem && idx === 0) {
          descElem.textContent = 'Un logiciel pour aller sur Ecole Directe... mais aujourd\'hui, il sert à te donner du poisson quand ta une bonne node. Cool nan ?';
        } else if (descElem && idx === 1) {
          descElem.textContent = 'Un serveur Minecraft sous-marin avec des poissons volants et des blocs de poisson (Mojang soit jaloux stp).';
        } else if (descElem && idx === 2) {
          descElem.textContent = 'Ce site. Actuellement en mode "aquarium". Ne soyez pas surpris par les écailles (Blague ChatGPT je suis obligé de le garder).';
        } else if (descElem && idx === 3) {
          descElem.textContent = 'API qui renvoie des recettes de poisson au lieu de JSON.';
        }
      });
    }

    const terminalBody = document.querySelector('.terminal-body');
    if (terminalBody) {
      const lines = terminalBody.querySelectorAll('p');
      lines.forEach(line => {
        if (line.innerHTML.includes('whoami')) {
          const next = line.nextElementSibling;
          if (next && next.classList.contains('t-out')) {
            next.textContent = 'Développeur indépendant, mais aujourd\'hui pêcheur professionneleuhhh.';
          }
        }
        if (line.innerHTML.includes('cat interests.txt')) {
          const next = line.nextElementSibling;
          if (next && next.classList.contains('t-out')) {
            next.textContent = 'Poisson, code, eau, open-source, friture (hein ?), serveurs.';
          }
        }
        if (line.innerHTML.includes('ls projets/')) {
          const next = line.nextElementSibling;
          if (next && next.classList.contains('t-out')) {
            next.textContent = 'ecoledirecte-poisson &nbsp; minecraft-aquarium &nbsp; maxlware-mare &nbsp; api-poisson-avril';
          }
        }
      });
    }
  }

  function addFishCursor() {
    addStyle(`
      a, button, .project-card, .cta-btn {
        cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><text x="0" y="24" font-size="24">🐟</text></svg>') 16 16, auto;
      }
    `);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      showPrankBanner();
      addFloatingFish();
      modifyText();
      addFishCursor();
    });
  } else {
    showPrankBanner();
    addFloatingFish();
    modifyText();
    addFishCursor();
  }
})();
