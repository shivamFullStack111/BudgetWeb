const Users = require("../../schemas/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../utils");

const userResolver = {
  Query: {
    getUser: async (_, { email }) => {
      const user = await Users.findOne({ email });
      if (!user) {
        throw new Error(`User ${email} not found`);
      }
      return user;
    },
    getAllUsers: async () => {
      const allUsers = await Users.find();

      return allUsers;
    },
    loginUser: async (_, { email, password }) => {
      const user = await Users.findOne({ email });

      if (!user) {
        throw new Error("user or password is invalid");
      }

      const isMatch = await bcrypt.compare(password, user?.password);

      if (isMatch) {
        const token = jwt.sign({ user }, JWT_SECRET, {
          expiresIn: "7d",
        });
        user.token = token;
        return user;
      } else {
        throw new Error("invalid email or password");
      }
    },
    cheackAuthentication: async (_, __, args) => {
      const { user } = jwt.verify(args?.token, JWT_SECRET);

      const userr = await Users.findOne({ email: user?.email });
      if (!userr) {
        throw new Error("invalid token");
      }
      return userr;
    },
  },
  Mutation: {
    createUser: async (_, { name, email, password }) => {
      const existingUser = await Users.findOne({ email: email.trim() });
      if (existingUser) {
        throw new Error(`User ${email} already exists`);
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new Users({
        name,
        email: email.trim(),
        password: hashedPassword,
      });

      await user.save();

      return user; // Return the newly created user
    },
  },
};

module.exports = {
  userResolver,
};
