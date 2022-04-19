import React from "react";
import Post from "./Post/Post.js";
import  {useSelector} from 'react-redux';
const Posts = () => {
    const posts = useSelector(state => state.posts);
    console.log(posts);

    return (
        <>
        <h1>POST</h1>
        <Post />
        <Post />
        </>
        

    );
}
export default Posts;