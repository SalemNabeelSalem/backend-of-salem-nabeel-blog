const mongoose = require("mongoose");

const TutorialSchema = mongoose.Schema(
  {
    title: {
      type: String,
      lowercase: true,
      trim: true, // remove leading and leading spaces
      minLength: [3, "title must be at least 3 characters long"],
      maxLength: [50, "title must be less than 50 characters long"],
      required: true,
    },

    description: {
      type: String,
      lowercase: true,
      trim: true, // remove leading and leading spaces
      required: true,
    },

    section: {
      type: String,
      enum: ["backend", "frontend", "mobile", "fullstack"],
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

TutorialSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();

  object.id = _id;

  return object;
});

/** TutorialModel on MonogoDB will be tutorials with the plural form of TutorialSchema */
const TutorialModel = mongoose.model("tutorial", TutorialSchema);

module.exports = TutorialModel;
