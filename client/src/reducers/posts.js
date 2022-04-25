import Posts from "../Components/Posts/Posts"
//trying to return different info depending on the action requested by yhr user
// the reducer tells the store that when you do this action and you try to dispatch it
// I want you to return all the posts
const reducer = (posts = [], action) => {
    switch (action.type){
        case 'FETCH_ALL':
            return posts;
        case 'CREATE':
            return posts;
        default:
            return posts;
    }

}

export default reducer;