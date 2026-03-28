  // Thème
  const html = document.documentElement;
  const toggleBtn = document.getElementById('themeToggle');
  toggleBtn.addEventListener('click', () => {
    html.dataset.theme = html.dataset.theme === 'dark' ? 'light' : 'dark';
  });

  // Éléments
  const codeInput = document.getElementById('code');
  const redeemBtn = document.getElementById('redeemBtn');
  const messageDiv = document.getElementById('message');

  // Liste factice de codes valides (pour la démo)
  const validCodes = ['CREA2025', 'MAXLWARE', 'WELCOME10', 'CODE123'];

  redeemBtn.addEventListener('click', async () => {
    const code = codeInput.value.trim();
    if (!code) {
      showMessage('Veuillez saisir un code.', 'error');
      return;
    }

    // Désactiver le bouton et afficher un spinner
    redeemBtn.disabled = true;
    const originalText = redeemBtn.innerHTML;
    redeemBtn.innerHTML = '<span class="spinner"></span> Vérification...';

    // Simuler un délai réseau (faux chargement)
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Vérification factice
    let isValid = validCodes.includes(code.toUpperCase());

    if (isValid) {
      showMessage(`✅ Code "${code}" validé ! Vous bénéficiez maintenant de -10% sur votre prochaine commande.`, 'success');
    } else {
      showMessage(`❌ Code invalide. Vérifiez votre code et réessayez.`, 'error');
    }

    // Réactiver le bouton
    redeemBtn.disabled = false;
    redeemBtn.innerHTML = originalText;
  });

  function showMessage(text, type) {
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = text;
    // Option : faire disparaître après 5 secondes
    setTimeout(() => {
      if (messageDiv.className.includes(type)) {
        messageDiv.style.display = 'none';
      }
    }, 5000);
    messageDiv.style.display = 'block';
  }