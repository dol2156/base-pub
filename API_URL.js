(() => {
  function isLocalTestServer() {
    const hostname = window.location.hostname;

    // hostname이 localhost인지 확인
    if (hostname === 'localhost') {
      return true;
    }

    // hostname이 IP 주소 형식인지 확인
    const ipPattern = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;

    if (ipPattern.test(hostname)) {
      return true;
    }

    return false;
  }

  if(!isLocalTestServer()) window.location.href = `/blank.html`;
})();

/* https://docs.google.com/spreadsheets/d/1oui5VZpSWpdrpYsHZ9Rwmrv5EVOq3suyndxp4RNDxW8/edit#gid=1038524317 */
var API_URL = 'https://script.google.com/macros/s/AKfycbyRsrHPlyzuf5mX6Nfob5VJR3IBjbMIG3XxQYnk5iu7U04rmot7-MJ9xHGe5ls96SS_Jw/exec';
if(typeof module !== "undefined" ){
  module.exports = API_URL;
}
