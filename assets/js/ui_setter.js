/**
 * InputUi 초기 셋팅
 * @param trigger
 */
const initInputUi = (trigger) => {
  if(typeof trigger === "undefined" ) return;
  const $target = $(trigger).parent();
  
  const $inp = $target.find(`> input`);
  
  $inp.on('keyup', (evt) => {
    updateDisplay();
  });
  
  $inp.on('focus', (evt) => {
    $target.addClass('Focus');
    $target.focus();
  });
  
  $inp.on('blur', (evt) => {
    $target.removeClass('Focus');
    $target.blur();
  });


  updateDisplay();

  function updateDisplay() {
    const value = $inp.val();

    if (!value) {
      $target.removeClass('HasValue');
    } else {
      $target.addClass('HasValue');
    }
  }
  
};

/**
 * HScrollGradientBox 가로 스크롤 그라디언트 박스 초기 셋팅
 * @param trigger
 */
const initHScrollGradientBox = (trigger) => {
  if(typeof trigger === "undefined" ) return;
  const $target = $(trigger).parent();
  
  const el_hsb = $target[0];
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

/**
 * Collapse_1
 * @param trigger
 */
const initCollapse = (trigger) => {
  if(typeof trigger === "undefined" ) return;
  const $target = $(trigger).parent();
  
  const $li_on = $('li.On', $target);
  $li_on.find('.A').show();
  
  const $qbtn = $('.Q > button', $target);
  $qbtn.on('click', (evt) => {
    const $li = $(evt.currentTarget).closest('li');

    if (!$li.hasClass('On')) {
      const $li_siblings = $li.siblings('li');

      $li_siblings.removeClass('On');
      $li_siblings.find('.A').slideUp();

      $li.addClass('On');
      $li.find('.A').slideDown();
    } else {
      $li.removeClass('On');
      $li.find('.A').slideUp();
    }
  });
  
};

/**
 * TreeMenu_1
 * @param trigger
 */
const initTreeMenu = (trigger) => {
  if(typeof trigger === "undefined" ) return;
  const $target = $(trigger).parent();
  
  const $li_on = $('li.On', $target);
  $li_on.find('> ul').show();
  
  const $button = $('button', $target);
  $button.on('click', (evt) => {
    const $li = $(evt.currentTarget).closest('li');
    
    if (!$li.hasClass('On')) {
      const $li_siblings = $li.siblings('li');

      $li_siblings.removeClass('On');
      $li_siblings.find('> ul').slideUp();

      $li.addClass('On');
      $li.find('> ul').slideDown();
    } else {
      $li.removeClass('On');
      $li.find('> ul').slideUp();
    }
    
  });
  
}
