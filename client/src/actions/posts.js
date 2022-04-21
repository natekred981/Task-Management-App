import * as api from '../api';

export  const getPosts = async (dispatch) => {
    try {
        const { data } = await api.fetchPosts(); //destructures data we get from posts

    }
    catch (error){
        console.log(error.message);
    }
    return action;
}