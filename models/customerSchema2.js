const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define the Schema (the structure of the article)
const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String,
  specialty: String,
  anne: Number,
  matricule: Number,
}, { timestamps: true });

// Create a model based on that schema
const Etud = mongoose.model("les-Etuds", userSchema);

// export the model
module.exports = Etud;
