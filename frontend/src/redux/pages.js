import { csrfFetch } from './csrf';

const POST_PAGE = 'pages/post';

const postPage = (page) => ({
    type: POST_PAGE,
    payload: page
})


export const postPageThunk = (page) => async (dispatch) => {
    const res = await csrfFetch('/api/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(page)
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(postPage(data));
    } else if (res.status < 500) {
        const errorMessages = await res.json();
        return errorMessages
    } else {
        return { server: "Something went wrong. Please try again" }
    }
}


const initialState = { allPages: [], byId: {} }

const pagesReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case POST_PAGE:
            newState.allPages.push(action.payload);
            newState.byId[action.payload.id] = action.payload;
            return newState;
        default:
            return state;
    }
};

export default pagesReducer;
