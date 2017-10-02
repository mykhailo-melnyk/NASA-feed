import Calendar from './Calendar';
import Schedule from './Schedule';
import { RouterGenerator } from '../../services';

export const routes = new RouterGenerator('/cleaning')
  .addRoute('/calendar', Calendar, true)
  .addRoute('/schedule', Schedule, true)
  .getRoutes();
