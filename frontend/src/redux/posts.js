import { csrfFetch } from './csrf';

const GET_ALL_POSTS = 'posts/getAll';
const GET_POST = 'posts/getOne';
const GET_CURRENT_USER_POSTS = 'posts/getCurrentUserPosts';
const GET_POSTS_BY_USER = 'posts/getUserIdPosts';
const CREATE_POST = 'posts/create';
const PUT_POST = 'posts/put';
const DELETE_POST = 'posts/delete';


const getAllPosts = (posts) => ({
    type: GET_ALL_POSTS,
    payload: posts
});

const getPost = (post) => ({
    type: GET_POST,
    payload: post
});

const getCurrentUserPosts = (posts, userId) => ({
    type: GET_CURRENT_USER_POSTS,
    payload: {
        posts,
        userId
    }
});

const getUserIdPosts = (posts, userId) => ({
    type: GET_POSTS_BY_USER,
    payload: {
        posts,
        userId
    }
});

const createPost = (post) => ({
    type: CREATE_POST,
    payload: post
});

const putPost = (post, userId) => ({
    type: PUT_POST,
    payload: {
        post,
        userId
    }
});

const deletePost = (postId) => ({
    type: DELETE_POST,
    payload: postId,
});


export const getAllPostsThunk = () => async (dispatch) => {
    const res = await csrfFetch('/api/posts');
    const data = await res.json();
    dispatch(getAllPosts(data.Posts));
    return data.Posts;
};

export const getPostThunk = (postId) => async (dispatch) => {
    const res = await csrfFetch(`/api/posts/${postId}`);
    const data = await res.json();
    dispatch(getPost(data));
    return data;
};

export const getCurrentUserPostsThunk = (userId) => async (dispatch) => {
    const res = await csrfFetch('/api/posts/current');
    const data = await res.json();
    dispatch(getCurrentUserPosts(data.Posts, userId))
    return data.Posts;
};

export const getUserIdPostsThunk = (userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/users/${userId}/posts`);
    const data = await res.json();
    dispatch(getUserIdPosts(data.Posts, userId))
    return data.Posts;
};

export const createPostThunk = (post, userId) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/posts`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(post),
        });
        if (res.ok) {
            const data = await res.json();
            dispatch(createPost(data));
            return data;
        }
        throw res;
    } catch (e) {
        const data = await e.json();
        return data;
    }
};

export const putPostThunk = (post, postId, userId) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/posts/${postId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(post),
        })

        if (res.ok) {
            const data = await res.json();
            dispatch(putPost(data, userId));
            return data
        }
        throw res;
    } catch (e) {
        const data = await e.json();
        return data;
    }
};

export const deletePostThunk = (postId, userId) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/posts/${postId}`, {
            method: "DELETE",
        });
        if (res.ok) {
            const data = await res.json();
            dispatch(deletePost(postId));
            return data;
        }
        throw res;
    } catch (e) {
        const data = await e.json();
        return data;
    }
};

const initialState = { allPosts: [], byId: {}, byUser: {} };

const postsReducer = (state = initialState, action) => {
    let newState = {};
    switch (action.type) {
        case GET_ALL_POSTS:
            newState = { ...state };
            newState.allPosts = action.payload;
            action.payload.forEach(post => {
                newState.byId[post.id] = post;
            });
            return newState;
        case GET_POST:
            newState = { ...state };
            newState.allPosts.push(action.payload);
            newState.byId[action.payload.id] = action.payload;
            return newState;
        case GET_CURRENT_USER_POSTS:
            newState = { ...state };
            newState.byUser[action.payload.userId] = action.payload.posts;
            action.payload.posts.forEach(post => {
                newState.byId[post.id] = post;
            });
            return newState;
        case GET_POSTS_BY_USER:
            newState = { ...state };
            newState.byUser[action.payload.userId] = action.payload.posts;
            action.payload.posts.forEach(post => {
                newState.byId[post.id] = post;
            });
            return newState;
        case CREATE_POST:
            newState = { ...state };
            newState.allPosts.push(action.payload);
            newState.byId[action.payload.id] = action.payload;
            return newState;
        case PUT_POST:
            newState = { ...state };
            const allPostIndex = newState.allPosts.findIndex(
                (post) => post.id === action.payload.post.id
            );
            const userIdIndex = newState.byUser[action.payload.userId].findIndex(
                (post) => post.id === action.payload.post.id
            );
            newState.allPosts[allPostIndex] = action.payload.post;
            newState.byId[action.payload.post.id] = action.payload.post;
            newState.byUser[action.payload.userId][userIdIndex] = action.payload.post;
            return newState;
        case DELETE_POST:
            newState = { ...state };
            newState.allPosts = newState.allPosts.filter(
                (post) => post.id !== action.payload
            );
            delete newState.byId[action.payload];
            return newState;
        default:
            return state;
    }
};

export default postsReducer;
