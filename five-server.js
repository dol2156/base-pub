// https://github.com/yandeu/five-server#readme
// https://github.com/yandeu/five-server/blob/main/src/types.ts
const FiveServer = require('five-server').default;
const fiveServer = new FiveServer();
const option = {
  // port: 3000,
  open: true,
  // host: 'localhost',
  // watch: ['./index.html', './hbs/', './public/'],
  // ignore: [/\.s[ac]ss$/i, /\.tsx?$/i],
};

fiveServer.start(option);
