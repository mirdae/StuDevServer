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
    const posts = await PostRepo.getAllPosts();
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
    const post = await PostRepo.getPostDetail(parseInt(id));
    return res.status(200).json({ message: 'success', post: post[0] });
  } catch (error) {
    console.log(error);
  }
};
