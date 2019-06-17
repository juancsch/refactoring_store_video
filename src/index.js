
module.exports = {
	statement,
	htmlStatement
}

function statement (customer, movies) {

	let result = `Rental Record for ${customer.name}\n`
	for (let r of customer.rentals) {
		result += `\t${movieFor(r, movies).title}\t${amountFor(r, movies)}\n`
	}

	result += `Amount owed is ${totalAmount(customer, movies)}\n`
	result += `You earned ${totalFrequentRenterPoints(customer, movies)} frequent renter points\n`

	return result
}

function htmlStatement (customer, movies) {

	let result = `<h1>Rental Record for <em>${customer.name}</em></h1>\n`
	result += '<table>\n'
	for (let r of customer.rentals) {
		result += `  <tr><td>${movieFor(r, movies).title}</td><td>${amountFor(r, movies)}</td></tr>\n`
	}

	result += '</table>\n'
	result += `<p>Amount owed is <em>${totalAmount(customer, movies)}</em></p>\n`
	result += `<p>You earned <em>${totalFrequentRenterPoints(customer, movies)}</em> frequent renter points</p>\n`

	return result
}

function movieFor (rental, movies) {
	return movies[rental.movieID]
}

function amountFor (rental, movies) {
	let result = 0
	switch (movieFor(rental, movies).code) {
		case 'regular':
			result = 2
			if (rental.days > 2) {
				result += (rental.days - 2) * 1.5
			}
			return result
		case 'new':
			result = rental.days * 3
			return result
		case 'childrens':
			result = 1.5
			if (rental.days > 3) {
				result += (rental.days - 3) * 1.5
			}
			return result
	}
	return result
}

function totalFrequentRenterPoints (customer, movies) {
	return customer.rentals
		.map((r) => frequentRenterPointsFor(r, movies))
		.reduce((a, b) => a + b, 0)

	function frequentRenterPointsFor (rental, movies) {
		return (movieFor(rental, movies).code === 'new' && rental.days > 2) ? 2 : 1
	}

}

function totalAmount (customer, movies) {
	return customer.rentals
		.reduce((total, r) => total + amountFor(r, movies), 0)
}
