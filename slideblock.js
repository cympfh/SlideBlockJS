/*!
 * SlideBlockJS v1.0
 * Single-file vanilla JS library for slide-block style HTML documents.
 * No dependencies. MIT License.
 */
(function (global) {
  'use strict';

  var STYLE_ID = 'slideblockjs-style';
  var TOC_ID = 'toc';

  var state = {
    initialized: false,
    container: null,
    blocks: [],
    toc: null,
    tocCreated: false,
    currentIndex: -1,
    observer: null,
    keyboardHandler: null,
    options: null
  };

  var DEFAULT_OPTIONS = {
    container: null, // resolved to document.body at init time
    snap: true,
    keyboard: true,
    toc: true
  };

  function injectBaseStyle() {
    if (document.getElementById(STYLE_ID)) return;
    var style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent =
      '.slide-block{scroll-snap-align:start;min-height:100vh;padding:60px 80px;' +
      'box-sizing:border-box;}' +
      '.slide-block.current{background-color:#f8f8ff;}' +
      '.slide-block h1{font-size:3.5rem;margin-bottom:2rem;}' +
      '#toc.slideblockjs-toc{position:fixed;top:0;right:0;width:220px;' +
      'max-height:100vh;overflow-y:auto;padding:16px;box-sizing:border-box;' +
      'background:rgba(255,255,255,0.92);border-left:1px solid #ddd;' +
      'font-size:0.85rem;z-index:9999;}' +
      '#toc.slideblockjs-toc ul{list-style:none;margin:0;padding:0;}' +
      '#toc.slideblockjs-toc li{margin:4px 0;}' +
      '#toc.slideblockjs-toc a{display:block;padding:4px 8px;color:#333;' +
      'text-decoration:none;border-radius:4px;}' +
      '#toc.slideblockjs-toc a:hover{background:#eee;}' +
      '#toc.slideblockjs-toc a.current{background:#dde;font-weight:bold;}';
    document.head.appendChild(style);
  }

  function getBlocks(container) {
    return Array.prototype.slice.call(container.querySelectorAll('.slide-block'));
  }

  function getBlockTitle(block) {
    var heading = block.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading && heading.textContent.trim()) return heading.textContent.trim();
    return block.id || '(untitled)';
  }

  function teardown() {
    if (state.observer) {
      state.observer.disconnect();
      state.observer = null;
    }
    if (state.keyboardHandler) {
      document.removeEventListener('keydown', state.keyboardHandler);
      state.keyboardHandler = null;
    }
    if (state.tocCreated && state.toc && state.toc.parentNode) {
      state.toc.parentNode.removeChild(state.toc);
    }
    state.toc = null;
    state.tocCreated = false;
    state.blocks.forEach(function (block) {
      block.classList.remove('current');
    });
    state.blocks = [];
    state.currentIndex = -1;
  }

  function setCurrent(index) {
    if (index === state.currentIndex) return;
    var prev = state.blocks[state.currentIndex];
    if (prev) prev.classList.remove('current');
    var next = state.blocks[index];
    if (next) next.classList.add('current');
    state.currentIndex = index;

    if (state.toc) {
      var links = state.toc.querySelectorAll('a[data-slideblockjs-index]');
      links.forEach(function (link) {
        var isCurrent = Number(link.getAttribute('data-slideblockjs-index')) === index;
        link.classList.toggle('current', isCurrent);
      });
    }
  }

  function setupObserver() {
    state.observer = new IntersectionObserver(
      function (entries) {
        var best = null;
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            if (!best || entry.intersectionRatio > best.intersectionRatio) {
              best = entry;
            }
          }
        });
        if (best) {
          var index = state.blocks.indexOf(best.target);
          if (index !== -1) setCurrent(index);
        }
      },
      { threshold: [0.25, 0.5, 0.75] }
    );
    state.blocks.forEach(function (block) {
      state.observer.observe(block);
    });
  }

  function scrollToIndex(index) {
    if (index < 0 || index >= state.blocks.length) return;
    state.blocks[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function setupKeyboard() {
    state.keyboardHandler = function (event) {
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        event.preventDefault();
        scrollToIndex(state.currentIndex + 1);
      } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        event.preventDefault();
        scrollToIndex(state.currentIndex - 1);
      }
    };
    document.addEventListener('keydown', state.keyboardHandler);
  }

  function setupToc() {
    var toc = document.getElementById(TOC_ID);
    if (toc) {
      state.toc = toc;
      state.tocCreated = false;
    } else {
      toc = document.createElement('nav');
      toc.id = TOC_ID;
      document.body.appendChild(toc);
      state.toc = toc;
      state.tocCreated = true;
    }
    toc.classList.add('slideblockjs-toc');

    var list = document.createElement('ul');
    state.blocks.forEach(function (block, index) {
      var item = document.createElement('li');
      var link = document.createElement('a');
      link.href = '#' + (block.id || '');
      link.textContent = getBlockTitle(block);
      link.setAttribute('data-slideblockjs-index', String(index));
      link.addEventListener('click', function (event) {
        event.preventDefault();
        scrollToIndex(index);
      });
      item.appendChild(link);
      list.appendChild(item);
    });
    toc.innerHTML = '';
    toc.appendChild(list);
  }

  function setupSnap(container) {
    container.style.scrollSnapType = 'y mandatory';
  }

  function init(options) {
    teardown();

    var opts = {};
    for (var key in DEFAULT_OPTIONS) opts[key] = DEFAULT_OPTIONS[key];
    if (options) {
      for (var k in options) opts[k] = options[k];
    }
    opts.container = opts.container || document.body;
    state.options = opts;
    state.container = opts.container;

    injectBaseStyle();
    state.blocks = getBlocks(opts.container);
    if (state.blocks.length === 0) return;

    if (opts.snap) setupSnap(opts.container);
    if (opts.keyboard) setupKeyboard();
    if (opts.toc) setupToc();
    setupObserver();

    state.initialized = true;
  }

  var SlideBlockJS = {
    init: init
  };

  global.SlideBlockJS = SlideBlockJS;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      SlideBlockJS.init();
    });
  } else {
    SlideBlockJS.init();
  }
})(typeof window !== 'undefined' ? window : this);
