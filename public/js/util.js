const $k = (target_str_or_domobject) => {
  let target_list;
  if (typeof target_str_or_domobject === 'string') {
    target_list = [...document.querySelectorAll(target_str_or_domobject)];
  } else {
    if (typeof target_str_or_domobject.length === 'undefined') {
      target_list = [target_str_or_domobject];
    } else {
      target_list = [...target_str_or_domobject];
    }
  }

  /**
   * 이벤트 핸들러 추가
   * @param event
   * @param callback
   */
  target_list.on = (event, callback) => {
    if (event == 'resize_dom') {
      target_list.forEach((el, idx) => {
        setResizeObserver(el);
      });
    }

    target_list.forEach((el, idx) => {
      if (!el.handler) el.handler = {};
      if (!el.handler[event]) el.handler[event] = [];

      const hanlder = (evt) => {
        callback = callback.bind(el);
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
   * 이벤트 핸들러 제거
   * @param target_selector
   * @param event
   */
  target_list.off = (event) => {
    target_list.forEach((el, idx) => {
      el.handler[event].forEach((func, idx) => {
        el.removeEventListener(event, func);
      });
    });
  };

  /**
   * 형제 엘리먼트 반환
   * @param target
   * @returns {*[]}
   */
  target_list.siblings = () => {
    const target = target_list.pop();

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
   * 클래스 추가
   * @param class_str
   */
  target_list.addClass = (class_str) => {
    target_list.forEach((el, idx) => {
      el.classList.add(class_str);
    });
  };

  /**
   * 클래스 삭제
   * @param class_str
   */
  target_list.removeClass = (class_str) => {
    target_list.forEach((el, idx) => {
      el.classList.remove(class_str);
    });
  };

  /**
   * 클래스 소유 여부 반환
   * @param class_str
   */
  target_list.hasClass = (class_str) => {
    const target = target_list.pop();
    return target.classList.contains(class_str);
  };

  /**
   * 클래스 토글
   * @param target
   * @param class_str
   */
  target_list.toggleClass = (class_str) => {
    target_list.forEach((el, idx) => {
      el.classList.toggle(class_str);
    });
  };

  return target_list;
};

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

Util.toggleClass = (target, class_str) => {
  const el_list = $k(target);
  el_list.forEach((el, idx) => {
    el.classList.toggle(class_str);
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
