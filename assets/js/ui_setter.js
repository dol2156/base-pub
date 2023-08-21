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
  console.log(`$target == `, $target);
  
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

const initCollapse = () => {
  const el_target = document.currentScript.parentElement;
  const $li_on = $('li.On', el_target);
  $li_on.find('.A').show();
  
  const $qbtn = $('.Q > button', el_target);
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

const initTreeMenu = () => {
  const el_target = document.currentScript.parentElement;
  
  const $li_on = $('li.On', el_target);
  $li_on.find('> ul').show();
  
  const $button = $('button', el_target);
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
