const propertyModel = require("../models/propertyModels");
const jwt = require("jsonwebtoken");
const {PRIVATE_KEY} = require("../constants");

exports.validateProperty = async (req, res, next) =>{
    const {propCode} = req.body;
    const data = await propertyModel.findProperty(propCode, req.db);
    if(data){
       return next(new Error("Property already registered!"));
    }
    next();
};

exports.validateApartment = async (req, res, next) =>{
    const {propCode} = req.params;
    const {appCode} = req.body;
    const apt = await propertyModel.findApartment(propCode, appCode, req.db);
    if(apt){
        return next(new Error("Apartment already registered!"));
    }
    next();
};

exports.validateResident = async (req, res, next) =>{
    const {propCode, appCode} = req.params;
    const {email} = req.body;
    const prop = await propertyModel.findProperty(propCode, req.db);
    const apt = await propertyModel.findApartment(propCode, appCode, req.db);
    const resident = await propertyModel.findResident(propCode, appCode, email, req.db);

    if(!prop){
        return next(new Error("Property doesn't exist!"));
    }
    if(!apt){
        return next(new Error("Apartment doesn't exist!"));
    }
    if(resident){
        return next(new Error("Resident already registered!"));
    }    
    next();
};

exports.validateDevice = async (req, res, next) =>{
    const {propCode, appCode} = req.params;
    const {deviceCode} = req.body;
    const prop = await propertyModel.findProperty(propCode, req.db);
    const apt = await propertyModel.findApartment(propCode, appCode, req.db);
    const device = await propertyModel.findDevice(propCode, appCode, deviceCode, req.db);
    if(!prop){
        return next(new Error("Property doesn't exist!"));
    }
    if(!apt){
        return next(new Error("Apartment doesn't exist!"));
    }
    if(device){
        return next(new Error("Device already registered!"));
    }
    next();
};

exports.validateAdmin = async (req, res, next) =>{
    try {
        if(!req.headers.authorization){
            return next(new Error("Invalid token"))
        }
        const arr = req.headers.authorization.split(" ");
        if(arr.length != 2){
            return next(new Error("Please use bearer schema"));
        }
        const token = arr[1];
        const payload = jwt.verify(token, PRIVATE_KEY);
    
        if(payload.role == "admin"){
            next();
        }else{
            res.send("You are not allowed only for admins")
        }  
    } catch (error) {
        res.send("Invalid token");
    }
};

exports.validateUser = async (req, res, next) =>{
    try {
        if(!req.headers.authorization){
            return next(new Error("Invalid token"))
        }
        const arr = req.headers.authorization.split(" ");
        if(arr.length != 2){
            return next(new Error("Please use bearer schema"));
        }
        const token = arr[1];
        const payload = jwt.verify(token, PRIVATE_KEY);
    
        if(payload.role == "user"){
            next();
        }else{
            res.send("You are not allowed only for users");
        }  
    } catch (error) {
        res.send("Invalid token");
    }
};

exports.validateVacancies = async (req, res, next) =>{
    try {
        const {propCode, appCode} = req.params;
        const data = await propertyModel.findVacancies(propCode, appCode, req.db);
        if(data){
            return next(new Error("This apartment is fully Occupied"));
        }else{
            next();
        }
    } catch (error) {
        res.send(error);
    }
}