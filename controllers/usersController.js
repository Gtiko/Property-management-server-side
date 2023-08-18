const userModel = require("../models/usersModels");
const jwt = require("jsonwebtoken");
const {PRIVATE_KEY} = require("../constants");
const bcrypt = require("bcryptjs")

exports.createUser = async (req, res) =>{
    try {
        const {name, email, password, phone, role} = req.body;
        const data = await userModel.loadUser(email, req.db);
        if(data){
            return res.send("User already registered")
        }
        const hashed = bcrypt.hashSync(password,8);
        await userModel.createUser(name, email, hashed, phone, role, req.db)
        res.send("User created");
    } catch (error) {
        res.send("Error...1");
    }
}

exports.login = async (req, res) =>{
    try {
        const {email, password} = req.body;
        const data = await userModel.loadUser(email, req.db);
        if(!data){
            return res.send("Please check your email");
        }
        if(!bcrypt.compareSync(password, data.password)){
            return res.send("Please check your password");   
        }
        const token = jwt.sign({
            email,
            role:data.role
        }, PRIVATE_KEY);

        res.send(token);

    } catch (error) {
        res.send("Error...2");
    }
};

exports.getUsers = async (req, res) =>{
    try {
        const {email} = req.body;
        const data = await userModel.loadUser(email, req.db);
        res.send(data)
    } catch (error) {
        req.send("Error...3");
    }
};

exports.updateUser = async (req, res) =>{
    try {
        const {name, email, phone, role} = req.body;
        const data = await userModel.loadUser(email, req.db);
        if(!data){
            return res.send("User doesn't exist");
        }else{
            await userModel.updateUser(name, email, phone, role, req.db);
            res.send("User role updated");
        }
    } catch (error) {
        res.send("Error...4");
    }
};

exports.deleteUser = async (req, res) =>{
    try {
        const {email} = req.body;
        const data = await userModel.loadUser(email, req.db);
        if(email == undefined || !data){
            return res.send("User doesn't exist");
        }else{
            await userModel.deleteUser(email, req.db);
        }
        res.send("User deleted")
    } catch (error) {
        res.send("Error...5");
    }
}

exports.checkIn = async (req, res) =>{
    const {email} = req.body
    res.send(email);
}