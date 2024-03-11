import { csrfFetch } from './csrf';

const GET_ALL_THEMES = 'themes/getAll';
const GET_THEMES_BY_USER = 'themes/getUserIdThemes';
const GET_THEME_BY_ID = 'themes/getById';
const POST_THEME = 'themes/post';
const PUT_THEME = 'themes/put';
const DELETE_THEME = 'themes/delete';


const getAllThemes = (themes) => ({
    type: GET_ALL_THEMES,
    payload: themes
});

const getUserIdThemes = (themes, userId) => ({
    type: GET_THEMES_BY_USER,
    payload: {
        themes,
        userId
    }
});

const getThemeById = (theme) => ({
    type: GET_THEME_BY_ID,
    payload: theme
});

const postTheme = (theme, userId) => ({
    type: POST_THEME,
    payload: {
        theme,
        userId
    }
});

const putTheme = (theme, userId) => ({
    type: PUT_THEME,
    payload: {
        theme,
        userId
    }
});

const deleteTheme = (themeId, userId) => ({
    type: DELETE_THEME,
    payload: {
        themeId,
        userId
    }
});


export const getAllThemesThunk = (themes) => async (dispatch) => {
    const res = await csrfFetch(`/api/themes`);
    const data = await res.json();
    dispatch(getAllThemes(data.Themes))
    return data.Themes;
};

export const getUserIdThemesThunk = (userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/users/${userId}/themes`);
    const data = await res.json();
    dispatch(getUserIdThemes(data.Themes, userId))
    return data.Themes;
};

export const getThemeByIdThunk = (themeId) => async (dispatch) => {
    const res = await csrfFetch(`/api/themes/${themeId}`);
    const data = await res.json();
    dispatch(getThemeById(data));
    return data;
}

export const postThemeThunk = (theme, userId) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/themes`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(theme),
        });
        if (res.ok) {
            const data = await res.json();
            dispatch(postTheme(data, userId));
            return data;
        }
        throw res;
    } catch (e) {
        const data = await e.json();
        return data;
    }
};

export const putThemeThunk = (theme, themeId, userId) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/themes/${themeId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(theme),
        })

        if (res.ok) {
            const data = await res.json();
            dispatch(putTheme(data, userId));
            return data
        }
        throw res;
    } catch (e) {
        const data = await e.json();
        return data;
    }
};

export const deleteThemeThunk = (themeId, userId) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/themes/${themeId}`, {
            method: "DELETE",
        });
        if (res.ok) {
            const data = await res.json();
            dispatch(deleteTheme(themeId, userId));
            return data;
        }
        throw res;
    } catch (e) {
        const data = await e.json();
        console.log("res?", data);
        return data;
    }
};

const initialState = { allThemes: [], byId: {}, byUser: {} };

const themesReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case GET_ALL_THEMES:
            newState.allThemes = action.payload
            action.payload.forEach(theme => {
                newState.byId[theme.id] = theme;
            });
            return newState;
        case GET_THEMES_BY_USER:
            newState.byUser[action.payload.userId] = action.payload.themes;
            action.payload.themes.forEach(theme => {
                newState.byId[theme.id] = theme;
            });
            return newState;
        case GET_THEME_BY_ID:
            newState.byId[action.payload.id] = action.payload;
            return newState;
        case POST_THEME:
            newState.allThemes.push(action.payload.theme);
            newState.byId[action.payload.id] = action.payload.theme;
            newState.byUser[action.payload.userId] = action.payload.theme;
            return newState;
        case PUT_THEME:
            const index = newState.allThemes.findIndex(
                (theme) => theme.id === action.payload.theme.id
            );
            newState.allThemes[index] = action.payload.theme;
            newState.byId[action.payload.id] = action.payload.theme;
            newState.byUser[action.payload.userId] = action.payload.theme;
            return newState;
        case DELETE_THEME:
            newState.allThemes = newState.allThemes.filter(
                (theme) => theme.id !== action.payload
            );
            delete newState.byId[action.payload];
            newState.byUser[action.payload.userId] = newState.byUser[action.payload.userId].filter(
                (theme) => theme.id !== action.payload.themeId
            );
            return newState;
        default:
            return state
    }
}

export default themesReducer;
