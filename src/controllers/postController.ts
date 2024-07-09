import e, { Request, Response } from 'express';
import Post, { IPost } from '../models/Post';
import { 
  createNewPost, 
  getAllPosts, 
  getUserPosts, 
  updateUserPost,
  deleteUserPost 
} from '../services/postService';

interface AuthRequest extends Request {
  user?: any;
}

const createPost = async (req: AuthRequest, res: Response) => {
  const { title, content } = req.body;

  try {
    const response = await createNewPost(title, content, req.user.id);
    res.status(201).json(response);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await getAllPosts();
    res.status(200).json(posts);
  } catch (error: any) {
    res.status(500).json(error.message);
  }
};

const getPostById = async (req: Request, res: Response) => {
  try {
    const posts = await getUserPosts(req.params.id);
    res.status(200).json(posts);
  } catch (error: any) {
    res.status(500).json(error.message);
  }
};

const updatePost = async (req: AuthRequest, res: Response) => {
  try {
    const response = await updateUserPost(req.params.id, req.body.title, req.body.content, req.user.id);
    res.status(200).json(response);
  } catch (error: any) {
    res.status(500).json(error.message);
  }
};

const deletePost = async (req: AuthRequest, res: Response) => {
  try {
    const response = await deleteUserPost(req.params.id, req.user.id);
    res.status(200).json(response);
  } catch (error: any) {
    res.status(500).json(error.message);
  }
};

export { createPost, getPosts, getPostById, updatePost, deletePost };
