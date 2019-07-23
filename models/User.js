import mongoose, { Mongoose } from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new Mongoose.Schema({
  name: String,
  email: String,
  avatarUrl: String,
  facebookId: Number,
  gitbubId: Number
});

UserSchema.plugin(passportLocalMongoose, { usernameField: "email" });

const model = mongoose.Model("User", UserSchema);

export default model;
