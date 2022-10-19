const userModel = require("../models/user.model");
const Session = require("../models/session.model");


const registerUser = async (req, reply) => {
  try {
    let user = await userModel.findOne({
      where: { username: req.payload.username, password: req.payload.password },
    });
    if (user) return reply({ message: "User already registered" });
    user = await userModel.create(req.payload);
    reply({
      message: "User registered successfully",
      data: user,
    });
  } catch (error) {
    return reply({ message: error.message });
  }
};

const loginUser = async (req, reply) => {
  try {
    let user = await userModel.findOne({
      where: { username: req.payload.username, password: req.payload.password },
    });
    // if (user) await Session.create({userId: user.id, status: "active"});
    if (!user) {
      return reply({ message: "Username or Password is Invalid" });
    } else {
      await user.update({isLoggedIn: !user.isLoggedIn}, {where: {id: req.userId}});
      let session = await Session.create({ status: "active" });
      user.addSession(session);
      req.cookieAuth.set({ sId: session.id, userId: user.id });
      reply({ message: "Login Successfull", data : user });
    }
  } catch (error) {
    return reply({ message: error.message });
  }
};

const isAuth = (req, reply) => {
  try {
    if (req.auth.isAuthenticated) {
      return reply({ message: "Authenticated" });
    }
  } catch (error) {
    return reply({ message: error.message });
  }
};

const logoutUser = async (req, reply) => {
  try {
    let user = await userModel.findOne({where: {id: req.userId}});
    console.log("IDDD", req.userId);
    req.cookieAuth.clear();
    await user.update({isLoggedIn: !user.isLoggedIn}, {where: {id: req.userId}});
    return reply({ message: "Logout Successfull" });
  } catch (error) {
    return reply({ message: error.message });
  }
};

// const deleteAccount = async (req, reply) => {
//   try {
//     const users = await userModel.findAll();
//     users.forEach((user,i) => {
//       deleteAccountQueue.add({user}).then(() =>{
//         if(i+1 === users.length) {
//           reply({ message: "All users added" });
//         }
//       })
//     })
//   } catch (error) {
//     return reply({ message: error.message });
//   }
// };


module.exports = { registerUser, loginUser, isAuth, logoutUser };
