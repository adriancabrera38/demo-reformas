(function () {
  document.addEventListener('DOMContentLoaded', () => {

    const revealEls = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('in'); });
    }, { threshold: 0.15 });
    revealEls.forEach((el) => io.observe(el));

    document.querySelectorAll('.faq-item').forEach((item) => {
      item.querySelector('.faq-q')?.addEventListener('click', () => {
        const wasOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item.open').forEach((i) => i.classList.remove('open'));
        if (!wasOpen) item.classList.add('open');
      });
    });

    const form = document.getElementById('contact-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const privacidad = document.getElementById('privacidad');
        const error = document.getElementById('form-error');
        if (!privacidad.checked) {
          error.textContent = 'Debes aceptar la Política de Privacidad para continuar.';
          error.classList.add('show');
          return;
        }
        error.classList.remove('show');
        form.querySelectorAll('.field, .checkbox-row, .submit-row').forEach((el) => el.style.display = 'none');
        document.getElementById('form-success').classList.add('show');
      });
    }

    const COOKIE_KEY = 'reformas-torrent-demo-cookies';
    const banner = document.getElementById('cookie-banner');
    if (banner) {
      if (!localStorage.getItem(COOKIE_KEY)) {
        setTimeout(() => banner.classList.add('show'), 400);
      }
      document.getElementById('cookie-accept')?.addEventListener('click', () => {
        localStorage.setItem(COOKIE_KEY, 'aceptadas');
        banner.classList.remove('show');
      });
      document.getElementById('cookie-reject')?.addEventListener('click', () => {
        localStorage.setItem(COOKIE_KEY, 'rechazadas');
        banner.classList.remove('show');
      });
    }
  });
})();
