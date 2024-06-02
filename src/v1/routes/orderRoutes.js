// In src/v1/routes/orderRoutes.js
const express = require("express");
const orderController = require("../../controllers/orderController");

const router = express.Router();

// router.get("/", orderController.getAllOrders);

// Route for getting all orders with optional pagination parameters
router.get("/", (req, res) => {
  orderController.getAllOrders(req, res); // Pass request and response objects
});

router.get("/:OrderId", orderController.getOneOrder);

router.post("/", orderController.createNewOrder);

router.patch("/:OrderId", orderController.updateOneOrder);

router.delete("/:OrderId", orderController.deleteOneOrder);

module.exports = router;

