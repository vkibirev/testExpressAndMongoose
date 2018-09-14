const User = require('../models/userModel');
const Car = require('../models/carModel');


module.exports = {

    index: async (req, res, next) => {
        try {
            const users = await User.find({});  
            res.status(200).json(users);
        } catch(err) {
            next(err);
        }
    },

    newUser: async (req, res, next) => {
        try {
            const newUser = new User(req.body);
            const user = await newUser.save();
            res.status(201).json(user);
        } catch(err) {
            next(err);
        } 
    },

    getUser: async (req, res, next) => {    
        try {
            const userId = req.params.userId;                        
            const user = await User.findById(userId);
            res.status(200).json(user);
        } catch(err) {
            next(err);
        }
    },

    replaceUser: async (req, res, next) => {
        //that req.body must contains all the fields
        try {
            const userId = req.params.userId;
            const newUser = req.body;
            const result = await User.findByIdAndUpdate(userId, newUser);
            res.status(200).json({success: true});            
        } catch(err) {
            next(err);
        }
    }, 

    updateUser: async (req, res, next) => {
        // req.body may contain any number of fields
        try {
            const userId = req.params.userId;
            const newUser = req.body;
            const result = await User.findByIdAndUpdate(userId, newUser);
            res.status(200).json({success: true});            
        } catch(err) {
            next(err);
        }
    },
    
    getUserCars: async (req, res, next) => {
        try {
            const userId = req.params.userId;
            const user = await User.findById(userId).populate('cars');

            console.log('user' , user);
            res.status(200).json(user.cars);
        } catch(err) {
            next(err);
        }
    },

    newUserCar: async(req, res, next) => {
        try {
            const userId = req.params.userId;
            // Create new car
            const newCar = new Car(req.body);
            // Get user
            const user = await User.findById(userId);
            // Assign user as a car seller
            newCar.seller = user;
            // Save the car 
            await newCar.save();
            // Add car id to the user's selling array 'cars'
            user.cars.push(newCar._id);
            // Save the user 
            await user.save();
            res.status(201).json(newCar);
    
        } catch(err) {
            next(err);
        }
    }

};