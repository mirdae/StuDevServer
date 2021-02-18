import {
  insertQueryExecuter,
  selectQueryExecuter,
} from '../utils/query-executor';

export type User = {
  id: number;
  socialId: string;
  nickname?: string;
  email: string;
  hash?: string;
};

export class UserRepo {
  static async createUser(
    socialId: string,
    hash: string,
    email: string,
    nickname: string,
  ) {
    const createUserQuery = `INSERT INTO user(social_id, hash, nickname, email) VALUES ('${socialId}', '${hash}', '${nickname}', '${email}')`;
    return await insertQueryExecuter(createUserQuery);
  }

  static async findBySocialId(socialId: string) {
    const findUserBySocialIdQuery = `SELECT * FROM user WHERE social_id = '${socialId}'`;
    const [user, _] = await selectQueryExecuter<User>(findUserBySocialIdQuery);
    return user;
  }

  static async findById(userId: number) {
    const findUserByIdQuery = `SELECT * FROM user WHERE id='${userId}'`;
    const [user, _] = await selectQueryExecuter<User>(findUserByIdQuery);
    return user;
  }
}
