/* 2023-06-07 :: START ::  Util */
const Util = {};

/**
 * uid 반환
 * @returns {string}
 */
Util.getUid = () => {
  var firstPart = (Math.random() * 46656) | 0;
  var secondPart = (Math.random() * 46656) | 0;
  firstPart = ('000' + firstPart.toString(36)).slice(-3);
  secondPart = ('000' + secondPart.toString(36)).slice(-3);
  return firstPart + secondPart;
};

/**
 *
 * @param target
 */
Util.getElList = (target) => {
  let el_list;
  if (typeof target !== 'string') {
    el_list = target;
  } else {
    el_list = document.querySelectorAll(target);
  }

  if (!el_list.length && el_list.length != 0) {
    // 배열 타입이 아닐때 배열로 변환
    //if (el_list.length == 0) {}
    const arr = [];
    arr.push(el_list);
    el_list = arr;
  }

  return el_list;
};

/**
 * target_el 만 On 클래스 추가, 나머지 형제들 On 클래스 제거
 * @param target_el
 */
Util.turnOn = (target_el) => {
  const el_siblings = Util.getSiblings(target_el);
  if (el_siblings.length > 1) {
    Util.removeClass(el_siblings, 'On');
  }
  Util.addClass(target_el, `On`);
};

Util.addClass = (target, class_str) => {
  const el_list = Util.getElList(target);
  el_list.forEach((el, idx) => {
    el.classList.add(class_str);
  });
};

Util.removeClass = (target, class_str) => {
  const el_list = Util.getElList(target);
  el_list.forEach((el, idx) => {
    el.classList.remove(class_str);
  });
};

Util.toggleClass = (target, class_str) => {
  const el_list = Util.getElList(target);
  el_list.forEach((el, idx) => {
    el.classList.toggle(class_str);
  });
};

/**
 * 형제 엘리먼트 반환
 * @param target
 * @returns {*[]}
 */
Util.getSiblings = (target) => {
  const siblings = [];
  // if no parent, return no sibling
  if (!target.parentNode) {
    return siblings;
  }
  // first child of the parent node
  let sibling = target.parentNode.firstChild;
  // collecting siblings
  while (sibling) {
    if (sibling.nodeType === 1 && sibling !== target) {
      siblings.push(sibling);
    }
    sibling = sibling.nextSibling;
  }
  return siblings;
};

/**
 * 이벤트 핸들러 등록
 * @param target
 * @param event
 * @param callback
 */
Util.on = (target, event, callback) => {
  const el_list = Util.getElList(target);

  if (event == 'resize_dom') {
    el_list.forEach((el, idx) => {
      setResizeObserver(el);
    });
  }

  el_list.forEach((el, idx) => {
    if (!el.handler) el.handler = {};
    if (!el.handler[event]) el.handler[event] = [];

    const hanlder = (evt) => {
      evt._this = el;
      callback(evt);
    };
    el.handler[event].push(hanlder);

    el.addEventListener(event, hanlder);
  });

  function setResizeObserver(target) {
    // 참고 : https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver
    const resizeObserver = new ResizeObserver((entries) => {
      const event = new Event('resize_dom');
      target.dispatchEvent(event);
    });
    if (target) resizeObserver.observe(target);
  }
};

/**
 * 이벤트 핸들러 해제
 * @param target_selector
 * @param event
 */
Util.off = (target_selector, event) => {
  const el_list = Util.getElList(target);

  el_list.forEach((el, idx) => {
    el.handler[event].forEach((func, idx) => {
      el.removeEventListener(event, func);
    });
  });
};

/**
 *
 * @param target
 * @param prop
 */
Util.css = (target, prop, value) => {
  let el;
  if (typeof target === 'object') {
    // object mode
    el = target;
  } else {
    // selector string mode
    el = document.querySelector(target);
  }

  if (!value) {
    // console.log(el.style[prop]);
    const style = getComputedStyle(el);
    const getValue = style.getPropertyValue(prop);
    //const rgba2hex = (rgba) => `#${rgba.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.{0,1}\d*))?\)$/).slice(1).map((n, i) => (i === 3 ? Math.round(parseFloat(n) * 255) : parseFloat(n)).toString(16).padStart(2, '0').replace('NaN', '')).join('')}`
  } else {
    el.style.setProperty(prop, value);
  }
  return value;
};

/**
 * :root 에 할당된 CSS 변수 값을 반환해줌
 * @param var_name
 * @returns {string}
 */
Util.getCssVar = (var_name) => {
  const el_html = document.documentElement;
  const html_style = getComputedStyle(el_html);
  return html_style.getPropertyValue(var_name);
};

/**
 * :root 에 할당된 CSS 변수 값을 바꿔줌
 * @param var_name
 * @param va_value
 */
Util.setCssVar = (var_name, va_value) => {
  const el_html = document.documentElement;
  el_html.style.setProperty(var_name, va_value);
};

/**
 * 오늘날짜 문자열반환
 */
Util.getToday = (betweenStr) => {
  if (typeof betweenStr === 'undefined') betweenStr = '';
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;
  today = yyyy + betweenStr + mm + betweenStr + dd;
  return today;
};

/**
 * 입력되는 컬러와 대비되어 잘 보이는 색상 반환
 * @param color_hex
 * @returns {string}
 * ex)
 * Util.getGoodColor('#ff0000');
 */
Util.getGoodColor = (color_hex) => {
  const c = color_hex.substring(1); // 색상 앞의 # 제거
  const rgb = parseInt(c, 16); // rrggbb를 10진수로 변환
  const r = (rgb >> 16) & 0xff; // red 추출
  const g = (rgb >> 8) & 0xff; // green 추출
  const b = (rgb >> 0) & 0xff; // blue 추출
  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  // 색상 선택
  return luma < 127.5 ? 'white' : 'black';
};

/**
 * HTML 문자열을 Dom Object 로 반환
 * @param html_string
 */
Util.stringToDom = (html_string) => {
  const temp_wrapper = document.createElement('div');
  temp_wrapper.innerHTML = html_string;
  const dom = temp_wrapper.firstChild;
  return dom;
};

/**
 * URL 에서 파라메터 추출
 * @param key
 * @returns {string}
 */
Util.getParam = (key) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const result = urlParams.get(key);
  return result;
};

/**
 * 엘리먼트 교체
 * @param target
 * @param html
 */
Util.swapElement = (target, html) => {
  if (typeof html === 'string') {
    target.insertAdjacentHTML('afterend', html);
  } else {
    target.after(html);
  }
  target.remove();
};

/* // 2023-06-07 :: END :: Util */

/**
 * 스크롤 동작이 끝나면
 * scroll_end 커스텀 이벤트 발생
 */
(() => {
  let isScrolling;
  window.addEventListener(
    'scroll',
    (e) => {
      clearTimeout(isScrolling);
      isScrolling = setTimeout(
        () => {
          const event = new Event('scroll_end');
          window.dispatchEvent(event);
        },
        150,
        false,
      );
    },
    false,
  );
})();

/**
 * DOM 의 class 가 변경되면,
 * change_class 커스텀 이벤트 발생
 */
(() => {
  // 감지 옵션 (감지할 변경)
  const config = { attributes: true, subtree: true };

  // 변경 감지 시 실행할 콜백 함수
  const callback = (mutationList, observer) => {
    for (const mutation of mutationList) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        // class 변경 감지 후 target 으로 이벤트 발송
        const target = mutation.target;
        const event = new Event('change_class');
        target.dispatchEvent(event);
      }
    }
  };

  // 콜백 함수에 연결된 감지기 인스턴스 생성
  const observer = new MutationObserver(callback);

  // 설정한 변경의 감지 시작
  observer.observe(document.documentElement, config);

  // 이후 감지 중단 가능
  // observer.disconnect();
})();

/**
 * 자식이 1개일때 자식에게 FixedShell 클래스를 주면
 * 자식의 포지션이 공중에 뜨더라도 부모의 너비가 유지되도록 유지
 * <div class="RR relative">
 *   <div class="FixedShell absolute left-[0] top-[0] z-10">
 *     ...
 *   </div>
 * </div>
 */
function updateFixedShell() {
  Util.on('.FixedShell', 'resize_dom', (evt) => {
    // console.log(evt);
    const { _this } = evt;
    // console.log('_this == ', _this);
    const s_hei = _this.offsetHeight;
    const el_parent = _this.parentElement;
    Util.css(el_parent, `height`, `${s_hei}px`);
  });
}

/**
 * .StickyBox > .FixedShell 의 DOM 규칙을 갖고
 * .StickyBox 의 data-sticky-offset 의 값을 읽어와서 Sticky 처리함
 */
function updateStickyBox() {
  const el_list = document.querySelectorAll('.StickyBox');

  el_list.forEach((el, idx) => {
    checkSticky(el);
  });

  function checkSticky(target) {
    const shell = target.querySelector(`:scope > .FixedShell`);
    if (!shell) return;
    const box_wid = target.offsetWidth;
    shell.style.setProperty('width', `${box_wid}px`);

    const y = target.getBoundingClientRect().y;
    let offset = parseInt(target.getAttribute(`data-sticky-offset`));
    if (isNaN(offset)) offset = 0;

    if (y >= offset) {
      target.classList.remove('Sticky');
      shell.style.removeProperty('position');
      shell.style.removeProperty('top');
    } else {
      target.classList.add('Sticky');
      shell.style.setProperty('position', 'fixed');
      shell.style.setProperty('top', `${offset}px`);
    }
  }
}

/**
 * 페이지 타이틀 설정
 */
const setPageTitle = () => {
  const el_qt = document.querySelector(`page-title`);
  if (!el_qt) return;
  el_qt.remove();

  const el_title_list = document.querySelectorAll('.PageTitle');
  el_title_list.forEach((obj, idx) => {
    obj.innerText = el_qt.innerText;
  });
};

window.addEventListener('DOMContentLoaded', (event) => {
  updateFixedShell();
  updateStickyBox();
  setPageTitle();
});

window.addEventListener('resize', (evt) => {
  updateStickyBox();
});

window.addEventListener('scroll', (evt) => {
  updateStickyBox();
});

(() => {
  /**
   * 아코디언 동작을 원하는 껍데기에 AccodianChild 클래스 추가하고 On 클래스로 컨트롤 하면됨
   */
  function updateAccodianChild() {
    const el_list = document.querySelectorAll(`.AccodianChild`);
    el_list.forEach((el, idx) => {
      el.style.setProperty('max-height', 0);
      el.style.setProperty('overflow', 'hidden');
      el.style.setProperty('transition', 'max-height 300ms cubic-bezier(0.33, 1, 0.68, 1)');
      el.style.setProperty('will-change', 'auto');

      if (el.classList.contains('On')) {
        open(el);
      } else {
        close(el);
      }
    });

    function open(target) {
      const sh = target.scrollHeight;
      target.style.setProperty('max-height', `${sh}px`);
    }

    function close(target) {
      const sh = target.scrollHeight;
      target.style.setProperty('max-height', 0);
    }
  }

  (function repeat_callback() {
    updateAccodianChild();
    requestAnimationFrame(repeat_callback);
  })();
})();
