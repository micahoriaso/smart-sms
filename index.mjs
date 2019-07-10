import http from 'http';

import app from './app';

const port = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(port, () =>
console.log(`Server running at http://127.0.0.1:${port}`)
);