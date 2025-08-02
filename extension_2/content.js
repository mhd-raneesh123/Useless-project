(function () {
  if (window.__sentientScrollInjected) return;
  window.__sentientScrollInjected = true;

  // Create emoji face
  const face = document.createElement('div');
  face.textContent = '😐';
  Object.assign(face.style, {
    position: 'fixed',
    bottom: '40px',
    right: '20px',
    fontSize: '50px',
    zIndex: '999999',
    transition: '0.3s',
    pointerEvents: 'none'
  });
  document.body.appendChild(face);

  // Create progress bar
  const bar = document.createElement('div');
  Object.assign(bar.style, {
    position: 'fixed',
    bottom: '0',
    left: '0',
    height: '8px',
    width: '0%',
    background: 'lime',
    zIndex: '999999',
    transition: 'width 0.3s ease, background 0.3s ease'
  });
  document.body.appendChild(bar);

  let lastScroll = window.scrollY;
  let sentience = 0;
  let decayInterval = null;

  function updateBarAndFace() {
    bar.style.width = `${sentience}%`;

    if (sentience > 75) {
      bar.style.background = 'red';
      face.textContent = '😳';
    } else if (sentience > 40) {
      bar.style.background = 'orange';
      face.textContent = '😎';
    } else if (sentience > 10) {
      bar.style.background = 'lime';
      face.textContent = '🙂';
    } else if (sentience > 0) {
      bar.style.background = 'lime';
      face.textContent = '😐';
    } else {
      face.textContent = '😴';
    }
  }

  function startDecay() {
    clearInterval(decayInterval);
    decayInterval = setInterval(() => {
      if (sentience > 0) {
        sentience = Math.max(0, sentience - 1);
        updateBarAndFace();
      } else {
        updateBarAndFace(); // Ensure face becomes 😴 and bar is 0%
        clearInterval(decayInterval);
        decayInterval = null;
      }
    }, 100); // speed of decay
  }

  // Scroll listener
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > lastScroll) {
      sentience = Math.min(100, sentience + 7);
    } else if (currentScroll < lastScroll) {
      sentience = Math.min(100, sentience + 5);
    }

    lastScroll = currentScroll;
    updateBarAndFace();
    startDecay();
  });

  // Start initial decay if user is idle
  updateBarAndFace();
  startDecay();
})();
