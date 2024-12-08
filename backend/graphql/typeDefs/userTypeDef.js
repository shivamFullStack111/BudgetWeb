const userTypeDef = `
type User {
  _id:ID
  name:String!
  email:String!
  password:String!
  token:String
}

type Query {
  getUser(email:String!):User
  updateUser(name:String,email:String!):User
  getAllUsers:[User]
  loginUser(email:String,password:String):User
  cheackAuthentication:User
}

type Mutation {
   createUser(name:String!,password:String!,email:String!):User
}
`;




module.exports = userTypeDef;


