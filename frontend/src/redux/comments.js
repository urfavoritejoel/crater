import { csrfFetch } from './csrf';

const GET_ALL_COMMENTS = 'comments/getAll';
const POST_COMMENT = 'comments/post';
const PUT_COMMENT = 'comments/put';
const DELETE_COMMENT = 'comments/delete';


const getAllComments = (comments) => ({
    type: GET_ALL_COMMENTS,
    payload: comments
});

const postComment = (comment) => ({
    type: POST_COMMENT,
    payload: comment
});

const putComment = (comment) => ({
    type: PUT_COMMENT,
    payload: comment
})

const deleteComment = (commentId) => ({
    type: DELETE_COMMENT,
    payload: commentId
});


export const getAllCommentsThunk = () => async (dispatch) => {
    const res = await csrfFetch('/api/comments');
    const data = await res.json();
    dispatch(getAllComments(data.Comments));
    return data.Comments;
};

export const postCommentThunk = (comment, postId, userId) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/posts/${postId}/comments`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(comment),
        });
        if (res.ok) {
            const data = await res.json();
            dispatch(postComment(data));
            return data;
        }
        throw res;
    } catch (e) {
        const data = await e.json();
        return data;
    }
};

export const putCommentThunk = (comment, commentId, userId) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/comments/${commentId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(comment),
        })

        if (res.ok) {
            const data = await res.json();
            dispatch(putComment(data));
            return data
        }
        throw res;
    } catch (e) {
        const data = await e.json();
        return data;
    }
};

export const deleteCommentThunk = (commentId, userId) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/comments/${commentId}`, {
            method: "DELETE",
        });
        if (res.ok) {
            const data = await res.json();
            dispatch(deleteComment(commentId));
            return data;
        }
        throw res;
    } catch (e) {
        const data = await e.json();
        return data;
    }
};


const initialState = { allComments: [], byId: {} };

const commentsReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case GET_ALL_COMMENTS:
            newState.allComments = action.payload;
            action.payload.forEach(comment => {
                newState.byId[comment.id] = comment;
            });
            return newState;
        case POST_COMMENT:
            newState.allComments = [...newState.allComments, action.payload];
            newState.byId[action.payload.id] = action.payload;
            return newState;
        case PUT_COMMENT:
            const index = newState.allComments.findIndex(
                (comment) => comment.id === action.payload.id
            );
            newState.allComments[index] = action.payload;
            newState.byId[action.payload.id] = action.payload;
            return newState;
        case DELETE_COMMENT:
            const newComments = newState.allComments.filter(
                (comment) => comment.id !== action.payload
            );
            newState.allComments = newComments;
            delete newState.byId[action.payload];
            return newState;
        default:
            return state;
    }
};

export default commentsReducer;
