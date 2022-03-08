const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true },
      },
    ],
  },
});

module.exports = mongoose.model("User", userSchema);

// const mongoDb = require("mongodb");

// const getDb = require("../util/database").getDb;

// class User {
//   constructor(username, email, cart, id) {
//     this.name = username;
//     this.email = email;
//     this.cart = cart;
//     this._id = new mongoDb.ObjectId(id);
//   }

//   save() {
//     const db = getDb();
//     return db.collection("users").insertOne(this);
//   }

//   addToCart(product) {
//     let cartProductIndex;
//     let updatedCartItems = [];

//     if (this.cart) {
//       cartProductIndex = this.cart.items.findIndex((item) => {
//         console.log(typeof item.productId, typeof product._id);
//         return item.productId.toString() == product._id.toString();
//       });
//       updatedCartItems = [...this.cart.items];
//     } else {
//       cartProductIndex = -1;
//     }

//     let newQuantity = 1;

//     if (cartProductIndex !== -1) {
//       newQuantity = newQuantity + this.cart.items[cartProductIndex].quantity;
//       updatedCartItems[cartProductIndex].quantity = newQuantity;
//     } else {
//       updatedCartItems.push({
//         productId: new mongoDb.ObjectId(product._id),
//         quantity: newQuantity,
//       });
//     }

//     const updatedCart = { items: updatedCartItems };

//     const db = getDb();
//     return db
//       .collection("users")
//       .updateOne({ _id: this._id }, { $set: { cart: updatedCart } });
//   }

//   getCart() {
//     const db = getDb();
//     const productIds = this.cart.items.map((item) => item.productId);
//     // $in is a special mongodb operator which takes in an array,
//     // arrays of ids in this case
//     //  and returns all the matching results
//     return db
//       .collection("products")
//       .find({ _id: { $in: productIds } })
//       .toArray()
//       .then((products) => {
//         return products.map((p) => {
//           return {
//             ...p,
//             quantity: this.cart.items.find((i) => {
//               return i.productId.toString() === p._id.toString();
//             }).quantity,
//           };
//         });
//       })
//       .catch((err) => console.log(err));
//   }

//   deleteItemFromCart(productId) {
//     const updatedCartItems = this.cart.items.filter(
//       (e) => e.productId.toString() !== productId.toString()
//     );
//     const db = getDb();
//     const updatedCart = { items: updatedCartItems };
//     return db
//       .collection("users")
//       .updateOne({ _id: this._id }, { $set: { cart: updatedCart } });
//   }

//   addOrder() {
//     const db = getDb();
//     return this.getCart()
//       .then((products) => {
//         const order = {
//           items: products,
//           user: {
//             _id: new mongoDb.ObjectId(this._id),
//             name: this.name,
//           },
//         };
//         return db.collection("orders").insertOne(order);
//       })
//       .then((result) => {
//         this.cart = { items: [] };
//         return db
//           .collection("users")
//           .updateOne({ _id: this._id }, { $set: { cart: { items: [] } } });
//       })
//       .catch();
//   }

//   getOrders(){
//     const db = getDb();
//     return db.collection('orders').find({"user._id":new mongoDb.ObjectId(this._id)}).toArray();
//   }

//   static findById(userId) {
//     const db = getDb();
//     console.log(db.collection("users"));
//     return db
//       .collection("users")
//       .findOne({ _id: new mongoDb.ObjectId(userId) })
//       .then((user) => {
//         console.log("user", user);
//         return user;
//       })
//       .catch((err) => console.Console.log(err));
//   }
// }

// module.exports = User;
