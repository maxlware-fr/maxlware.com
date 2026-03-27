    const html = document.documentElement;
    const btn = document.getElementById('themeToggle');
    btn.addEventListener('click', () => {
      html.dataset.theme = html.dataset.theme === 'dark' ? 'light' : 'dark';
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.presentation-grid .reveal, .prereq-grid .reveal').forEach((el, i) => {
      el.style.transitionDelay = (i % 3) * 80 + 'ms';
    });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    const card     = document.getElementById('demoCard');
    const input    = document.getElementById('demoInput');
    const cursor   = document.getElementById('demoCursor');
    const demoBtn  = document.getElementById('demoBtn');
    const mouse    = document.getElementById('mouseCursor');

    const TEXT = 'mon-code-créateur';
    let animRunning = false;

    function getRelPos(target) {
      const cr = card.getBoundingClientRect();
      const tr = target.getBoundingClientRect();
      return {
        x: tr.left - cr.left + tr.width / 2,
        y: tr.top  - cr.top  + tr.height / 2
      };
    }

    function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

    async function runAnim() {
      if (animRunning) return;
      animRunning = true;

      mouse.style.opacity = '0';
      mouse.style.transition = 'none';
      mouse.style.left = '80%';
      mouse.style.top  = '-30px';
      await sleep(50);
      mouse.style.transition = 'left 0.55s cubic-bezier(0.25,0.46,0.45,0.94), top 0.55s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.3s, transform 0.12s ease';
      mouse.style.opacity = '1';

      const ipos = getRelPos(input);
      mouse.style.left = (ipos.x - 14) + 'px';
      mouse.style.top  = (ipos.y - 8)  + 'px';
      await sleep(700);

      mouse.style.transform = 'scale(0.75)';
      await sleep(100);
      mouse.style.transform = 'scale(1)';

      input.classList.add('focused');
      cursor.classList.add('active');
      cursor.style.opacity = '1';
      await sleep(350);

      input.value = '';
      for (const ch of TEXT) {
        input.value += ch;
        await sleep(75 + Math.random() * 55);
      }
      await sleep(700);

      const bpos = getRelPos(demoBtn);
      mouse.style.left = (bpos.x - 14) + 'px';
      mouse.style.top  = (bpos.y - 8)  + 'px';
      await sleep(650);

      mouse.style.transform = 'scale(0.75)';
      demoBtn.classList.add('clicking');
      await sleep(130);
      mouse.style.transform = 'scale(1)';
      demoBtn.classList.remove('clicking');

      await sleep(1000);

      mouse.style.opacity = '0';
      await sleep(400);

      input.value = '';
      input.classList.remove('focused');
      cursor.classList.remove('active');
      cursor.style.opacity = '0';

      animRunning = false;
      await sleep(1600);
      runAnim();
    }

    setTimeout(runAnim, 1000);