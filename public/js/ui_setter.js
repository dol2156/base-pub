/**
 * InputUi 초기 셋팅
 * @param trigger
 */
const initInputUi = (trigger) => {
  const el_target = document.currentScript.parentElement;
  const el_inp = el_target.querySelector(`:scope > input`);

  el_inp.addEventListener('keyup', (evt) => {
    updateDisplay();
  });

  el_inp.addEventListener('focus', (evt) => {
    el_target.classList.add('Focus');
    el_target.focus();
  });

  el_inp.addEventListener('blur', (evt) => {
    el_target.classList.remove('Focus');
    el_target.blur();
  });

  updateDisplay();

  function updateDisplay() {
    const value = el_inp.value;

    if (!value) {
      el_target.classList.remove('HasValue');
    } else {
      el_target.classList.add('HasValue');
    }
  }
};

/**
 * HScrollGradientBox 가로 스크롤 그라디언트 박스 초기 셋팅
 * @param trigger
 */
const initHScrollGradientBox = () => {
  const el_target = document.currentScript.parentElement;
  const el_hsb = el_target;
  const el_track = el_hsb.querySelector(`.Track`);
  el_track.addEventListener('scroll', (evt) => {
    updateDisplay();
  });
  updateDisplay();

  function updateDisplay() {
    const sw = el_track.scrollWidth;
    const sl = Math.ceil(el_track.scrollLeft);
    const k = sw - sl;

    if (k == sw) {
      el_hsb.classList.add('Start');
    } else {
      el_hsb.classList.remove('Start');
    }

    if (k <= el_track.clientWidth) {
      el_hsb.classList.add('End');
    } else {
      el_hsb.classList.remove('End');
    }
  }
};