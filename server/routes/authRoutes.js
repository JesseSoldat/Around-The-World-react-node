const {User} = require('../models/user');

module.exports = (app, pick) => {

  app.post('/auth/register', async (req, res) => {
    const body = pick(req.body, ['username', 'email', 'password']);
    const user = new User(body);

    try {
      await user.save();
      const token = await user.generateAuthToken();
      res.header('x-auth', token).send(user);
    } catch(err) {
      console.log('REG ERR', err);   
      res.status(400).send(err);
    }
  });

  app.post('/auth/login', async (req, res) => {
    const body = pick(req.body, ['email', 'password']);
    try {
      const user = await User.findByCredentials(body.email, body.password);
      const token = await user.generateAuthToken();
      res.header('x-auth', token).send(user);
    } 
    catch (err) {
      res.status(400).send(err);
    }
  });
  
}