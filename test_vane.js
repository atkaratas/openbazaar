const http = require('http');

const options = {
  hostname: 'localhost',
  port: 3006,
  path: '/api/chat',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
};

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    console.log(`BODY: ${chunk}`);
  });
  res.on('end', () => {
    console.log('No more data in response.');
  });
});

req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});

const postData = JSON.stringify({
  message: {
    messageId: "msg-12345",
    chatId: "chat-12345",
    content: "What is quantum computing?"
  },
  optimizationMode: "speed",
  chatModel: {
    providerId: "f752058a-075b-4544-8912-172bdf0c894c",
    key: "qwen2.5-coder:7b"
  },
  embeddingModel: {
    providerId: "f752058a-075b-4544-8912-172bdf0c894c",
    key: "nomic-embed-text:latest"
  },
  history: [],
  sources: [],
  files: []
});

req.write(postData);
req.end();
