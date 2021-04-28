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

app.use(express.static('./public'));

app.get('/', (req, res) => {
	let book = {
		title: 'test',
		author: 'derp',
		pages: 123,
		genre: 'drama',
		read: true,
	};
	res.render('index', {
		title: 'H5 ServersideScripting',
		message: 'Hello World',
		data: [1, 2, 3, 4, 5, 6],
		book
	});
});


app.get('/books/:bookId', (req, res)=>{
	
	res.render('books');
});


app.post('/books/:bookId', (req, res)=>{

	res.render('books',{
		title : req.body.title
	});
});



app.listen(port, () => {
	console.log(`Serveren kører... http://localhost:${port}`);
});