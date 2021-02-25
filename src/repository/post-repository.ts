import {
  insertQueryExecuter,
  selectQueryExecuter,
  updateOrDeleteQueryExecuter,
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

  static async getAllPosts() {
    const getAllPostsQuery = `SELECT * FROM post`;
    return await selectQueryExecuter(getAllPostsQuery);
  }

  static async getPostDetail(id: number) {
    const getPostDetailQuery = `SELECT * FROM post left JOIN (SELECT comment.*, user.nickname FROM comment LEFT JOIN user ON comment.comment_user_id=user.id) comments oN comments.comment_post_id=post.id WHERE post.id=${id}
`;
    return await selectQueryExecuter(getPostDetailQuery);
  }

  static async participateApply(post_id: number, user_id: number) {
    const participateApplyQuery = `UPDATE post set participant=concat(participant,"${user_id},") where id=${post_id}`;
    return await updateOrDeleteQueryExecuter(participateApplyQuery);
  }

  static async participateCancel(post_id: number, user_id: number) {
    const participateCancelQuery = `UPDATE post set participant=REPLACE(participant, "${user_id},", "") where id=${post_id}`;
    return await updateOrDeleteQueryExecuter(participateCancelQuery);
  }

  static async createComment(
    post_id: number,
    user_id: number,
    comment: string,
    created_at: string,
  ) {
    const createCommentQuery = `INSERT INTO comment(comment_user_id, comment_post_id, comment_text, comment_created_at) VALUES ("${user_id}", "${post_id}", "${comment}", "${created_at}")`;
    return await insertQueryExecuter(createCommentQuery);
  }
}
