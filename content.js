(function() {
  'use strict';

  function init() {
    console.log('[煎蛋Meme风] 初始化...');
    enhanceTheme();
    createReadingProgress();
    enhanceImages();
    addSmoothScroll();
    console.log('[煎蛋Meme风] 完成');
  }

  // 主题适配
  function enhanceTheme() {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const isDark = document.documentElement.classList.contains('dark-model');
          document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
        }
      });
    });
    observer.observe(document.documentElement, { attributes: true });
    if (document.documentElement.classList.contains('dark-model')) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }

  // 阅读进度条
  function createReadingProgress() {
    const progress = document.createElement('div');
    progress.id = 'reading-progress';
    document.body.appendChild(progress);
    window.addEventListener('scroll', () => {
      const st = window.scrollY || document.documentElement.scrollTop;
      const sh = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (sh > 0 ? (st / sh) * 100 : 0) + '%';
    });
  }

  // 图片增强
  function enhanceImages() {
    document.querySelectorAll('img.lazy').forEach(img => img.loading = 'lazy');
    document.querySelectorAll('.post-item .thumb img').forEach(img => {
      img.loading = 'lazy';
      img.style.cursor = 'pointer';
      img.addEventListener('click', (e) => {
        e.preventDefault();
        openLightbox(img.src);
      });
    });
  }

  // 灯箱
  function openLightbox(src) {
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.92);display:flex;align-items:center;justify-content:center;z-index:10000;cursor:zoom-out;animation:fadeIn 0.3s;backdrop-filter:blur(10px);';
    const img = document.createElement('img');
    img.src = src.replace('!square', '!large');
    img.style.cssText = 'max-width:90vw;max-height:90vh;object-fit:contain;border-radius:12px;animation:scaleIn 0.3s;box-shadow:0 20px 60px rgba(0,0,0,0.5);';
    overlay.appendChild(img);
    document.body.appendChild(overlay);
    overlay.addEventListener('click', () => {
      overlay.style.animation = 'fadeOut 0.3s';
      setTimeout(() => overlay.remove(), 300);
    });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') overlay.click(); }, { once: true });
  }

  // 平滑滚动
  function addSmoothScroll() {
    const navTop = document.getElementById('nav_top');
    if (navTop) {
      navTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  // 动画 CSS
  function addAnimations() {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      @keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }
      @keyframes scaleIn { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
    `;
    document.head.appendChild(style);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { addAnimations(); init(); });
  } else {
    addAnimations();
    init();
  }
})();
