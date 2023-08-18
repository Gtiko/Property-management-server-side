const propertyController = require("../controllers/propertyControllers");
const auth = require("../middleware/auth");
const express = require("express");
const router =  express.Router();

// for user only
router.put( "/Check-in/:propCode/apartment/:appCode/residents", 
            auth.validateUser, auth.validateVacancies, auth.validateResident, propertyController.addResident );
// delete {residents}
router.delete( "/Check-out/:propCode/apartment/:appCode", auth.validateUser, propertyController.deleteResident );
//get {apartment Info...}
router.get( "/getApartmentInfo", auth.validateUser, propertyController.getApartmentInfo );

// for Admin 

  router.use(auth.validateAdmin);
// post {property}
router.post( "/createProperty", auth.validateProperty, propertyController.createProperty );
// put {apartment}
router.put( "/addApartment/:propCode",auth.validateApartment, propertyController.createApartment );
// put {device}
router.put( "/addDevice/:propCode/apartment/:appCode", auth.validateDevice, propertyController.addDevice );
// update {address}
router.patch( "/updateAddress/:propCode", propertyController.updateAddress );
//update {capacity}
router.patch( "/updateCapacity/:propCode/apartment/:appCode", propertyController.updateCapacity );
// delete {device}
router.delete( "/deleteDevice/:propCode/apartment/:appCode/devices", propertyController.deleteDevice );
//delete {apartment}
router.delete( "/deleteApartment/:propCode/apartment", propertyController.deleteApartment );
//delete {property}
router.delete( "/deleteProperty", propertyController.deleteProperty );


module.exports = router;