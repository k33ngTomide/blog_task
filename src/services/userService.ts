import User, { IUser } from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const registerUser = async (username: string, email: string, password: string) => {

  const existingUser = await User.findOne({ email });
  if (existingUser) {
   throw new Error('User already exists');
  }
  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  await newUser.save();

  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET || "defaultSecret", { expiresIn: process.env.JWT_EXPIRE || "1h"});
  return { token, userId: newUser._id }
}

const loginUser = async (email: string, password: string) => {
  
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('User does not exist');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "defaultSecret", { expiresIn: process.env.JWT_EXPIRE || "1h"});

  return{ token, userId: user._id };
}

export { registerUser, loginUser };