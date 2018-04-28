import { generateControllers } from '<api>/modules/controller.module';
import { User } from './user.model';

export default generateControllers(User);
