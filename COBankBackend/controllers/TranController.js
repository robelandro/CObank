import User from '../utils/users';
import Transaction from '../utils/tran';

class TranController {
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

  static async deposit(request, response) {
    const user = await TranController.validateToken(request, response);
    if (!user) return;
    const { amount, description } = request.body;
    if (!amount) {
      response.status(400).send({ error: 'Missing amount' });
      return;
    }
    if (!description) {
      response.status(400).send({ error: 'Missing description' });
      return;
    }
    const tran = new Transaction();
    const result = await tran.deposit(user._id, amount, description, 'deposit');
    response.status(201).send(result.ops[0]);
  }

  static async withdraw(request, response) {
    const user = await TranController.validateToken(request, response);
    if (!user) return;
    const { amount, description } = request.body;
    if (!amount) {
      response.status(400).send({ error: 'Missing amount' });
      return;
    }
    if (!description) {
      response.status(400).send({ error: 'Missing description' });
      return;
    }
    const tran = new Transaction();
    const result = await tran.withdraw(user._id, amount, description, 'withdraw');
    response.status(201).send(result.ops[0]);
  }

  static async transfer(request, response) {
    const user = await TranController.validateToken(request, response);
    if (!user) return;
    const { amount, description, to } = request.body;
    if (!amount) {
      response.status(400).send({ error: 'Missing amount' });
      return;
    }
    if (!description) {
      response.status(400).send({ error: 'Missing description' });
      return;
    }
    if (!to) {
      response.status(400).send({ error: 'Missing to' });
      return;
    }
    const tran = new Transaction();
    const result = await tran.transfer(user._id, amount, description, 'transfer', to);
    response.status(201).send(result.ops[0]);
  }

  static async balance(request, response) {
    const user = await TranController.validateToken(request, response);
    if (!user) return;
    const tran = new Transaction();
    const result = await tran.getBalance(user._id);
    response.status(200).send(result);
  }

  static async getTransactions(request, response) {
    const user = await TranController.validateToken(request, response);
    if (!user) return;
    const { page, limit } = request.query;
    const tran = new Transaction();
    const result = await tran.getTransactions(user._id, page, limit);
    response.status(200).send(result);
  }
}

export default TranController;
