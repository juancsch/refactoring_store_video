const videoStore = require('../src')

const custumer = {
	'name': 'martin',
	'rentals': [
		{ 'movieID': 'F001', 'days': 3 },
		{ 'movieID': 'F002', 'days': 1 }
	]
}

const movies = {
	'F001': { 'title': 'Ran', 'code': 'regular' },
	'F002': { 'title': 'Trois Couleurs: Bleu', 'code': 'regular' }
}

console.log(
	videoStore.statement(custumer, movies)
)
