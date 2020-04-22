const express = require('express');
const app = express();

const PORT = 3001;
const build = './stable-build';
const PORT = process.env.PORT || 3001;
const build = './build';

app.use(express.static(build));

app.listen(PORT, ()=>console.log(`Serving ${build} folder on port ${PORT}`));
