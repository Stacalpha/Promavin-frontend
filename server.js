const express = require('express');
const app = express();

const PORT = process.env.PORT || 3001;
const build = './dist';

app.use(express.static(build));

app.listen(PORT, ()=>console.log(`Serving ${build} folder on port ${PORT}`));
