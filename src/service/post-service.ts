import { Request, Response } from 'express';
import { PostRepo } from '../repository/post-repository';
import { IGetUserAuthInfoRequest } from '../middleware/decode-jwt';

export const createPost = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
) => {
  const {
    body: {
      title,
      content,
      topic_category,
      on_off_category,
      participant_count_limit,
    },
    user: { id, nickname },
  } = req;
  try {
    const insertId = await PostRepo.createPost(
      id,
      title,
      content,
      topic_category,
      on_off_category,
      participant_count_limit,
    );

    // 새로운 post를 생성했기때문에 return되면 클라이언트에서 포스트를 볼수있는 페이지로 redirect되어야함
    return res.status(201).json({ message: 'success' });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'fail', error });
  }
};

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    let posts = await PostRepo.getAllPosts();
    posts = posts.map((post: any) => {
      post['participant_count'] =
        post.participant === '' ? 0 : post.participant.split(',').length - 1;
      return post;
    });
    return res.status(200).json({ message: 'success', posts });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'fail', error });
  }
};

export const getPostDetail = async (req: Request, res: Response) => {
  const {
    params: { id },
  } = req;
  try {
    const post: any = await PostRepo.getPostDetail(parseInt(id));
    const comments = post.map((each: any) => {
      return {
        id: each.comment_id,
        comment: each.comment_text,
        user_id: each.comment_user_id,
        create_at: each.comment_created_at,
        updated_at: each.comment_updated_at,
        nickname: each.nickname,
      };
    });

    // 댓글이 하나도 작성되지 않은 게시글의 comments에도 null값으로 채워진 데이터가 들어가기떄문에
    // null값으로 채워진 댓글 데이터를 제거해줘야됨
    if (comments[0].id === null) {
      comments.shift();
    }

    const postData = post[0];
    delete postData.comment_id;
    delete postData.comment_text;
    delete postData.comment_post_id;
    delete postData.comment_user_id;
    delete postData.comment_created_at;
    delete postData.comment_updated_at;

    postData.comments = comments;
    postData.participant = postData.participant.split(',');
    postData.participant.pop();
    postData['participant_count'] =
      postData.participant === '' ? 0 : postData.participant.length;
    console.log(postData.participant);
    return res.status(200).json({ message: 'success', post: postData });
  } catch (error) {
    console.log(error);
  }
};

export const participateApply = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
) => {
  const {
    params: { id: post_id },
    user: { id: user_id, nickname },
  } = req;
  try {
    await PostRepo.participateApply(parseInt(post_id), user_id);
    return res.status(200).json({ message: 'success', user_id });
  } catch (error) {
    console.log(error);
  }
};

export const participateCancel = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
) => {
  const {
    params: { id: post_id },
    user: { id: user_id, nickname },
  } = req;
  try {
    await PostRepo.participateCancel(parseInt(post_id), user_id);
    return res.status(200).json({ message: 'success', user_id });
  } catch (error) {
    console.log(error);
  }
};
