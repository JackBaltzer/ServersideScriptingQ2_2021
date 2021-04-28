const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const logger = require('morgan');
app.use(logger('dev', {
	skip: req => !req.url.endsWith('.html') && req.url.indexOf('.') > -1
}));


app.use(express.json());
app.use(express.urlencoded( { extended:true} ));

app.set('view engine', 'ejs');
app.set('views', './views');


const mongoose = require("mongoose");
// starter mongoDb og opretter forbindelsen til databasen, 
// også selv om variablen 'db' ikke benyttes
const db = mongoose.connect("mongodb://localhost:27017/ServersideScriptingQ2_2021", {
   useNewUrlParser: true,
   useUnifiedTopology: true
});

app.use(express.static('./public'));

require('./routes')(app);



app.listen(port, () => {
	console.log(`Serveren kører... http://localhost:${port}`);
});