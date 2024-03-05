import { csrfFetch } from './csrf';

const GET_ALL_COMMENTS = 'comments/getAll';


const getAllComments = (comments) => ({
    type: GET_ALL_COMMENTS,
    payload: comments
});


export const getAllCommentsThunk = () => async (dispatch) => {
    const res = await csrfFetch('/api/comments');
    const data = await res.json();
    dispatch(getAllComments(data.Comments));
    console.log(data.Comments);
    return data.Comments;
};


const initialState = { allComments: [], byId: {}, byPost: {} };

const commentsReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case GET_ALL_COMMENTS:
            newState.allComments = action.payload;
            action.payload.forEach(comment => {
                newState.byId[comment.id] = comment;
            });
            action.payload.forEach(comment => {
                if (newState.byPost[comment.postId] === undefined) newState.byPost[comment.postId] = [];
                // if (newState.byPost[comment.postId]) .push(comment)
            });
            return newState;
        default:
            return state;
    }
};

export default commentsReducer;
