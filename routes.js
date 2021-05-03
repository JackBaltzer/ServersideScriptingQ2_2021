const Book = require('./models/bookModel');

async function getBooks(){
	return await Book
						.find()
						.collation({locale:'da'})
						.sort({'title':'asc'});
}

 
module.exports = (app) => {

	app.get('/', async (req, res) => {

		let books = await getBooks();

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


	app.get('/book/:id', async (req, res) => {
		let book = Book.findById(req.params.id);
		res.render('book', {
			book
		});
	});


	app.get('/books', async (req, res) => {
		let books = await getBooks();

		res.render('books', {
			book: new Book(),
			books
		});
	});


	app.post('/books', async (req, res) => {

		let book = new Book(req.body);

		let message = [];
		if (book.title == "") {
			message.push('Udfyld titel');
		}

		if (book.author == "") {
			message.push('Udfyld forfatter');
		}

		if (book.pages == null) {
			message.push('Udfyld sider');
		}
		if (isNaN(req.body.pages)) {
			message.push('Sideantal skal være et tal')
		}

		book.read = (req.body.read == "on" ? true : false);

		if (message.length == 0) {
			await book.save();
			res.redirect('/books');
		} else {
			let books = await getBooks();
			res.render('books', {
				book: req.body,
				books,
				message: message.join(', ')
			});
		}
	});


	app.get('/books/edit/:id', async (req, res) => {
		let books = await getBooks();

		try {
			let book = await Book.findById(req.params.id);
			if (book != null) {

				res.render('books', {
					books,
					book
				});
			}
		} catch (ex) {
			console.log(ex.message);
			res.redirect('/books');
		}
	});

	app.post('/books/edit/:id', async (req, res) => {
		let message = [];

		if (req.body.title == "") {
			message.push('Udfyld titel');
		}

		if (message.length == 0) {
			req.body.read = (req.body.read == "on" ? true : false);
			await Book.findByIdAndUpdate(req.params.id, req.body);
			res.redirect('/books');
		}else{
			let books = await getBooks();
			res.render('books', {
				book: req.body,
				books,
				message: message.join(', ')
			});
		}



		res.redirect('/books');
	});

	app.get('/books/delete/:id', async (req, res) => {
		await Book.findByIdAndDelete(req.params.id);
		res.redirect('/books');
	});

};