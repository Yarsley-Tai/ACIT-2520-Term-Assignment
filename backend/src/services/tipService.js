import { write } from "node:fs";
import { readDb, writeDb } from "../../database/database.js";
import crypto, { randomUUID } from "node:crypto";

export default {
  async findAll() {
    // TODO: get ahold of the db using readDb();
    const db = await readDb();
    // TODO: return the tips from the db
    return db.tips;
  },

  async create({ title, userId }) {
    // TODO: get ahold of the db using readDb();
    const db = await readDb();
    // TODO: create a tip object containing { id: "some-random-id", title, userId }
    const tip = { id: randomUUID(), title, userId };
    db.tips.push(tip);
    await writeDb(db);
    return tip.id;
    // TODO: push the tip object into tips list in the database
    // TODO: write changes to database with await writeDb(db)
    // TODO: return the id of the created tip
  },

  async update({ id, title, userId }) {
    // TODO: get ahold of the db using readDb();
    const db = await readDb();
    // TODO: find a tip in the db whose id & userId matches the incoming id & userId
    const foundTip = db.tips.find(
      (tip) => tip.id === id && tip.userId === userId
    );
    if (!foundTip) {
      return false;
    }
    foundTip.title = title;
    await writeDb(db);
    return true;
    // TODO: if there is no matching tip, return false.
    // TODO: otherwise, set the found tip's title to the incoming title
    // TODO: write changes to database with await writeDb(db)
    // TODO: return true
  },

  async remove({ id, userId }) {
    // TODO: get ahold of the db using readDb();
    const db = await readDb();
    // TODO: find the INDEX of the tip in the db whose id & userId match the incoming id & userId
    const index = db.tips.findIndex(
      (tip) => tip.id === id && tip.userId === userId
    );

    // TODO: if there is no index (-1), return false.
    if (index === -1) {
      return false;
    }
    // TODO: otherwise, use splice to delete from db.tips the tip based on the index
    db.tips.splice(index, 1);
    // TODO: write changes to database with await writeDb(db)
    await writeDb(db);
    // TODO: return true
    return true;
  },
};
