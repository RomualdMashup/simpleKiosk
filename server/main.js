const express = require('express');
const app = express();
const path = require('path');
const port = process.env.port || 3000;

app.use("/dist", express.static(path.join(__dirname, '/../dist')));
app.use("/public", express.static(path.join(__dirname, '/../')));

app.get('/',(req, res) => {
  res.sendFile(path.join(__dirname, '/../index.html'));
});

app.listen(port);
console.log(`server listening on ${port}`)