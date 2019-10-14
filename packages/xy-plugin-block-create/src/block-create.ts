import assert from 'assert';
import path from 'path';
import { copy } from 'fs-jetpack';

/**
 * 运行
 * @param args 参数
 */
export default function run(args: Array<string>): void {
  const destDir = args[1] || 'block-demo';

  const blockDemoDir = path.resolve(__dirname, '..', 'block-demo');

  copy(blockDemoDir, path.resolve(destDir), {
    overwrite: true,
  });
}
