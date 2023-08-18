const { USER_COLLECTION } = require("../COLLECTION_NAME");

class User {
  static async loadUser(email, db) {
    try {
      if (email) {
        return await db.collection(USER_COLLECTION).findOne({ email });
      } else {
        return await db.collection(USER_COLLECTION).find({}).toArray();
      }
    } catch (error) {
      return null;
    }
  }

  static async createUser(name, email, password, phone, role, db) {
    try {
      await db
        .collection(USER_COLLECTION)
        .insertOne({ name, email, password, phone, role });
    } catch (error) {
      return null;
    }
  }

  static async updateUser(name, email, phone, role, db) {
    try {
      await db
        .collection(USER_COLLECTION)
        .updateOne(
          { email },
          { $set: { name: name, phone: phone, role: role } }
        );
    } catch (error) {
      return null;
    }
  }

  static async deleteUser(email, db) {
    try {
      await db.collection(USER_COLLECTION).deleteOne({ email });
    } catch (error) {
      console.log("error");
      return null;
    }
  }
}

module.exports = User;
