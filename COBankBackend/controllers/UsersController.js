import Bull from 'bull';
import { v4 as uuidv4 } from 'uuid';
import User from '../utils/users';
import BasicAuthBank from '../utils/basicAuthBank';
import Files from '../utils/files';
import redisClient from '../utils/redis';

const userQueue = new Bull('userQueue');

/* The AppController for retrieving the status and statistics of a
dbs and Redis client. */
class UsersController {
  /**
     * The function retrieves the post of users
     * sends the result as a response.
     * @param request - The request parameter is an object that contains
     * @param response - The `response` parameter is an object
 */
  static async postNew(request, response) {
    console.log('postNew', request.body);
    const { email, password } = request.body;
    if (!email) {
      return response.status(400).send({ error: 'Missing email' });
    }
    if (!password) {
      return response.status(400).send({ error: 'Missing password' });
    }
    try {
      const us = new User();
      const userp = await us.findUserByEmail(email);
      if (userp) {
        return response.status(400).send({ error: 'Already exist' });
      }

      const id = await us.createUser(email, password);
      const result = { id, email };
      await userQueue.add({
        userId: id,
      });
      return response.status(201).send(result);
    } catch (error) {
      return response.status(501).send({ error: 'Internal Server' });
    }
  }

  /**
   * The function retrieves the post of users
   * sends the result as a response.
   * @param request - The request parameter is an object that contains
   * @param response - The `response` parameter is an object
   * containing the status of the database and Redis client.
   */
  static async getMe(request, response) {
    const token = request.headers['x-token'];
    if (!token) {
      response.status(401).send({ error: 'Unauthorized' });
    } else {
      const us = new User();
      const user = await us.findByToken(token);
      if (!user) {
        response.status(401).send({ error: 'Unauthorized' });
      } else {
        response.status(200).send({ id: user._id, userID: user.userID, userType: user.userType });
      }
    }
  }

  static async validateToken(request, response) {
    const token = request.headers['x-token'];
    if (!token) {
      response.status(401).send({ error: 'Unauthorized' });
      return null;
    }
    const us = new User();
    const user = await us.findByToken(token);
    if (!user) {
      response.status(401).send({ error: 'Unauthorized' });
      return null;
    }
    return user;
  }

  static async postUpload(request, userId) {
    const file = new Files(
      request.body.name,
      request.body.type,
      request.body.data,
      request.body.parentId,
      request.body.isPublic,
    );
    const result = await file.save(userId);
    return result;
  }

  static async addtional(req, res) {
    const userID = await BasicAuthBank.onRegister(req);
    if (userID) {
      const filefound = await UsersController.postUpload(req, userID);
      if (filefound.error) {
        res.status(400).send({ filefound });
      } else {
        const token = uuidv4();
        await redisClient.set(`auth_${token}`, userID.toString(), 86400);
        res.status(200).send({ token });
      }
    } else {
      res.status(401).send({ error: 'Unauthorized' });
    }
  }
}

export default UsersController;
