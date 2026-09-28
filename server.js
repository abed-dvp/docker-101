const http = require('http');

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ status: 'ok' }));
  }

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    message: 'Docker 101 app is running',
    port,
    hostname: process.env.HOSTNAME || 'unknown'
  }));
});

server.listen(port, '0.0.0.0', () => {
  console.log(`Docker 101 app listening on port ${port}`);
});
