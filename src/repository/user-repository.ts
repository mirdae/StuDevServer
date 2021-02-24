import {
  insertQueryExecuter,
  selectQueryExecuter,
} from '../utils/query-executor';

export type User = {
  id: number;
  social_id: string;
  nickname?: string;
  email: string;
  hash?: string;
};

export class UserRepo {
  static async createUser(
    social_id: string,
    hash: string,
    email: string,
    nickname: string,
  ) {
    const createUserQuery = `INSERT INTO user(social_id, hash, nickname, email) VALUES ('${social_id}', '${hash}', '${email}', '${nickname}')`;
    return await insertQueryExecuter(createUserQuery);
  }

  static async findBySocialId(social_id: string) {
    const findUserBySocialIdQuery = `SELECT * FROM user WHERE social_id = '${social_id}'`;
    const [user, _] = await selectQueryExecuter<User>(findUserBySocialIdQuery);
    return user;
  }

  static async findByNickname(nickname: string) {
    const findUserByNicknameQuery = `SELECT * FROM user WHERE nickname = '${nickname}'`;
    const [user, _] = await selectQueryExecuter<User>(findUserByNicknameQuery);
    return user;
  }

  static async findById(userId: number) {
    const findUserByIdQuery = `SELECT * FROM user WHERE id='${userId}'`;
    const [user, _] = await selectQueryExecuter<User>(findUserByIdQuery);
    return user;
  }
}
