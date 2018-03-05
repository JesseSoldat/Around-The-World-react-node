
module.exports = (app, pick) => {
  app.get('/auth/register', (req, res) => {
    const body = pick(req.body, ['username', 'email', 'password']);
    const user = new User(body);
    res.send(user);

  });
}