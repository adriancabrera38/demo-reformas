(function () {
  document.addEventListener('DOMContentLoaded', () => {

    const revealEls = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('in'); });
    }, { threshold: 0.15 });
    revealEls.forEach((el) => io.observe(el));

    // Contador animado de la barra de estadísticas
    const counters = document.querySelectorAll('[data-count]');
    const countIO = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseFloat(el.dataset.count);
        const isDecimal = el.dataset.count.includes('.');
        const duration = 1200;
        const start = performance.now();
        function tick(now) {
          const progress = Math.min((now - start) / duration, 1);
          const value = target * progress;
          el.textContent = isDecimal ? value.toFixed(1).replace('.', ',') : Math.round(value);
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        obs.unobserve(el);
      });
    }, { threshold: 0.4 });
    counters.forEach((el) => countIO.observe(el));

    // Carrusel de fotos de la empresa
    document.querySelectorAll('.carousel').forEach((carousel) => {
      const track = carousel.querySelector('.carousel-track');
      const slides = carousel.querySelectorAll('.carousel-slide');
      const dotsWrap = carousel.querySelector('.carousel-dots');
      let index = 0;
      let timer;

      slides.forEach((_, i) => {
        const dot = document.createElement('button');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goTo(i));
        dotsWrap?.appendChild(dot);
      });

      function goTo(i) {
        index = (i + slides.length) % slides.length;
        track.style.transform = `translateX(-${index * 100}%)`;
        dotsWrap?.querySelectorAll('button').forEach((d, di) => d.classList.toggle('active', di === index));
      }
      function next() { goTo(index + 1); }
      function prev() { goTo(index - 1); }
      function restart() {
        clearInterval(timer);
        timer = setInterval(next, 4500);
      }

      carousel.querySelector('.carousel-next')?.addEventListener('click', () => { next(); restart(); });
      carousel.querySelector('.carousel-prev')?.addEventListener('click', () => { prev(); restart(); });
      restart();
    });

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
