import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

export default () => {
  console.log('__dirname', __dirname);
  return yaml.load(
    readFileSync(join(__dirname, 'config.yaml'), 'utf8'),
  ) as Record<string, any>;
};
