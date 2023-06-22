import ClientInfo from '../utils/clientInfo';
import User from '../utils/users';
/**
 * The AppController for retrieving the status and statistics of a
 */
class ClientInfoControler {
  /**
   * The function retrieves the post of users
   * @param {*} req
   * @param {*} res
   */
  static async accountCreate(req, res) {
    const clientInfo = new ClientInfo();
    const result = await clientInfo.createNewUser(req.body);
    if (result.error) {
      res.status(400).send({ error: result.error });
    } else {
      res.status(201).send(result);
    }
  }

  static async getMecustomer(req, res) {
    const token = req.headers['x-token'];
    if (!token) {
      res.status(401).send({ error: 'Unauthorized' });
    } else {
      const clientInfo = new User();
      const user = await clientInfo.findByToken(token);
      if (!user) {
        res.status(401).send({ error: 'Unauthorized' });
      } else {
        const cust = new ClientInfo();
        const userInfo = await cust.getUsetInfo(user._id);
        if (!userInfo) {
          res.status(401).send({ error: 'Customer Not found' });
        }
        res.status(200).send(userInfo);
      }
    }
  }
}
export default ClientInfoControler;
