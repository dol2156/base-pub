/**
 * MENU_DATA(사이트맵 데이터) 는 구글 시트 API 를 이용해서 가져옴
 * API Sheet URL : https://docs.google.com/spreadsheets/d/1oui5VZpSWpdrpYsHZ9Rwmrv5EVOq3suyndxp4RNDxW8/edit#gid=1038524317
 * Sheet 권한 문의 : dol2156@gmail.com
 */
const google_sheet_api = 'https://script.google.com/macros/s/AKfycbyRsrHPlyzuf5mX6Nfob5VJR3IBjbMIG3XxQYnk5iu7U04rmot7-MJ9xHGe5ls96SS_Jw/exec';

let PageName, DocTitle;
(() => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  PageName = urlParams.get('page');
  if (!PageName) window.location = '/index.html?page=_pub_sitemap';
  DocTitle = urlParams.get('title');
  if (DocTitle) document.title = DocTitle;
})();

(() => {
  // 사이트맵에서만 메뉴데이터 로드
  if (PageName != '_pub_sitemap') return;

  const loadJson = (path, convert) => {
    let result;
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
          result = this.responseText;
        } else {
          // error
          const msg = '404 Not Found';
          console.log(`%c${msg}%c${path}`, 'font-family:D2Coding; border:1px solid black; background:red; color:white; padding:5px; font-size:12px;', 'font-family:D2Coding; background-color:black; border:1px solid black; border-left:none; padding:5px; color:yellow; font-size:12px;');
        }
      }
    };
    xhttp.open('GET', path, false);
    xhttp.send();

    return result;
  };

  const saveLocalData = (json) => {
    let arr = [];

    // child 노드 추가
    json.forEach((el, index) => {
      el.child = [];
    });

    let d1_el;
    let d2_el;
    let d3_el;
    json.forEach((el, index) => {
      // 뎁스1 넣기
      const d1 = el['뎁스1'];
      if (d1) {
        el.path = reaplceStr(d1);

        d2_el = undefined;
        d3_el = undefined;
        d1_el = el;

        arr.push(d1_el);
      }

      const d2 = el['뎁스2'];
      if (d2) {
        el.path = d1_el.path + '/' + reaplceStr(d2);

        d3_el = undefined;
        d2_el = el;
        d1_el.child.push(d2_el);

        // data.splice(index, 1);
      }

      const d3 = el['뎁스3'];
      if (d3) {
        el.path = d2_el.path + '/' + reaplceStr(d3);

        d3_el = el;
        d2_el.child.push(d3_el);
      }
    });

    window.MENU_DATA = arr;

    /**
     * 특수문자 및 공백 제거
     * @param string
     * @returns {string}
     */
    function reaplceStr(string) {
      if (typeof string == 'number') string = string.toString();
      // eslint-disable-next-line
      const regExp = /[ \{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\ '\"\\(\=]/gi;
      return string.replace(regExp, '');
    }
  };

  let json = loadJson(google_sheet_api);
  json = JSON.parse(json);
  saveLocalData(json);
})();
