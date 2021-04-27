const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const logger = require('morgan');
app.use(logger('dev',{
	skip: req => !req.url.endsWith('.html') && req.url.indexOf('.') > -1
}));

app.set('view engine', 'ejs');
app.set('views','./views');

app.use(express.static('./public'));

app.get('/', (req, res)=>{
	res.render('index');
});

app.listen(port,()=>{
	console.log(`Serveren kører... http://localhost:${port}`);
});