
module.exports = function statement (customerArg, movies) {

	const customer = createCustomer(customerArg, movies)

	let result = `Rental Record for ${customer.name()}\n`
	for (let r of customer.rentals()) {
		result += `\t${r.movie().title}\t${r.amount()}\n`
	}

	result += `Amount owed is ${customer.amount()}\n`
	result += `You earned ${customer.frequentRenterPoints()} frequent renter points\n`

	return result
}

function createCustomer (data, movies) {
	return {
		name: () => data.name,
		rentals: rentals,
		amount: amount,
		frequentRenterPoints: frequentRenterPoints
	}

	function rentals () {
		return data.rentals.map(createRental(movies))
	}

	function frequentRenterPoints () {
		return rentals()
			.map((r) => r.frequentRenterPoints())
			.reduce((a, b) => a + b, 0)

	}

	function amount () {
		return rentals()
			.reduce((total, r) => total + r.amount(), 0)
	}
}

const createRental = movies => data => {
	return {
		days: () => data.days,
		movieID: () => data.movieID,
		movie: movie,
		amount: amount,
		frequentRenterPoints: frequentRenterPoints
	}

	function movie () {
		return movies[data.movieID]
	}

	function amount () {
		let result = 0
		switch (movie().code) {
			case 'regular':
				result = 2
				if (data.days > 2) {
					result += (data.days - 2) * 1.5
				}
				return result
			case 'new':
				result = data.days * 3
				return result
			case 'childrens':
				result = 1.5
				if (data.days > 3) {
					result += (data.days - 3) * 1.5
				}
				return result
		}
		return result
	}

	function frequentRenterPoints () {
		return (movie().code === 'new' && data.days > 2) ? 2 : 1
	}
}
