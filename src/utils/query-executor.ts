import { pool } from '../db';
import { promiseHandler } from './promise-handler';

export type MysqlInsertOrUpdateResult = {
  fieldCount: number;
  affectedRows: number;
  insertId: number;
  serverStatus: number;
  warningCount: number;
  message: string;
  protocol41: boolean;
  changedRows: number;
};

export const selectQueryExecuter = async <T>(query: string): Promise<T[]> => {
  const conn = await pool.getConnection();
  const [queryResult, error] = await promiseHandler(conn.query(query));
  const [result, _] = queryResult;
  console.log(result);
  conn.release();
  return result as T[];
};

export const insertQueryExecuter = async (query: string): Promise<number> => {
  const conn = await pool.getConnection();
  const [queryResult, error] = await promiseHandler(conn.query(query));
  const [{ insertId }, _] = queryResult;
  conn.release();
  return insertId;
};

export const updateOrDeleteQueryExecuter = async (
  query: string,
): Promise<number> => {
  const conn = await pool.getConnection();
  const [queryResult, error] = await promiseHandler(conn.query(query));

  const [{ affectedRows }, _] = queryResult;
  conn.release();
  return affectedRows;
};
