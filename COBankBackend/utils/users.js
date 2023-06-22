import crypto from 'crypto';
import { ObjectId } from 'mongodb';
import dbClient from './db';
import redisClient from './redis';

class User {
  constructor() {
    this.dbs = dbClient.mongoClient.db(dbClient.database);
    this.users = this.dbs.collection('users');
  }

  /**
   *
   * @param {*} userID
   * @param {*} upassword
   * @returns
   */
  async findUserByUserID(userID, upassword) {
    try {
      if (arguments.length === 1) {
        const query = { userID };
        const user = await this.users.findOne(query);
        return user;
      } if (arguments.length === 2) {
        console.log('userid:', userID, upassword);
        const query = { userID: ObjectId(userID), password: upassword };
        console.log(query);
        const user = await this.users.findOne(query);
        const users = await this.users.find();
        console.log('user:' ,user);
        console.log('user:' ,await users.toArray());
        return user;
      }
      throw new Error('Invalid number of arguments');
    } catch (error) {
      console.log(`Error Email Found: ${error}`);
      return false;
    }
  }

  /**
   *
   * @param {*} uemail
   * @param {*} upassword
   * @returns
   */
  async createUser(userID, upassword) {
    try {
      const hashedPassword = crypto.createHash('sha1').update(upassword).digest('hex');
      const query = { userID: ObjectId(userID), password: hashedPassword, userType: 'client' };
      const user = await this.users.insertOne(query);
      return user.insertedId;
    } catch (error) {
      console.log(`Error Creation: ${error}`);
      return false;
    }
  }

  /**
   *
   * @param {string} uemail
   * @param {string} upassword
   */
  async findById(id) {
    try {
      const objectId = new ObjectId(id);
      const query = { _id: objectId };
      const user = await this.users.findOne(query);
      return user;
    } catch (error) {
      console.log(`Error find: ${error}`);
      return false;
    }
  }

  /**
   * Find By Token
   * @param {string} token
   * @returns
   */
  async findByToken(token) {
    const userId = await redisClient.get(`auth_${token}`);
    const user = await this.findById(userId);
    return user;
  }
}

export default User;
