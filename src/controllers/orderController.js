// In src/controllers/orderController.js
const orderService = require("../services/orderService");


const getAllOrders = (req, res) => {
  try {
    // Extract page and limit from request (assuming query parameters)
    console.log(req.query);
    const { page = 1, limit = 10 } = req.query;
    console.log(page,limit)
    // Validate page and limit (optional)
    if (page < 1 || limit < 1) {
      return res
        .status(400)
        .send({ status: "FAILED", data: { error: "Invalid page or limit" } });
    }

    const allOrders = orderService.getAllOrders(page, limit);
    res.send({ status: "OK", data: allOrders });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getOneOrder = (req, res) => {
  const {
    params: { OrderId },
  } = req;

  if (!OrderId) {
    res
      .status(400)
      .send({
        status: "FAILED",
        data: { error: "Parameter ':OrderId' can not be empty" },
      });
  }
  try {
    const Order = orderService.getOneOrder(OrderId);
    res.send({ status: "OK", data: Order });
  } catch (error) {

    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const createNewOrder = (req, res) => {
  const { body } = req;
  if (
    !body.booking_id ||
    !body.user_id 
  ) {
    res
      .status(400)
      .send({
        status: "FAILED",
        data: {
          error:
            "One of the following keys is missing or is empty in request body: 'bookingid', 'userid'",
        },
      });
    return;
  }
  const newOrder = {
    order: body.booking_id,
    user_id: body.user_id,
  };
  try {
    const createdOrder = orderService.createNewOrder(newOrder);
    res.status(201).send({ status: "OK", data: createdOrder });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const updateOneOrder = (req, res) => {
  const {
    body,
    params: { OrderId },
  } = req;
  if (!OrderId) {
    res
      .status(400)
      .send({
        status: "FAILED",
        data: { error: "Parameter ':OrderId' can not be empty" },
      });
  }
  try {
    const updatedOrder = orderService.updateOneOrder(OrderId, body);
    res.send({ status: "OK", data: updatedOrder });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const deleteOneOrder = (req, res) => {
  const {
    params: { OrderId },
  } = req;
  if (!OrderId) {
    res
      .status(400)
      .send({
        status: "FAILED",
        data: { error: "Parameter ':OrderId' can not be empty" },
      });
  }
  try {
    orderService.deleteOneOrder(OrderId);
    res.status(204).send({ status: "OK" });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  getAllOrders,
  getOneOrder,
  createNewOrder,
  updateOneOrder,
  deleteOneOrder,
};
