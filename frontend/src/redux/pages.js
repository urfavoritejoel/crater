import { csrfFetch } from './csrf';

const GET_ALL_PAGES = 'pages/getAll';
const GET_CURRENT_USER_PAGES = 'pages/getCurrentUserPages';
const GET_PAGES_BY_USER = 'pages/getUserIdPages';
const POST_PAGE = 'pages/post';
const PUT_PAGE = 'pages/put';
const DELETE_PAGE = 'pages/delete';

const getAllPages = (pages) => ({
    type: GET_ALL_PAGES,
    payload: pages
});

const getCurrentUserPages = (pages, userId) => ({
    type: GET_CURRENT_USER_PAGES,
    payload: {
        pages,
        userId
    }
});

const getUserIdPages = (pages, userId) => ({
    type: GET_PAGES_BY_USER,
    payload: {
        pages,
        userId
    }
});

const postPage = (page) => ({
    type: POST_PAGE,
    payload: page
});

const putPage = (page) => ({
    type: PUT_PAGE,
    payload: page
});

const deletePage = (pageId) => ({
    type: DELETE_PAGE,
    payload: pageId,
});


export const getAllPagesThunk = () => async (dispatch) => {
    const res = await csrfFetch('/api/pages');
    const data = await res.json();
    dispatch(getAllPages(data.Pages));
    return data.Pages;
};

export const getCurrentUserPagesThunk = (userId) => async (dispatch) => {
    const res = await csrfFetch('/api/pages/current');
    const data = await res.json();
    dispatch(getCurrentUserPages(data.Pages, userId))
    return data.Pages;
};

export const getUserIdPagesThunk = (userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/users/${userId}/pages`);
    const data = await res.json();
    dispatch(getUserIdPages(data.Pages, userId))
    return data.Pages;
};

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
};

export const putPageThunk = (page) => async (dispatch) => {
    try {
        const res = await fetch(`/api/pages/${page.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: page
        })

        if (res.ok) {
            const data = await res.json();
            dispatch(putPage(data))
            return data
        }
        throw res;
    } catch (e) {
        const data = await e.json();
        return data;
    }
};

export const deletePageThunk = (pageId) => async (dispatch) => {
    try {
        const res = await fetch(`api/pages/${pageId}`, {
            method: "DELETE",
        });
        if (res.ok) {
            const data = await res.json();
            dispatch(deletePage(pageId));
            return data;
        }
        throw res;
    } catch (e) {
        const data = await e.json();
        return data;
    }
};


const initialState = { allPages: [], byId: {}, byUser: {} }

const pagesReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case GET_ALL_PAGES:
            newState.allPages = action.payload;
            action.payload.forEach(page => {
                newState.byId[page.id] = page;
            });
            return newState;
        case GET_CURRENT_USER_PAGES:
            newState.byUser[action.payload.userId] = action.payload.pages;
            action.payload.pages.forEach(page => {
                newState.byId[page.id] = page;
            });
        case GET_PAGES_BY_USER:
            newState.byUser[action.payload.userId] = action.payload.pages;
            action.payload.pages.forEach(page => {
                newState.byId[page.id] = page;
            });
        case POST_PAGE:
            newState.allPages.push(action.payload);
            newState.byId[action.payload.id] = action.payload;
            return newState;
        case PUT_PAGE:
            const index = newState.allPages.findIndex(
                (page) => page.id === action.payload.id
            );
            newState.allPages[index] = action.payload;
            newState.byId[action.payload.id] = action.payload;
            return newState;
        case DELETE_PAGE:
            newState.allPages = newState.allPages.filter(
                (page) => page.id !== action.payload.pageId
            );
            delete newState.byId[action.payload];
            return newState;
        default:
            return state;
    }
};

export default pagesReducer;
