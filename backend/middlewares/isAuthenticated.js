import { User } from "../models/User";

export const isAuthenticated = (req, res, next) => {
  let token = req.cookies.x_auth;

  User.findByToken(token, (err, user) => {
    if(err){
      throw Error(err);
    }
    if(!user) {
      return res.json({ isAuth: false, error: true });
    }
    req.token = token;
    req.user = user;
    next();
  });
}
