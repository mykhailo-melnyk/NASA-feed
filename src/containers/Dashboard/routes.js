import Home from '../Home';
import Cleaning from '../Cleaning';
import { RouterGenerator } from '../../services';

export const routes = new RouterGenerator('/')
  .addRoute('/', Home, true)
  .addRoute('/cleaning', Cleaning)
  .getRoutes();
