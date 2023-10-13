const { Car } = require("../models/index")

const createCar = async (req, res) => {
    const {name, type, image, capacity, rentPerDay, description, availableAt} = req.body
    try {
        const newCar = await Car.create({
            name,
            type,
            image,
            capacity,
            rentPerDay,
            description,
            availableAt
        })

        res.status(200).json({
            status: "success",
            data : {
                newCar
            }
        })
    } catch (err) {
        res.status(404).json({
            status: 'failed',
            message: err.message
        })
    }
}

const findAllCars = async (req, res) => {
    try {
        const Cars = await Car.findAll()

        res.status(200).json({
            status: "success",
            data : {
                Cars
            }
        })
    } catch (err) {
        res.status(404).json({
            status: 'failed',
            message: err.message
        })
    }
}

const findCarById = async (req, res) => {
    try {
        const Cars = await Car.findOne({
            where: {
                name : req.params.name
            }
        })

        res.status(200).json({
            status: "success",
            message: "Data found!",
            data : {
                Cars
            }
        })
    } catch (err) {
        res.status(404).json({
            status: 'failed',
            message: err.message
        })
    }
}
const updateCar = async (req, res) => {
    const {name, type, image, capacity, rentPerDay, description, availableAt} = req.body
    try {
        const updateCar = await Car.update({
            name,
            type,
            image,
            capacity,
            rentPerDay,
            description,
            availableAt
        },
            {
                where: {
                    name: req.params.name,
                }
            },
        );  

        if(!updateCar){
            return res.status(404).json({
                status: 'Not found!',
                message: "Data not found!"
            })
        }

        res.status(200).json({
            status: "success",
            message: "Success update data!",
            data: {
                Car,
            },
        });
    } catch (err) {
        res.status(500).json({
            status: "failed",
            mesagge: err.mesagge
        });
    }
};

const deleteCar = async (req, res) => {
    try {
        const deleteCar = await Car.destroy({
            where: {
                name: req.params.name,
            }
        });
        
        if(!deleteCar) {
            return res.status(404).json({
                status: "failed",
                message: "Data not found!"
            })
        }

        res.status(200).json({
            status: "success",
            message: "Success delete data!",
        });
    } catch (err) {
        res.status(500).json({
            status: "failed",
            mesagge: err.mesagge
        });
    }
};

module.exports = {
    createCar,
    findAllCars,
    findCarById,
    updateCar,
    deleteCar
}