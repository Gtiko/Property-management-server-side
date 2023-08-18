const {COLLECTION_NAME} = require("../COLLECTION_NAME");

class Property{

    static async findProperty(propCode, db){
        try {
            return await db.collection(COLLECTION_NAME).findOne({propCode});
        } catch (error) {
            return null;
        }
    }

    static async findApartment(propCode, appCode, db){
        try {
            return await db.collection(COLLECTION_NAME).findOne({propCode, "apartment.appCode":appCode});
        } catch (error) {
            console.log("error");
            return null;
        }
    }

    static async findResident(propCode, appCode, email, db){
        try {
            return await db.collection(COLLECTION_NAME).findOne(
                {propCode, "apartment.appCode":appCode, "apartment.residents":email}
                );
        } catch (error) {
            return null;
        }
    }

    static async findDevice(propCode, appCode, deviceCode, db){
        try {
            return await db.collection(COLLECTION_NAME).findOne(
                {propCode, "apartment.appCode": appCode, "apartment.devices.deviceCode":deviceCode}
                );
        } catch (error) {
            return null;
        }
    }

    static async findVacancies(propCode, appCode, db){
        try {
            return await db.collection(COLLECTION_NAME).findOne(
                {propCode, "apartment.appCode": appCode, "apartment.vacancies":{$eq:0}}
                );
        } catch (error) {
            return null;
        }
    }

    static async createProperty(name, propCode, address, db){
        try {
            await db.collection(COLLECTION_NAME).insertOne({name, propCode, address});
            return "SUCCESS";
        } catch (error) {
            return null;
        }
    }

    static async createApartment(propCode, appCode, capacity, vacancies, db){
        try {
            await db.collection(COLLECTION_NAME).updateOne(
                {propCode},
                {$push :{apartment: {appCode:appCode, capacity:capacity, vacancies:vacancies}}}
            );
        } catch (error) {
            return null;
        }
    }

    static async addResident(propCode, appCode, email, db){
        try {
            await db.collection(COLLECTION_NAME).updateOne(
                {propCode},
                {$push: {"apartment.$[a].residents":email}, $inc: {"apartment.$[a].vacancies":-1}},
                {arrayFilters: [{"a.appCode":appCode}]}
            );
        } catch (error) {
            return null;
        }
    }

    static async addDevice(propCode, appCode, deviceCode, description, db){
        try {
            await db.collection(COLLECTION_NAME).updateOne(
                {propCode},
                {$push: {"apartment.$[a].devices":{deviceCode,description}}},
                {arrayFilters: [{"a.appCode":appCode}]}
            );
        } catch (error) {
            return null;
        }
    }

    static async updateAddress(propCode, address, db){
        try {
            await db.collection(COLLECTION_NAME).updateOne(
                {propCode},
                {$set: {address:address}},
            );
        } catch (error) {
            return null;
        }
    }

    static async updateCapacity(propCode, appCode, capacity, db){
        try {
            await db.collection(COLLECTION_NAME).updateOne(
                {propCode},
                {$set :{"apartment.$[a].capacity": capacity}},
                {arrayFilters: [{"a.appCode":appCode}]}
            );
        } catch (error) {
            return null;
        }
    }

    static async deleteProperty(propCode, db){
        try {
            await db.collection(COLLECTION_NAME).deleteOne({propCode});
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    static async deleteApartment(propCode, appCode, db){
        try {
            await db.collection(COLLECTION_NAME).updateOne(
                {propCode},
                {$pull : {apartment:{appCode:appCode}}}
            );
        } catch (error) {
            return null;
        }
    }

    static async deleteDevice(propCode, appCode, deviceCode, db){
        try {
            await db.collection(COLLECTION_NAME).updateOne(
                {propCode},
                {$pull :{"apartment.$[a].devices":{deviceCode:deviceCode}}},
                {arrayFilters: [{"a.appCode":appCode}]}
            );
        } catch (error) {
            return null;
        }
    }

    static async deleteResident(propCode, appCode, email, db){
        try {
            await db.collection(COLLECTION_NAME).updateOne(
                {propCode},
                {$pull :{"apartment.$[a].residents":email}, $inc :{"apartment.$[a].vacancies":1}},
                {arrayFilters: [{"a.appCode":appCode}]}
            );
        } catch (error) {
            return null
        }
    }

    static async getApartmentInfo(propCode, db){
        try {
            if(propCode){
                return await db.collection(COLLECTION_NAME).find(
                    {propCode}).project({"apartment.residents" :0, _id:0}).toArray();
            }else{
                return await db.collection(COLLECTION_NAME).find({}).
                project({"apartment.residents" :0, _id:0}).toArray();
            }
        } catch (error) {
            return null;
        }
    }
}

module.exports = Property