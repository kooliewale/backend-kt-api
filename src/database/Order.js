// In src/database/Order.js
const DB = require("./db.json");
const { saveToDatabase } = require("./utils");
const getAllOrders = (page = 1, limit = 20) => {
  console.log(`page -> ${page}, limit -> ${limit}`);

  try {
    const startIndex = Math.max(0, (page - 1) * limit); 
    const endIndex = Math.min(DB.order.length - 1, page * limit - 1); 

    console.log(` START ---> ${startIndex} , end ----> ${endIndex}`);

    const newData = DB.order.slice(startIndex, endIndex + 1); 
    return newData;
  } catch (error) {
    throw { status: 500, message: `Error retrieving orders: ${error}` }; 
  }
};


const getOneOrder =  (OrderId) => {
  console.log('Entered in db| order');

  try {
    // Find the order by booking_id
    const Order = DB.order.find((order) => order.booking_id === OrderId);

    // Handle case where no order is found
    if (!Order) {
      throw {
        status: 400,
        message: `Can't find Order with the id '${OrderId}'`,
      };
    }

    return Order;
  } catch (error) {
    console.error('Error fetching order:', error);
    throw {
      status: error?.status || 500,
      message: error?.message || 'Internal Server Error',
    };
  }
};



const createNewOrder = (newOrder) => {
  try {
    const isAlreadyAdded =
      DB.Orders.findIndex((Order) => Order.name === newOrder.name) > -1;
    if (isAlreadyAdded) {
      throw {
        status: 400,
        message: `Order with the name '${newOrder.name}' already exists`,
      };
    }
    DB.Orders.push(newOrder);
    saveToDatabase(DB);
    return newOrder;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const updateOneOrder = (OrderId, changes) => {
  try {
    const isAlreadyAdded =
      DB.Orders.findIndex((Order) => Order.name === changes.name) > -1;
    if (isAlreadyAdded) {
      throw {
        status: 400,
        message: `Order with the name '${changes.name}' already exists`,
      };
    }
    const indexForUpdate = DB.Orders.findIndex(
      (Order) => Order.id === OrderId
    );
    if (indexForUpdate === -1) {
      throw {
        status: 400,
        message: `Can't find Order with the id '${OrderId}'`,
      };
    }
    const updatedOrder = {
      ...DB.Orders[indexForUpdate],
      ...changes,
      updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    };
    DB.Orders[indexForUpdate] = updatedOrder;
    saveToDatabase(DB);
    return updatedOrder;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const deleteOneOrder = (OrderId) => {
  try {
    const indexForDeletion = DB.Orders.findIndex(
      (Order) => Order.id === OrderId
    );
    if (indexForDeletion === -1) {
      throw {
        status: 400,
        message: `Can't find Order with the id '${OrderId}'`,
      };
    }
    DB.Orders.splice(indexForDeletion, 1);
    saveToDatabase(DB);
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

module.exports = {
  getAllOrders,
  createNewOrder,
  getOneOrder,
  updateOneOrder,
  deleteOneOrder,
};
