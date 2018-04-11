// Maak een voorraad auto objecten aan in een array object
// Geen SQL database om eerst alleen een REST service te maken onafhankelijk van dataopslag
let stock = [
	{ serienummer: 10001, merk: 'BMW', type: '635i', bouwjaar: 1985, kleur: 'Blauw', prijs: 10250 },
	{ serienummer: 10002, merk: 'BMW', type: '535i', bouwjaar: 2010, kleur: 'Grijs', prijs: 24500 },
	{ serienummer: 10003, merk: 'BMW', type: '740d', bouwjaar: 1999, kleur: 'Rood', prijs: 2995 },
	{ serienummer: 10004, merk: 'BMW', type: '330i', bouwjaar: 2003, kleur: 'Rood', prijs: 4500 },
	{ serienummer: 10005, merk: 'BMW', type: '530d', bouwjaar: 2006, kleur: 'Groen', prijs: 9500 },
	{ serienummer: 10006, merk: 'BMW', type: '218i', bouwjaar: 2015, kleur: 'Paars', prijs: 28950 },
	{ serienummer: 10007, merk: 'BMW', type: '118d', bouwjaar: 2012, kleur: 'Zilver', prijs: 18900 },
	{ serienummer: 10008, merk: 'BMW', type: 'M6', bouwjaar: 2004, kleur: 'Bruin', prijs: 23450 },
	{ serienummer: 10009, merk: 'BMW', type: 'M135i', bouwjaar: 2014, kleur: 'Wit', prijs: 14500 },
	{ serienummer: 10010, merk: 'BMW', type: '535d', bouwjaar: 2008, kleur: 'Geel', prijs: 12500 }
]

// Laadt de module "express" in het geheugen en ken het resultaat toe aan de constante "createExpressApplication"
// Het resulaat van require('express') is dat de constante "createExpressApplication" verwijst naar de function "createApplication()" uit de express module
// Daarom hebben we de constante ook de naam "createExpressApplication" gegeven zodat het duidelijk is dat het een function is die uitgevoed kan worden
const createExpressApplication = require('express')
// Het uitvoeren van de function "createExpressApplication" is het uitvoeren van de function "createApplication()" uit de express module
// Het resultaat is dat de constante "app" verwijst naar een object met functions die gebruikt kunnen worden om de expresss application te configureren
// Als je in de debugger de constante app bekijkt zie je dat het in essentie een function is.
const app = createExpressApplication()
// Laadt de module "body-parser" in het geheugen en ken het resultaat toe aan de constante "bodyParser"
const bodyParser = require('body-parser')

// Voer de funtion "use" uit van het "app" object
// De use function heeft een middleware function nodig als parameter volgens de Express documentatie
// Het uitvoeren van de bodyParser.json function levert als resultaat een middleware function welke dus als parameter wordt meegegeven aan de use function
// Het resultaat is dat voor iedere HTTP call naar onze server de body van de request omgezet wordt naar een JSON object
// Vooral bij de PUT en POST HTTP call maken we gebruik van de body property van de req (request) parameter
app.use(bodyParser.json())

// Definieer een filter object voor alle HTTP calls met de route /cars
app.all('/cars', function (req, res, next) {
	console.log('Accessing the secret section ...')
	next() // pass control to the next handler
})

// Write a welcome message
app.get('/', (req, res) => res.json({ hello: 'This is a JSON REST service in JavaScript!' }))


app.get('/cars', function (req, res) {
	let stockCopy = stock.slice()
	if (req.query.sort) {
		if (req.query.sort === 'prijs') {
			stockCopy.sort(function (a, b) { return a.prijs - b.prijs })
		} else if (req.query.sort === 'bouwjaar') {
			stockCopy.sort(function (a, b) { return a.bouwjaar - b.bouwjaar }).reverse()
		}
	}
	res.status(200).json(stockCopy)
})

app.get('/cars/:id', function (req, res) {
	let carId = reqarams.id
	let car = stock.find(stockCar => stockCar.serienummer == carId)
	if (car !== undefined) {
		res.status(200).json(car)
	} else {
		res.sendStatus(404)
	}
})

/**
 * Voegt een nieuw record toe aan de bestaande voorraad.
 * De URL is /cars en de aanroep is een HTTP POST opdracht.
 * De Content-Type header is application/json.
 * De body content is een JSON object met de properties van een auto.
 */
app.post('/cars', function (req, res) {
	// Haal alle serienummers op uit de voorraad en plaats deze in een nieuwe array
	let serialNumbers = Array.from(stock, car => car.serienummer)
	// Haal de maximum waarde van de serienummers op uit de array
	let max = Math.max(...serialNumbers)
	// Ken een nieuwe waarde toe aan het serienummer van de nieuwe auto en neem daarvoor de max + 1
	req.body.serienummer = ++max
	// Voeg de nieuwe auto toe aan de voorraad
	stock.push(req.body)
	// Stuur een HTTP status 201 en een body met de nieuwe auto terug naar de client
	res.status(201).json(req.body)
})

app.put('/cars/:id', function (req, res) {
	let carId = req.params.id
	let car = stock.find(stockCar => stockCar.serienummer == carId)
	if (car !== undefined) {
		car.bouwjaar = req.body.bouwjaar
		car.kleur = req.body.kleur
		car.merk = req.body.merk
		car.prijs = req.body.prijs
		car.type = req.body.type
		res.status(201).json(req.body)
	} else {
		res.sendStatus(404)
	}
})

app.delete('/cars/:id', function (req, res) {
	let carId = req.params.id
	let index = stock.findIndex(car => car.serienummer == carId);
	if (index > -1) {
		stock.splice(index, 1)
		res.sendStatus(204)
	} else {
		res.sendStatus(404)
	}
})


app.listen(3000, () => console.log('Example app listening on port 3000!'))
