
module.exports = app => {
  app.get('/auth/register', (req, res) => {
    res.send('REGISTERED A USER');

  });
}