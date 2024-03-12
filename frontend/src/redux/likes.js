import { csrfFetch } from './csrf';

const POST_LIKE = 'likes/post';
const DELETE_LIKE = 'likes/delete';


const postLike = (like) => ({
    type: POST_LIKE,
    payload: like
});

const deleteLike = (likeId) => ({
    type: DELETE_LIKE,
    payload: likeId
})


export const postLikeThunk = (elementType, elementId) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/${elementType}s/${elementId}/likes`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
        });
        if (res.ok) {
            const data = await res.json();
            dispatch(postLike(data));
            return data;
        }
        throw res;
    } catch (e) {
        const data = await e.json();
        return data;
    }
};

export const deleteLikeThunk = (likeId) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/likes/${likeId}`, {
            method: "DELETE",
        });
        if (res.ok) {
            const data = await res.json();
            dispatch(deleteLike(likeId));
            return data;
        }
        throw res;
    } catch (e) {
        const data = await e.json();
        return data;
    }
};

const initialState = { allLikes: [], byId: {} };

const likesReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case POST_LIKE:
            newState.allLikes = [...newState.allLikes, action.payload];
            newState.byId[action.payload.id] = action.payload;
            return newState;
        case DELETE_LIKE:
            const newLikes = newState.allLikes.filter(
                (like) => like.id !== action.payload
            );
            newState.allLikes = newLikes;
            delete newState.byId[action.payload];
            return newState;
        default:
            return state;
    }
};

export default likesReducer;
