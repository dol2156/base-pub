(() => {
  const hn = window.location.hostname;
  let is_local = false;
  if(hn.indexOf('localhost') > -1) is_local = true;
  if(hn.indexOf('127.0') > -1) is_local = true;
  if(hn.indexOf('192.') > -1) is_local = true;
  if(hn.indexOf('10.') > -1) is_local = true;
  if(!is_local){
    const msg = 'The root folder is the "dist".';
    document.documentElement.innerHTML = msg;
    window.stop();
  }
})()

/* https://docs.google.com/spreadsheets/d/1oui5VZpSWpdrpYsHZ9Rwmrv5EVOq3suyndxp4RNDxW8/edit#gid=1038524317 */
var API_URL = 'https://script.google.com/macros/s/AKfycbyRsrHPlyzuf5mX6Nfob5VJR3IBjbMIG3XxQYnk5iu7U04rmot7-MJ9xHGe5ls96SS_Jw/exec';
if(typeof module !== "undefined" ){
  module.exports = API_URL;
}
