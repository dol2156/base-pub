/* https://docs.google.com/spreadsheets/d/129_KRnvwnKwySm_wZ2t58vgrNMBEVG8JCksrxxbJLl4/edit#gid=1038524317 */
const google_sheet_api =
  'https://script.google.com/macros/s/AKfycbyL5A1emq2Y514kZh74uxLLcSJ5Z7TKuU_oTUwmDS7sBm7QULPE-6L8DAqODsuqImid/exec';

const fs = require('fs');
const beautify = require('js-beautify').js;
const FileUtil = require('./file_util.js');

let file_text = '';

(async () => {
  try {
    const response = await fetch(google_sheet_api);
    const json = await response.json();
    file_text += `var MENU_DATA_ORI = ${JSON.stringify(json)};\n`;

    saveLocalData(json);
  } catch (error) {
    console.log(error);
  }
})();

function saveLocalData(json) {
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

  // file_text += `module.exports = ${JSON.stringify(arr)};`;
  file_text += `var MENU_DATA = ${JSON.stringify(arr)};`;

  const create_file_path = './public/data/MENU_DATA.js';

  // 정렬
  // file_text = beautify(file_text, { indent_size: 2, space_in_empty_paren: true });

  FileUtil.writeFile(create_file_path, file_text);
  
}

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