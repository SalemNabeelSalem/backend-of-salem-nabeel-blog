const mongoose = require("mongoose");

const TutorialSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
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
