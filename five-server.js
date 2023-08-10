// https://github.com/yandeu/five-server#readme
// https://github.com/yandeu/five-server/blob/main/src/types.ts
const FiveServer = require('five-server').default;
const fiveServer = new FiveServer();
const option = {
  useLocalIp: true,
  // port: 3000,
  open: true,
  watch: ['./hbs/', './public/'],
  // wait:1000,
  // injectCss:false,
  // ignore: [/\.s[ac]ss$/i, /\.tsx?$/i],
};

fiveServer.start(option);
