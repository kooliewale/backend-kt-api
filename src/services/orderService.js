// In src/services/orderService.js
const { v4: uuid } = require("uuid");
const Order = require("../database/Order");

const getAllOrders = (page=1,limit=10) => {
  try {
    const allOrders = Order.getAllOrders(page,limit);
    return allOrders;
  } catch (error) {
    throw error;
  }
};




const getOneOrder = (OrderId) => {
  try {
    const order = Order.getOneOrder(OrderId);
    return order;
   
  } catch (error) {
    throw error;
  
  }
};

const createNewOrder = (newOrder) => {
  const OrderToInsert = {
    ...newOrder,
    id: uuid(),
    createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
  };
  try {
    const createdOrder = Order.createNewOrder(OrderToInsert);
    return createdOrder;
  } catch (error) {
    throw error;
  }
};

const updateOneOrder = (OrderId, changes) => {
  try {
    const updatedOrder = Order.updateOneOrder(OrderId, changes);
    return updatedOrder;
  } catch (error) {
    throw error;
  }
};

const deleteOneOrder = (OrderId) => {
  try {
    Order.deleteOneOrder(OrderId);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllOrders,
  getOneOrder,
  createNewOrder,
  updateOneOrder,
  deleteOneOrder,
};
