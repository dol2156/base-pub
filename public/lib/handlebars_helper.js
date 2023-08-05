Handlebars.logger.level = 'debug';

let PageName;
(() => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  PageName = urlParams.get('page');
  if(!PageName) PageName = '_pub_sitemap';
})();
if (PageName) {
  /**
   * 문서 타이틀 지정
   */
  const setDocTitle = () => {
    const current_page = window.location;
    MENU_DATA_ORI.forEach((obj, idx) => {
      if (PageName == obj.PAGE) {
        document.title = obj.뎁스1 || obj.뎁스2 || obj.뎁스3;
      }
    });
  };
  setDocTitle();
}


/**
 *
 * @param path
 * @param render_data
 * @constructor
 */
const Include = (path, render_data) => {
  if (typeof render_data === 'undefined') render_data = {};

  const el_script = document.currentScript;

  const html_str = Handlebars.loadHtml(path);

  //Compile the template
  const compiled_template = Handlebars.compile(html_str);

  //Render the data into the template
  const rendered = compiled_template(render_data);

  document.write(rendered);

  el_script.remove();
};

/**
 * 페이지 컨텐츠 Write
 * @constructor
 */
const LoadPage = () => {
  Include(`/hbs/page/${PageName}.hbs`, {window});
}

/**
 * 동기 HTML 로드
 * @param path
 * @param convert
 * @returns {*}
 * @constructor
 */
Handlebars.loadHtml = (path, convert) => {
  let html_str;
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    /*
    readyState
    0	UNSENT	Client has been created. open() not called yet.
    1	OPENED	open() has been called.
    2	HEADERS_RECEIVED	send() has been called, and headers and status are available.
    3	LOADING	Downloading; responseText holds partial data.
    4	DONE	The operation is complete.
    */
    if (this.readyState == 4) {
      if (this.status == 200) {
        // success
        html_str = this.responseText;
      } else {
        // error
        const msg = '404 Not Found';
        console.log(`%c${msg}%c${path}`, 'font-family:D2Coding; border:1px solid black; background:red; color:white; padding:5px; font-size:12px;', 'font-family:D2Coding; background-color:black; border:1px solid black; border-left:none; padding:5px; color:yellow; font-size:12px;');
        html_str = msg + '<br/>' + path;
      }
    }
  };
  xhttp.open('GET', path, false);
  xhttp.send();

  if (convert) html_str = convert(html_str);

  return html_str;
};

/**
 * short uid 반환
 * @returns {string}
 */
Handlebars.uid = () => {
  var firstPart = (Math.random() * 46656) | 0;
  var secondPart = (Math.random() * 46656) | 0;
  firstPart = ('000' + firstPart.toString(36)).slice(-3);
  secondPart = ('000' + secondPart.toString(36)).slice(-3);
  return firstPart + secondPart;
};

/**
 * uuid 반환
 * @returns {string}
 */
Handlebars.uuid = () => {
  // UUID v4 generator in JavaScript (RFC4122 compliant)
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 3) | 8;
    return v.toString(16);
  });
};

/************************************************
 Helper Start
 *************************************************/

/**
 * n 회 반복
 * ex)
 * {{#LOOP 10}}
 *   {{index}} {{number}} {{digit}}
 * {{/LOOP}}
 */
Handlebars.registerHelper('LOOP', function (n, block) {
  var accum = '';
  for (var i = 0; i < n; ++i) accum += block.fn({ index: i, number: i + 1, digit: (i + 1).toString().padStart(2, '0') });
  return accum;
});

/**
 * 루프
 * {{#EACH array}} OR {{#EACH (ARR '🍎|🍍|🥝|🍇|🍈')}}
 *   <div>
 *     {{obj}}
 *   </div>
 * {{/EACH}}
 */
Handlebars.registerHelper('EACH', function (data_list, options) {
  let accum = '';
  if (arguments.length > 1 && data_list) {
    //console.log(data_list);
    data_list.forEach((obj, idx) => {
      const obj_result = { obj: obj, index: idx, number: idx + 1, digit: (idx + 1).toString().padStart(2, '0') };

      accum += options.fn(obj_result);
    });
  }
  return accum;
});

/**
 * String to Array
 * EACH 와 같이 쓰임
 * {{#EACH (ARR '🍎|🍍|🥝|🍇|🍈')}}
 */
Handlebars.registerHelper('ARR', function (array_str, options) {
  let arr;
  if (array_str) {
    arr = array_str.split('|');
  } else {
    arr = false;
  }
  return arr;
});

/**
 * active_index 에 해당되면 문자열 반환
 * {{ON 0}}
 * 또는
 * {{ON 0 '_on'}}
 */
Handlebars.registerHelper('ON', function (active_index, custom_str, options) {
  const { index } = this;
  if (typeof custom_str != 'string') custom_str = 'On';
  const result = active_index === index ? custom_str : '';
  return result;
});

/**
 * 데이터에 \n 이 들어있을때 <br/> 로 치환
 * ex) {{BR string}}
 */
Handlebars.registerHelper('BR', function (text, options) {
  text = Handlebars.Utils.escapeExpression(text);
  text = text.replace(/(\r\n|\n|\r)/gm, '<br/>');
  text = text.replace(/\\n/g, '<br>');

  return new Handlebars.SafeString(text);
});

/**
 * 랜덤 난수
 * 1~10 중에서 랜덤 수
 * ex) {{RANDOM 1 10 }}
 */
Handlebars.registerHelper('RANDOM', function (MIN, MAX) {
  const k = Math.random() * (MAX - MIN) + MIN;
  return k;
});

/**
 * 랜덤 정수
 * 1~10 중에서 랜덤 뽑기
 * ex) {{INT 1 10 }}
 */
Handlebars.registerHelper('INT', function (MIN, MAX) {
  const k = Math.floor(Math.random() * (MAX - MIN + 1) + MIN);

  return k;
});

/**
 * 수식과 숫자 x 를 받아서 반환
 * ex) {{MATH 'x+1' index}}
 * ex) {{MATH '(x%2===1)?1:(x%6===0)?1:2' number}}
 */
Handlebars.registerHelper('MATH', function (mathematics, x) {
  const result = eval(mathematics);
  return result;
});

/**
 * Object 에 노드 추가
 * {{VAR this 'NAME' 'ksm'}}
 */
Handlebars.registerHelper('VAR', function (object, node_name, value, options) {
  if (value.name !== 'VAR') {
    if (typeof object === 'object') {
      object[node_name] = value;
    }
  } else {
    // value 가 할당 되지 않았을 경우 노드명 할당
    object[node_name] = node_name;
  }
});

/**
 * 고유 ID 문자열 반환
 * ex) {{UUID}}
 */
Handlebars.registerHelper('UUID', function () {
  return Handlebars.uuid();
});

/**
 * 고유 ID 문자열 반환
 * ex) {{UID}}
 */
Handlebars.registerHelper('UID', function () {
  return Handlebars.uid();
});

/**
 * 고유 ID 숫자 반환
 * ex) {{UNUM}}
 */
Handlebars.registerHelper('UNUM', function () {
  return Math.ceil(Date.now() * Math.random());
});

/**
 * 값 합치기
 * ex) {{ADD this 'NAME' (ADD 'ksm_' @key) }}
 */
Handlebars.registerHelper('ADD', function (v1, v2, options) {
  return v1 + v2;
});

/**
 * 값이 없을 경우 기본값 반환
 * {{SAFE height 'auto'}}
 */
Handlebars.registerHelper('SAFE', function (value, safeValue, options) {
  const out = value || safeValue;
  // return new Handlebars.SafeString(out);
  return out;
});

/**
 * 모듈 제작시에 전달 되지 않은 매개변수 값대신에 노드명을 넣어줌
 * {{SAFE2 this 'txt1|txt2|btn1|btn2'}}
 */
Handlebars.registerHelper('SAFE2', function (ori_data, array_string, options) {
  const node_arr = array_string.split('|');
  node_arr.forEach((node_name, idx) => {
    node_name = node_name.trim();
    ori_data[node_name] = node_name;
  });
});

/**
 * Partial 사용시에 경로를 동적으로 넣어야하는 경우가 있을때 사용
 * {{> (PATH obj.partial_path) }}
 */
Handlebars.registerHelper('PATH', function (path, options) {
  if (typeof path !== 'string') {
    return '';
  } else {
    return path;
  }
});

/**
 * 조건문 받아서 Boolean 반환
 * {{#if (IF this '==' true)}}
 *   <div>TRUE</div>
 * {{else}}
 *   <div>FALSE</div>
 * {{/if}}
 */
Handlebars.registerHelper('IF', function (v1, condition, v2, options) {
  if (
    eval(`v1
    ${condition}
    v2`)
  ) {
    // return options.fn(this);
    return true;
  } else {
    // return options.inverse(this);
    return false;
  }
});

/**
 * if 문과 함께 사용하고 , condition에 배열 스트링 받아서 포함여부 Boolean 으로 반환
 * {{#if (CONATIN BTN1 '할인률순,인기순')}}
 */
Handlebars.registerHelper('CONATIN', function (p1, condition, options) {
  let is_contain = false;
  const arr = condition.split(',');

  let i = 0;
  let len_i = arr.length;
  while (i < len_i) {
    const obj = arr[i].trim();
    if (obj == p1) {
      is_contain = true;
      break;
    }
    ++i;
  }
  return is_contain;
});

/**
 * 변수 값이 있는지 체크 후 Boolean 반환
 * {{#if (DV ID)}}
 *   <div>ID value is required.</div>
 * {{else}}
 *   <div>FALSE</div>
 * {{/if}}
 */
Handlebars.registerHelper('DV', function (p1, options) {
  return typeof p1 === 'undefined';
});

/**
 * 변수 값이 있는지 체크 후 없으면 노드명을 값으로 할당
 * {{DV2 'txt1'}}
 */
Handlebars.registerHelper('DV2', function (p1, options) {
  const _this = options.data;
  _this[p1] = p1;
  console.log(options);
});

/**
 * 기본값 할당
 * {{DF this 'array' '1|2|3'}}
 */
Handlebars.registerHelper('DF', function (object, node_name, value, options) {
  
  if (value.name !== 'DF') {
    if (typeof object === 'object') {
      if (typeof object[node_name] === 'undefined') {
        object[node_name] = value;
      } else {
        // console.warn(`Handlebars : DF : ${node_name}에 이미 값이 할당 되어 있습니다.`);
        // console.log(`${node_name} == `, object[node_name]);
      }
    }
  } else {
    // value 가 할당 되지 않았을 경우 경고
    console.error('Handlebars : DF : value 가 필요합니다.');
  }
});
