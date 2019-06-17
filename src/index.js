
module.exports = function statement (customer, movies, format = 'text') {

	const dispatchTable = {
		'text': textStatement,
		'html': htmlStatement
	}

	if (undefined === dispatchTable[format]) {
		throw new Error(`unknown statement format ${format}`)
	}

	return dispatchTable[format]()

	function textStatement () {

		let result = `Rental Record for ${customer.name}\n`
		for (let r of customer.rentals) {
			result += `\t${movieFor(r).title}\t${amountFor(r)}\n`
		}

		result += `Amount owed is ${totalAmount()}\n`
		result += `You earned ${totalFrequentRenterPoints()} frequent renter points\n`
		return result
	}

	function htmlStatement () {

		let result = `<h1>Rental Record for <em>${customer.name}</em></h1>\n`
		result += '<table>\n'
		for (let r of customer.rentals) {
			result += `  <tr><td>${movieFor(r).title}</td><td>${amountFor(r)}</td></tr>\n`
		}

		result += '</table>\n'
		result += `<p>Amount owed is <em>${totalAmount()}</em></p>\n`
		result += `<p>You earned <em>${totalFrequentRenterPoints()}</em> frequent renter points</p>\n`

		return result
	}

	function movieFor (rental) {
		return movies[rental.movieID]
	}

	function amountFor (rental) {
		let amount = 0
		switch (movieFor(rental).code) {
			case 'regular':
				amount = 2
				if (rental.days > 2) {
					amount += (rental.days - 2) * 1.5
				}
				return amount
			case 'new':
				return rental.days * 3
			case 'childrens':
				amount = 1.5
				if (rental.days > 3) {
					amount += (rental.days - 3) * 1.5
				}
				return amount
		}
		return amount
	}

	function totalAmount () {
		return customer.rentals
			.reduce((total, r) => total + amountFor(r), 0)
	}

	function totalFrequentRenterPoints () {
		return customer.rentals
			.map(frequentRenterPointsFor)
			.reduce((a, b) => a + b, 0)

		function frequentRenterPointsFor (rental) {
			return (movieFor(rental).code === 'new' && rental.days > 2) ? 2 : 1
		}
	}
}
