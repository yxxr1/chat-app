# Frontend for [node-chat](https://github.com/yxxr1/node-chat)

[Envs](src/config/common.ts):
- `API_URL`: api url, default `http://localhost:8080`
- `WS_URL`: api ws url, default `ws://localhost:8080/ws`
- `DEV_PORT`: dev server port, default 3000

Start app:
- `npm i` to install deps
- `npm run serve` to start dev server

Execute tests:
- `npm run test` to run jest tests
- `npm run test:e2e` to run e2e tests, need dev server and backend to be started locally
