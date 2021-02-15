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

  static async checkValidUser(socialId: string) {
    const checkValidUserQuery = `SELECT * FROM user WHERE social_id = '${socialId}'`;
    return await selectQueryExecuter<User>(checkValidUserQuery);
  }
}
