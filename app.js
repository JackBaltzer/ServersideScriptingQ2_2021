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
	let book = {
		title:'test',
		pages: 123
	};
	res.render('index',{
		// title: 'H5 ServersideScripting',
		message: 'Hello World',
		data:[1,2,3,4,5,6],
		title: "test",
		author: 'derp',
		pages: 123,
		genre: 'drama',
		read: true,
		book: book
	});
});

app.listen(port,()=>{
	console.log(`Serveren kører... http://localhost:${port}`);
});