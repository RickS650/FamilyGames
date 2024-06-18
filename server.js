import { get, createServer } from 'http';

// Function to check if the server is running
function checkServer(callback) {
  get('http://localhost:8080', (res) => {
    // Server is running
    callback(true);
  }).on('error', (err) => {
    // Server is not running
    callback(false);
  });
}

// Function to start the server
function startServer() {
  const server = createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World!');
  });

  server.listen(8080, () => {
    console.log('Server started on port 8080');
  });
}

// Check if server is running
checkServer((isRunning) => {
    alert("here");
  if (!isRunning) {
    // Start the server if it is not running
    startServer();
  }
});