const dotenv = require('dotenv');
dotenv.config();
const body = require('body-parser');
const port = process.env.PORT || 3000;
const passport = require('../src/configuration/passport');
const app = require('../src/configuration/app');
const query = require('../src/query/query');

app.use(passport.initialize());

app.use(body.json());
app.use(
  body.urlencoded({
    extended: true,
  }),
);

app.get('/', (req, res) => {
  res.send('AxiomZen Backend API');
});

app.post('/signup', query.signUser);
app.post('/login', query.loginUser);
app.get('/users', passport.authenticate('jwt', {session: false}), (request, response) => {
  response.send({
    users: [
      request.user],
  });
});
app.put('/users', passport.authenticate('jwt', {session: false}), query.modifyUser);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});


