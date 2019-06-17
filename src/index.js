
module.exports = {
	statement,
	htmlStatement
}

function statement (customer, movies) {

	let result = `Rental Record for ${customer.name}\n`
	for (let r of customer.rentals) {
		result += `\t${movie(r).title}\t${rentalAmount(r)}\n`
	}

	result += `Amount owed is ${amount()}\n`
	result += `You earned ${frequentRenterPoints()} frequent renter points\n`

	return result

	function amount () { return totalAmount(customer, movies) }
	function frequentRenterPoints () { return totalFrequentRenterPoints(customer, movies) }
	function rentalAmount (aRental) { return amountFor(aRental, movies) }
	function movie (aRental) { return movieFor(aRental, movies) }
}

function htmlStatement (customer, movies) {

	const amount = () => totalAmount(customer, movies)
	const frequentRenterPoints = () => totalFrequentRenterPoints(customer, movies)
	const movie = (aRental) => movieFor(aRental, movies)
	const rentalAmount = (aRental) => amountFor(aRental, movies)

	let result = `<h1>Rental Record for <em>${customer.name}</em></h1>\n`
	result += '<table>\n'
	for (let r of customer.rentals) {
		result += `  <tr><td>${movie(r).title}</td><td>${rentalAmount(r)}</td></tr>\n`
	}

	result += '</table>\n'
	result += `<p>Amount owed is <em>${amount()}</em></p>\n`
	result += `<p>You earned <em>${frequentRenterPoints()}</em> frequent renter points</p>\n`

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
