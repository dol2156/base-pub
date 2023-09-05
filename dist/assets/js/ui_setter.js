/**
 * InputUi 초기 셋팅
 * @param trigger
 */
const initInputUi = (trigger) => {
  if (typeof trigger === 'undefined') return;
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
  if (typeof trigger === 'undefined') return;
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
  if (typeof trigger === 'undefined') return;
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
  if (typeof trigger === 'undefined') return;
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
};

/**
 * <img onerror='initAutoCompleteBox(`#autoComplete`)' src=''/>
 * @param id
 */
const initAutoCompleteBox = (id) => {
  // https://tarekraafat.github.io/autoComplete.js/#/
  // https://codepen.io/tarekraafat/pen/rQopdW
  
  const config = {
    selector: id,
    placeHolder: `검색어를 입력하세요.`,
    data: {
      src: ['스타벅스', '설빙', 'GS25', '맥도날드', '버거킹', 'CU', 'CGV', '이디야', '요기요', '롯데시네마', '빨강색1', '주황색2', '노랑색3', '초록색4', '파랑색5', '남색6', '보라색7', '빨강색8', '주황색9', '노랑색10', '초록색11', '파랑색12', '남색13', '보라색14', '빨강색15', '주황색16', '노랑색17', '초록색18', '파랑색19', '남색20', '보라색21', '빨강색22', '주황색23', '노랑색24', '초록색25', '파랑색26', '남색27', '보라색28', '빨강색29', '주황색30', '노랑색31', '초록색32', '파랑색33', '남색34', '보라색35', '빨강색36', '주황색37', '노랑색38', '초록색39', '파랑색40', '남색41', '보라색42'],
    },
    resultsList: {
      element: (list, data) => {
        if (!data.results.length) {
          // Create "No Results" message element
          const message = document.createElement('div');
          // Add class to the created element
          message.setAttribute('class', 'no_result');
          // Add message text content
          message.innerHTML = `<span>Found No Results for "${data.query}"</span>`;
          // Append message element to the results list
          list.prepend(message);
        } else {
          const info = document.createElement('div');
          info.classList.add('ResultCountInfo');
          if (data.results.length > 0) {
            info.innerHTML = `Displaying <strong>${data.results.length}</strong> out of <strong>${data.matches.length}</strong> results`;
          }
          list.prepend(info);
        }
      },
      noResults: true,
      maxResults: 9999,
      tabSelect: true,
    },
    submit: true,
    resultItem: {
      highlight: true,
    },
    events: {
      input: {
        focus: () => {
          if (autoCompleteJS.input.value.length) autoCompleteJS.start();
        },
      },
    },
  };

  const autoCompleteJS = new autoComplete(config);

  const el_ac = document.querySelector(id);
  const el_acb = el_ac.closest('.AutoCompleteBox');
  const el_btn_remove_value = el_acb.querySelector(`.BtnRemoveInputValue`);
  const el_btn_search = el_acb.querySelector(`.BtnGoSearch`);
  
  // 검색 결과 리스트 아이템 선택
  el_ac.addEventListener('selection', function (event) {
    // console.log(event.detail);
    const value = event.detail.selection.value;
     el_ac.value = value;
  });
  
  el_ac.addEventListener('keyup', (evt) => {
    updateDisplay();
  });
  
  // 검색어 삭제 버튼 클릭
  el_btn_remove_value.addEventListener('click', (evt) => {
    // 검색 인풋 값 삭제
    el_ac.value = '';
    updateDisplay();
  });
  
  // 검색 돋보기 버튼 클릭
  el_btn_search.addEventListener('click', (evt) => {
    console.log(`el_ac.value == `, el_ac.value);
  });
  
  updateDisplay();
  function updateDisplay(){
    console.log(`el_ac.value.length == `, el_ac.value.length);
    
    if(el_ac.value.length > 0){
      el_acb.classList.add('HasValue');
    }else{
      el_acb.classList.remove('HasValue');
    }
  }
  
  
};

