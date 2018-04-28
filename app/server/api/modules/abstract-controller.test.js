import { dropDb } from '<utils>/test.helper';
import { User } from '<api>/resources/user';
import controllers from './abstract-controller';

describe('Modules', () => {
  beforeEach(async () => {
    await dropDb();
  });

  afterEach(async () => {
    await dropDb();
  });

  describe('Abstract Controller', () => {
    describe('createOne', () => {
      test('should create a document', async () => {
        const body = getUser();
        const result = await controllers.createOne(User, body);

        expect(result).toBeTruthy();
        expect(result.id).toBeTruthy();
        expect(result.email).toBe(body.email);
      });
    });

    describe('updateOne', () => {
      test('should update a document', async () => {
        const body = getUser();
        const user = await controllers.createOne(User, body);

        const newEmail = 'test_updated_email';
        const updatedUser = await controllers.updateOne(user, { email: newEmail });

        expect(updatedUser.email).toBe(newEmail);
        expect(updatedUser.id).toBe(user.id);
      });
    });

    describe('deleteOne', () => {
      test('should delete a document', async () => {
        const body = getUser();
        const user = await controllers.createOne(User, body);

        const deletedUser = await controllers.deleteOne(user);

        expect(deletedUser.id).toBe(user.id);
        expect(await User.findById(user.id)).toBe(null);
      });
    });

    describe('getAll', () => {
      test('should get all documnets', async () => {
        const emails = ['test_email1', 'test_email2'];

        const users = await Promise.all(emails.map(async (email) => {
          const user = await controllers.createOne(User, { email, password: 'test_password' });
          return user.toJSON();
        }));

        const allUsers = (await controllers.getAll(User)).map(user => user.toJSON());

        expect(allUsers).toHaveLength(users.length);
      });
    });

    describe('getOne', () => {
      test('should find model my id', async () => {
        const body = getUser();
        const user = (await controllers.createOne(User, body)).toJSON();
        const foundUser = (await controllers.getOne(User, user.id)).toJSON();

        expect(foundUser).toEqual(user);
      });
    });
  });
});

function getUser(email = 'test_email', password = 'test_password') {
  return { email, password };
}
