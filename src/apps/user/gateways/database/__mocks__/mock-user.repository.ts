import { IUser } from '../Iuser.entity';
import { IUserRepository } from '../Iuser.repository';

const USER_MOCK: IUser[] = [
  { id: 0, username: 'testDev', password: 'testPassword' },
];

export class MockUserRepository implements IUserRepository {
  async saveOne(payload: Partial<IUser>): Promise<IUser> {
    const newId = USER_MOCK.length + 1;

    USER_MOCK.push({
      id: newId,
      username: payload.username,
      password: payload.password,
    });

    const userInserted = USER_MOCK[USER_MOCK.length - 1];

    return Promise.resolve(userInserted);
  }
  async findOne(payload: Partial<IUser>): Promise<IUser | null> {
    const result = USER_MOCK.find(
      (userMock) =>
        userMock.id === payload?.id || userMock.username === payload?.username,
    );

    return result;
  }
}
