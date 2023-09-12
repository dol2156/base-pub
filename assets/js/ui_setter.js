/**
 * InputUi 초기 셋팅
 * @param trigger
 */
const initInputUi = (trigger) => {
  if (typeof trigger === 'undefined') return;
  const el_target = trigger.parentElement;

  const el_inp = el_target.querySelector(`:scope > input`);

  el_inp.addEventListener('keyup', (evt) => {
    updateDisplay();
  });

  el_inp.addEventListener('focus', (evt) => {
    el_target.addClass('Focus');
    el_target.focus();
  });

  el_inp.addEventListener('blur', (evt) => {
    el_target.removeClass('Focus');
    el_target.blur();
  });

  updateDisplay();

  function updateDisplay() {
    const value = el_inp.value;

    if (!value) {
      el_target.removeClass('HasValue');
    } else {
      el_target.addClass('HasValue');
    }
  }
};

/**
 * HScrollGradientBox 가로 스크롤 그라디언트 박스 초기 셋팅
 * @param trigger
 */
const initHScrollGradientBox = (trigger) => {
  if (typeof trigger === 'undefined') return;
  const el_target = trigger.parentElement;
  
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
  const el_target = trigger.parentElement;
  const el_li = el_target.querySelectorAll(`:scope > li.On`);

  el_li.forEach((obj, idx) => {
    const el_A = obj.querySelector(`.A`);
    el_A.show();
  });

  const el_Q_btn = el_target.querySelectorAll(`.Q > button`);
  el_Q_btn.forEach((el_q, idx) => {
    el_q.addEventListener('click', (evt) => {
      const ct = evt.currentTarget;
      const el_li = ct.closest(`li`);

      if (!el_li.hasClass('On')) {
        const el_sb_list = el_li.siblings(`li`);
        el_sb_list.forEach((el_sb, idx) => {
          el_sb.removeClass('On');
          el_sb.querySelector(`.A`).slideUp();
        });

        el_li.addClass('On');
        el_li.querySelector(`.A`).slideDown();
      } else {
        el_li.removeClass('On');
        el_li.querySelector(`.A`).slideUp();
      }
    });
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
      src: async () => {
        try {
          const json_url = `https://tarekraafat.github.io/autoComplete.js/demo/db/generic.json`;
          const source = await fetch(json_url);
          const data = await source.json();
          return data;
        } catch (error) {
          return error;
        }
      },
      keys: ['food', 'cities', 'animals'],
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
      element: (item, data) => {
        // Modify Results Item Style
        item.style = 'display: flex; justify-content: space-between;';
        // Modify Results Item Content
        item.innerHTML = `
      <span style="text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">
        ${data.match}
      </span>
      <span style="display: flex; align-items: center; font-size: 13px; font-weight: 100; text-transform: uppercase; color: rgba(0,0,0,.2);">
        ${data.key}
      </span>`;
      },
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
  function updateDisplay() {
    if (el_ac.value.length > 0) {
      el_acb.classList.add('HasValue');
    } else {
      el_acb.classList.remove('HasValue');
    }
  }
};
