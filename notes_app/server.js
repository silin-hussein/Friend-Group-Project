import express from 'express';
import {createServer} from 'http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

import {startSocketIo} from './sockets.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const server = createServer(app);

app.use(express.static(join(__dirname, 'public')));

server.listen(4001, () => {
    console.log('Example app listening on port 4001!');
});

startSocketIo(server);