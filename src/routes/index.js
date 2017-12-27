import { signup } from './users';
import { login } from './auth';

exports.routes = router => {
  //User routes
  router.post('/users/signup', signup);

  //Auth routes
  router.post('/auth/login', login);
};
