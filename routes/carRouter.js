const router = require('express').Router()

const Car = require('../controllers/carController')

router.post('/', Car.createCar)
router.get('/', Car.findAllCars)
router.get('/:name', Car.findCarById)
router.patch('/:name', Car.updateCar)
router.delete('/:name', Car.deleteCar)

module.exports = router