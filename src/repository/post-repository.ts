import {
  insertQueryExecuter,
  selectQueryExecuter,
} from '../utils/query-executor';

export type Post = {
  title: string;
  content: string;
  topic_category: string;
  on_off_category: string;
  participant_count_limit: number;
};

export class PostRepo {
  static async createPost(
    id: number,
    title: string,
    content: string,
    topic_category: string,
    on_off_category: string,
    participant_count_limit: number,
  ) {
    const createPostQuery = `INSERT INTO post(user_id, title, content, topic_category, on_off_category, participant_count_limit) VALUES ('${id}', '${title}', '${content}', '${topic_category}', '${on_off_category}', '${participant_count_limit}')`;
    return await insertQueryExecuter(createPostQuery);
  }
}
