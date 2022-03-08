const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model("Product", productSchema);


// const mongoDb = require("mongodb");
// const getDb = require("../util/database").getDb;

// class Product {
//   constructor(title, price, imageUrl, description, id, userId) {
//     this.title = title;
//     this.price = price;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     console.log("recieved id", id);
//     this._id = id ? new mongoDb.ObjectId(id) : null;
//     this.userId = userId;
//   }

//   save() {
//     const db = getDb();
//     let dbOperation;

//     if (this._id) {
//       console.log("id is ", this._id);
//       dbOperation = db
//         .collection("products")
//         // $set is special property name for a mongodb operation, which mongodb understands
//         // we can  pass this to $set
//         .updateOne({ _id: this._id }, { $set: this });
//     } else {
//       dbOperation = db.collection("products").insertOne(this);
//     }

//     return dbOperation
//       .then((result) => {
//         console.log(result);
//       })
//       .catch((err) => console.log(err));
//   }

//   static fetchAll() {
//     const db = getDb();
//     // collection().find() returns a 'cursor' object, not a promise
//     // you can convert it into array or use cursor methods
//     return db
//       .collection("products")
//       .find()
//       .toArray()
//       .then((products) => {
//         return products;
//       })
//       .catch((err) => console.log(err));
//   }

//   static fetchById(prodId) {
//     const db = getDb();
//     // collection().find() returns a 'cursor' object, not a promise
//     // you can use next method to get the next value
//     // since it will return only one el in array, that will be the next value
//     // alternatively, findOne just returns the first el, so no need to user next() with it
//     return db
//       .collection("products")
//       .find({ _id: new mongoDb.ObjectId(prodId) })
//       .next()
//       .then((product) => {
//         return product;
//       })
//       .catch((err) => console.log(err));
//   }

//   static deleteById(prodId) {
//     const db = getDb();
//     return db
//       .collection("products")
//       .deleteOne({ _id: new mongoDb.ObjectId(prodId) })
//       .then((result) => {
//         return result;
//       })
//       .catch((err) => console.log(err));
//   }
// }

// module.exports = Product;
