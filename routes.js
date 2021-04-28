const Book = require('./models/bookModel');

module.exports = (app)=>{

	app.get('/',  async (req, res) => {

		let books = await Book.find();

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
			book,
			books
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

};