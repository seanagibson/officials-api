import { signup } from './users';
import { login, validateToken } from './auth';

exports.routes = router => {
  //User routes
  router.post('/users/signup', signup);

  //Auth routes
  router.post('/auth/login', login);
  router.post('auth/validate_token', validateToken);
};
