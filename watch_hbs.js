/* https://www.npmjs.com/package/chokidar */
const chokidar = require('chokidar');
const watch_folder = './hbs';
const { exec } = require('child_process');

// One-liner for current directory
const watcher = chokidar.watch(watch_folder);

watcher.on('ready', () => {
  // 초기화 완료 되면

  // watcher.on('change', (path) => console.log(`File ${path} has been change`));

  // 파일 추가 또는 삭제 감지 되면, HBS 데이터 갱신
  watcher.on('add', updateData);
  watcher.on('unlink', updateData);

  function updateData(path) {
    exec('node create_hbs_data.js', (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return;
      }
      console.log(stdout);
    });
  }
});
