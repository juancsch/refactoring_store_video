
module.exports = function statement (customer, movies, format = 'text') {

	switch (format) {
		case 'text':
			return textStatement()
	}
	throw new Error(`unknown statement format ${format}`)

	function textStatement () {

		let result = `Rental Record for ${customer.name}\n`
		for (let r of customer.rentals) {
			result += `\t${movieFor(r).title}\t${amountFor(r)}\n`
		}

		result += `Amount owed is ${totalAmount()}\n`
		result += `You earned ${totalFrequentRenterPoints()} frequent renter points\n`
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
