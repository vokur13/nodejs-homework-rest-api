const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const bcrypt = require('bcrypt');
const saltRounds = 10;

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    contacts: [{ type: Schema.Types.ObjectId, ref: 'contact' }],
  },
  { timestamps: true }
);

UserSchema.pre('save', async function (next) {
  const user = this;
  const hash = await bcrypt.hash(this.password, saltRounds);

  this.password = hash;
  next();
});

UserSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);

  return compare;
};

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;
