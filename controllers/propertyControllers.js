const propertyModel = require("../models/propertyModels");

exports.createProperty = async (req, res, next) =>{
    try {
        const {name, propCode, address} = req.body;
            await propertyModel.createProperty(name, propCode, address, req.db);
            res.send("Property created");
    } catch (error) {
        next(new Error(error));
    }
};

exports.createApartment = async (req, res, next) =>{
    try {
        const {propCode} = req.params;
        const {appCode, capacity, vacancies} = req.body;
            await propertyModel.createApartment(propCode, appCode, capacity, vacancies, req.db);
            res.send("Apartment added");
    } catch (error) {
        next(new Error(error));
    }
};

exports.addResident = async (req, res, next) =>{
    try {
        const{propCode, appCode} = req.params;
        const {email} =  req.body;
        await propertyModel.addResident(propCode, appCode, email, req.db);
        res.send("Resident added");
    } catch (error) {
        next(new Error(error));
    }
};

exports.addDevice = async (req, res, next) =>{
    try {
        const {propCode, appCode} = req.params;
        const {deviceCode, description} = req.body;
        await propertyModel.addDevice(propCode, appCode, deviceCode, description, req.db);
        res.send("Device added");
    } catch (error) {
        next(new Error(error));
    }
};

exports.updateAddress = async (req, res, next) =>{
    try {
        const {propCode} = req.params;
        const {address} = req.body;
        await propertyModel.updateAddress(propCode, address, req.db);
        res.send("Address updated");
    } catch (error) {
        next(new Error(error));
    }   
};

exports.updateCapacity = async (req, res, next) =>{
    try {
        const {propCode, appCode} = req.params;
        const {capacity} = req.body;
        await propertyModel.updateCapacity(propCode, appCode, capacity, req.db);
        res.send("Capacity updated");
    } catch (error) {
        next(new Error(error));
    }
};

exports.deleteDevice = async (req, res, next) =>{
    try {
        const {propCode, appCode} = req.params;
        const {deviceCode} = req.body
        await propertyModel.deleteDevice(propCode, appCode, deviceCode, req.db);
        res.send("Device Deleted");
    } catch (error) {
        next(new Error(error));
    }
};

exports.deleteResident = async (req, res, next) =>{
    try {
        const {propCode, appCode} = req.params;
        const {email} = req.body;
        const resident = await propertyModel.findResident(propCode, appCode, email, req.db);
        if(!resident){
            return next(new Error("Resident doesn't exist!"));
        }
        await propertyModel.deleteResident(propCode, appCode, email, req.db);
        res.send("Residents deleted");
    } catch (error) {
        next(new Error(error));
    }
};

exports.deleteApartment = async (req, res, next) =>{
    try {
        const {propCode} = req.params;
        const {appCode} = req.body;
        const apt = await propertyModel.findApartment(propCode, appCode, req.db);
        if(!apt){
            return next(new Error("Apartment doesn't exist!"));
        }
        await propertyModel.deleteApartment(propCode, appCode, req.db);
        res.send("Apartment deleted");
    } catch (error) {
        next(new Error(error));
    }
};

exports.deleteProperty = async (req, res, next) =>{
    try {
        const {propCode} = req.body;
        const prop = await propertyModel.findProperty(propCode, req.db);
        if(!prop){
            return next(new Error("Property doesn't exist!"));
        }
        await propertyModel.deleteProperty(propCode, req.db);
        res.send("Property deleted")
    } catch (error) {
        next(new Error(error));
    }
};

exports.getApartmentInfo = async (req, res) =>{
    try {
        let {propCode} = req.body;
        const data = await propertyModel.getApartmentInfo(propCode, req.db);
        res.send(data);
    } catch (error) {
        next(new Error(error));
    }
};