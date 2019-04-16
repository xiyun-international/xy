
import gulp from 'gulp';

import { existsSync, readdirSync, readFileSync } from 'fs';
import rollup, { RollupOptions, OutputOptions } from 'rollup';

import { getExistFile } from './utils';
import getUserConfig from './getUserConfig';

import { IOpts } from './types';

export async function build(opts: IOpts) {
  const { cwd } = opts;
}

export default async function(opts: IOpts) {
  await build(opts);
}
