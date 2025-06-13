require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const cors = require('cors');

const port = 8000;
const app = express();

app.use(cors());

app.use(cookieParser());
app.use(express.json());

app.use('/', routes);

mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => {
	app.listen(port, () => {
		console.log(`Server has been started on port ${port}...`);
	});
});
