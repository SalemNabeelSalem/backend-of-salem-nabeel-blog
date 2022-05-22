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
    timestamps: true,
  }
);

TutorialSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();

  object.id = _id;

  return object;
});

const TutorialModel = mongoose.model("tutorial", TutorialSchema);

module.exports = TutorialModel;
