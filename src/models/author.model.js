const mongoose = require("mongoose");

const AuthorSchema = mongoose.Schema(
  {
    name: {
      type: String,
      lowercase: true,
      trim: true, // remove leading and leading spaces
      minLength: [3, "name must be at least 3 characters long"],
      maxLength: [50, "name must be less than 50 characters long"],
      required: true,
    },

    email: {
      type: String,
      lowercase: true,
      trim: true, // remove leading and leading spaces
      match: [
        // validate email format
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

AuthorSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject(); // remove unwanted properties

  object.id = _id; // add id property

  return object;
});

/** AuthorModel on MonogoDB will be authors with the plural form of AuthorSchema */
const AuthorModel = mongoose.model("author", AuthorSchema);

module.exports = AuthorModel;
