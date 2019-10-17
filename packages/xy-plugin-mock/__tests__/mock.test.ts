import { join } from 'path';
// import { writeFileSync } from 'fs';
// import express from 'express';
import portfinder from 'portfinder';
import got from 'got';
// import rimraf from 'rimraf';
import createServer from '../src/create-server';

let port = 80;
// let server;
const cwd = join(__dirname, 'mock-files');
// const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
// let watchError = null;

const HOME_PAGE = 'homepage';
// let watcher = null;

beforeAll(async () => {});

afterAll(() => {});

test('get', async () => {
  const { body } = await got(`http://127.0.0.1/api/w`);
  expect(body).toEqual(`{"a":1}`);
});

test('post', async () => {
  const { body } = await got(`http://127.0.0.1/api/a`, {
    method: 'post',
  });
  expect(body).toEqual(`{"a":1}`);
});
test('get', async () => {
  const { body } = await got(`http://127.0.0.1/api/users/32423`);
  expect(body).toEqual(`{"a":1}`);
});

test('function handler', async () => {
  const { body } = await got(`http://localhost:${port}/api/b`);
  expect(body).toEqual(`{"b":1}`);
});

test('fallback to next', async () => {
  const { body } = await got(`http://localhost:${port}/`);
  expect(body).toEqual(HOME_PAGE);
});

test('params', async () => {
  const { body } = await got(`http://localhost:${port}/api/users/1`);
  expect(body).toEqual(`{"a":1}`);
});

// test('watch', async () => {
//   const absTmpFile = join(cwd, 'mock/tmp.js');
//   writeFileSync(absTmpFile, `export default {'/api/tmp': {tmp:1}}`, 'utf-8');
//   await delay(500);
//   const { body } = await got(`http://localhost:${port}/api/tmp`);
//   expect(body).toEqual(`{"tmp":1}`);
//   rimraf.sync(absTmpFile);
// });

// test('watch with error', async () => {
//   const absTmpFile = join(cwd, 'mock/tmp2.js');
//   writeFileSync(absTmpFile, `export defaul;`, 'utf-8');
//   await delay(500);
//   expect(watchError === null).toEqual(false);
//   rimraf.sync(absTmpFile);
// });

// afterAll(() => {
//   if (server) server.close();
// });
