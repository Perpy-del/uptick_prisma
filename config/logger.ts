import path from 'path';
import * as rfs from 'rotating-file-stream';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pad = (num: any) => (num > 9) ? "" : "0" + num;
const generator = () => {
  const time = new Date();

  const year = time.getFullYear();
  const month = pad(time.getMonth() + 1);
  const day = pad(time.getDate());

  return `uptick-${year}-${month}-${day}.log`;
};

const rotatingFileStream: any = rfs.createStream(generator, {
  interval: "1d",
  path: path.join(__dirname, '../storage/logs')
});

export default rotatingFileStream;