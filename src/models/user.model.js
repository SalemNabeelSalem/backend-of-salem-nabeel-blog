const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    full_name: {
      type: String,
      lowercase: true,
      trim: true, // remove leading and leading spaces
      minLength: [5, "full_name must be at least 5 characters long"],
      maxLength: [25, "full_name must be less than 25 characters long"],
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
      unique: true,
    },

    password: {
      type: String,
      trim: true, // remove leading and leading spaces
      minLength: [5, "password must be at least 5 characters long"],
      maxLength: [1024, "password must be less than 1024 characters long"],
      required: true,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

UserSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject(); // remove unwanted properties

  object.id = _id; // add id property

  return object;
});

/** UserModel on MonogoDB will be users with the plural form of UserSchema */
const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
