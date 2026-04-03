  const html = document.documentElement;
  const toggleBtn = document.getElementById('themeToggle');
  toggleBtn.addEventListener('click', () => {
    html.dataset.theme = html.dataset.theme === 'dark' ? 'light' : 'dark';
  });

  const codeInput = document.getElementById('code');
  const redeemBtn = document.getElementById('redeemBtn');
  const messageDiv = document.getElementById('message');

  // UNDER DEV
  const validCodes = ['CREA2025', 'MAXLWARE', 'WELCOME10', 'CODE123'];

  redeemBtn.addEventListener('click', async () => {
    const code = codeInput.value.trim();
    if (!code) {
      showMessage('Veuillez saisir un code.', 'error');
      return;
    }

    redeemBtn.disabled = true;
    const originalText = redeemBtn.innerHTML;
    redeemBtn.innerHTML = '<span class="spinner"></span> Vérification...';

    await new Promise(resolve => setTimeout(resolve, 2000));

    let isValid = validCodes.includes(code.toUpperCase());

    if (isValid) {
      showMessage(`✅ Code "${code}" validé ! Vous bénéficiez maintenant de -10% sur votre prochaine commande.`, 'success');
    } else {
      showMessage(`❌ Code invalide. Vérifiez votre code et réessayez.`, 'error');
    }

    redeemBtn.disabled = false;
    redeemBtn.innerHTML = originalText;
  });

  function showMessage(text, type) {
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = text;
    setTimeout(() => {
      if (messageDiv.className.includes(type)) {
        messageDiv.style.display = 'none';
      }
    }, 5000);
    messageDiv.style.display = 'block';
  }
