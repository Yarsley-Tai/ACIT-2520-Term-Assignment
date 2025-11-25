import jwt from "jsonwebtoken";
import crypto, { randomUUID } from "node:crypto";
import { readDb, writeDb } from "../../database/database.js";
import { findPackageJSON } from "node:module";
import { profileEnd } from "node:console";

const JWT_SECRET = "secret";

export default {
  async register({ username, password, profilePicture }) {
    // TODO: get ahold of the db using readDb();
    const db = await readDb();
    // TODO: check if there is an existing user with the same username
    const foundUser = db.users.find(
      (user) => user.username === username && user.password === password
    );
    // TODO: if there is, do the following:
    //       - construct a new Error("Username already taken");
    //       - set the statusCode of that error object to 400
    //       - throw the err
    if (!foundUser) {
      user = { id: randomUUID(), username, password, profilePicture };
      db.users.push(user);
      await writeDb(db);
    } else {
      const error = new Error("Username already taken");
      error.statuscode = 400;
      throw error;
    }
    // TODO: otherwise, create a user object. A user has:
    //       - id: a random string-based id (crypto.randomUUID())
    //       - username: a username
    //       - password: a password
    //       - profilePicture: their profile pic string or an empty string if no picture.
    // TODO:  push this user object into db.users
    // TODO:  call the writeDb(db) operation to save changes.
    // TODO:  return the user object but without their password  (only id, username, profilePicture)

    return {
      returnUser: {
        id: user.id,
        username: username,
        profilePicture: profilePicture,
      },
    };
  },

  async login({ username, password }) {
    // TODO: get ahold of the db using readDb();
    const db = await readDb();
    // TODO: check the database for a user with a matching username and password
    const foundUser = db.users.find(
      (user) => user.username === username && user.password === password
    );
    if (!foundUser) {
      const error = new Error("Invalid Username or password");
      error.statuscode = 401;
      throw error;
    }
    const token = jwt.sign(
      { userId: foundUser.id, username: foundUser.username },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    // TODO: if there is no user:
    //       - construct a new Error("Invalid username or password");
    //       - set the statusCode of that error object to 401
    //       - throw the err
    // TODO: otherwise, create a login token. I'll help you out with this one:
    // const token = jwt.sign({ userId: user.id, username: user.username }, JWT_SECRET, { expiresIn: "1h" })
    // TODO:  return an object that contains 2 things:
    //  - token
    //  - user : { id: user.id, username: user.username, profilePicture: user.profilePicture }

    return {
      token,
      user: {
        id: foundUser.id,
        username: foundUser.username,
        profilePicture: foundUser.profilePicture,
      },
    };
  },
};
