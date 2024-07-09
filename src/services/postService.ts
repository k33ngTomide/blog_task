import { ObjectId } from 'mongoose';
import Post, { IPost } from '../models/Post';

const createNewPost = async (title: String, content: String, author: String) => {
  const newPost = new Post({
    title,
    content,
    author: author,
  });

  await newPost.save();
  return { message: 'Post created successfully', post: newPost };

}

const getAllPosts = async () => {
  const posts = await Post.find().populate('author', 'username');
  return posts;
}

const getUserPosts = async (author: String) => {
  const post = await Post.findById(author).populate('author', 'username');

  if (!post) {
    throw new Error('Post not found');
  }

  return post;
}

const updateUserPost = async (id: String, title: String, content: String, author: String) => {

  const post = await Post.findOne({ author: author, _id: id });
    if (!post) {
      throw new Error('Post not found' );
    }

    if (post.author.toString() !== author) {
      throw new Error ('Unauthorized');
    }

    const updatedPost = await Post.updateOne(
      { _id: id },
      { 
        title: title ? title : post.title, 
        content: content ? content : post.content 
      }
    );
  return { message: 'Post updated successfully', post: updatedPost};
}


const deleteUserPost = async (id: String, author: String) => {
  const post = await Post.findById(id);
    if (!post) {
      throw new Error('Post not found');
    }

    if (post.author.toString() !== author) {
      throw new Error('Unauthorized');
    }

    await Post.deleteOne({ _id: post.id });
    return { message: 'Post deleted successfully' };
}

export { createNewPost, getAllPosts, getUserPosts, updateUserPost, deleteUserPost};