import user from '../models/user';
import parseErrors from '../utils/parseErrors';
import sendCofirmationEmail from '../utils/mailer.js';
import bcyrpt from 'bcryptjs';
import { generateJWT } from '../utils/helper.js';

/* router.post("/", (req, res) => {
  const { email, password } = req.body.user;
  const user = new User({ email });
  user.setPassword(password);
  user.setConfirmationToken();
  user
    .save()
    .then(userRecord => {
      sendConfirmationEmail(userRecord);
      res.json({ user: userRecord.toAuthJSON() });
    })
    .catch(err => res.status(400).json({ errors: parseErrors(err.errors) }));
}); */

//Find all users
// router.get('/', function(req, res, next) {
//   user
//     .findAll({
//       include: [{ all: true }],
//     })
//     .then(res.send.bind(res))
//     .catch(next);
// });

//Create a new user
exports.signup = (req, res) => {
  const { email, password } = req.body;
  let userInDB;
  user.findAll({ where: { email: email } }).then(res => (userInDB = res));
  console.log('userInDB: ', userInDB);
  if (userInDB) {
    res.status(400).json({ error: 'User email already used' });
  } else {
    user.create({ email, passwordHash: password }).then(response => {
      const token = generateJWT(response.email);
      res.status(200).json({ token });
    });
  }
};
