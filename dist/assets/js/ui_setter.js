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

  const el_track = el_target.querySelector(`.Track`);
  el_track.addEventListener('scroll', (evt) => {
    updateDisplay();
  });
  updateDisplay();

  function updateDisplay() {
    const sw = el_track.scrollWidth;
    const sl = Math.ceil(el_track.scrollLeft);
    const k = sw - sl;

    if (k == sw) {
      el_target.classList.add('Start');
    } else {
      el_target.classList.remove('Start');
    }

    if (k <= el_track.clientWidth) {
      el_target.classList.add('End');
    } else {
      el_target.classList.remove('End');
    }
  }
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

const initFullPage = (swiper_id) => {
  const pagination_progress = {
    el: '#FullPageSwiper-{{id}}-PagenationProgressbar',
    type: 'progressbar',
    modifierClass: 'Pagenation-',
    progressbarFillClass: 'FillBar',
    renderProgressbar: function (className) {
      return `<div class="${className}"></div>`;
    },
  };

  const swiper_option = {
    // initialSlide : 3,
    direction: 'vertical',
    mousewheel: true,
    releaseOnEdges: true,
    slidesPerView: 1, // 슬라이드의 수가 slidesPerView의 값 2배 이상이어야함. slidesPerView, slidesPerGroup 함께 설정 필요.
    slidesPerGroup: 1,
    loop: false,
    pagination: pagination_progress,
    // autoplay: {
    //   delay: 1000,
    //   disableOnInteraction: false,
    // },
    init: false,
    // grabCursor: true,
  };

  let swiper = new Swiper('#FullPageSwiper-{{id}}', swiper_option);

  swiper.on('init', function (swiper) {
    setCurrentSectionIdx();
    setAnimateDealy();

    // 첫화면 진입때만 애니메이션 작동 안하게
    const el_first_active_slide = swiper.slides[0];
    if (el_first_active_slide.hasClass('swiper-slide-active')) {
      el_first_active_slide.addClass('FirstPlay');
      setTimeout(() => {
        el_first_active_slide.removeClass('FirstPlay');
      }, 1000);
    }
  });

  swiper.on('slideChange', function (swiper) {
    setCurrentSectionIdx();
    setAnimateDealy();
  });

  swiper.on('resize', function (swiper) {
    setFooterSnap(swiper);
  });

  swiper.on('beforeTransitionStart', function (swiper) {
    setFooterSnap(swiper);
  });

  function setFooterSnap(swiper) {
    // 슬라이드가 2개도 안되면 풀페이지 스크롤을 할 이유가 없지 리턴 시켜
    if (swiper.slides.length < 2) return;

    const last_idx = swiper.slides.length - 1;
    const el_last_slide = swiper.slides[last_idx];
    const ls_hei = el_last_slide.outerHeight();
    const second_last_snap = swiper.snapGrid[last_idx - 1];
    const cal_last_snap = second_last_snap + ls_hei;
    swiper.snapGrid[last_idx] = cal_last_snap;
  }

  swiper.init();

  function setAnimateDealy() {
    const el_swiper = swiper.el;

    // 슬라이드 방향 체크해서
    // 트렌지션 객체들 딜레이 각각 설정해주기
    if (swiper.previousIndex - swiper.activeIndex > 0) {
      el_swiper.css('--ori-top', `-50px`);
    } else {
      el_swiper.css('--ori-top', `50px`);
    }

    const el_slide = swiper.slides[swiper.activeIndex];
    const el_dov_list = el_slide.querySelectorAll(`[data-only-view]`);
    el_dov_list.forEach((el_dov, idx) => {
      const el_at_list = el_dov.querySelectorAll(`.AnimateTarget`);
      el_at_list.forEach((el_at, jdx) => {
        const k = 2;
        el_at.css('animation-delay', `${(jdx + 1) * k}00ms`);
      });
    });
  }

  function setCurrentSectionIdx() {
    const { realIndex } = swiper;
    const html = document.documentElement;
    html.attr(`data-current-section-idx`, realIndex);
  }
};
