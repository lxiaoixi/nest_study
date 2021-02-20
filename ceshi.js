const http = require('http');
const { AsyncLocalStorage } = require('async_hooks');
const { randomBytes } = require('crypto')

const asyncLocalStorage = new AsyncLocalStorage();

function logWithId(msg) {
  const ctx = asyncLocalStorage.getStore();
  const {requestId, timestamp, req} = ctx;
  console.log(requestId, timestamp, req.headers.token, msg)
  // console.log(`${id !== undefined ? id : '-'}:`, msg);
}

http.createServer((req, res) => {
  const requestId = randomBytes(16).toString('hex')
  const context = { requestId, timestamp: Date.now(), req }

  asyncLocalStorage.run(context, () => {
    logWithId('start');
    // Imagine any chain of async operations here
    setImmediate(() => {
      logWithId('finish');
      res.end();
    });
  });
}).listen(8080);
