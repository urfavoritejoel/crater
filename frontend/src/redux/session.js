import { csrfFetch } from './csrf';

//Constants
const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const setUser = (user) => ({
    type: SET_USER,
    payload: user
});

const removeUser = () => ({
    type: REMOVE_USER
});




export const thunkAuthenticate = () => async (dispatch) => {
    try {
        const response = await csrfFetch("/api/restore-user");
        if (response.ok) {
            const data = await response.json();
            dispatch(setUser(data));
        }
    } catch (e) {
        return e
    }
};

export const thunkLogin = (email, password) => async dispatch => {
    try {
        const res = await csrfFetch("/api/session", {
            method: "POST",
            body: JSON.stringify({ credential: email, password })
        });

        if (res.ok) {
            const data = await res.json();
            dispatch(setUser(data));
        }
        throw res;
    } catch (e) {
        if (!e.ok) {
            const data = await e.json();
            return data;
        }
    }
};

export const thunkSignup = (user) => async (dispatch) => {
    try {
        const res = await csrfFetch("/api/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        });

        if (res.ok) {
            const data = await res.json();
            dispatch(setUser(data));
        }
        throw res;
    } catch (e) {
        if (!e.ok) {
            const data = await e.json();
            return data;
        }
    }
};

export const thunkLogout = () => async (dispatch) => {
    await csrfFetch("/api/session", {
        method: "DELETE",
    });
    dispatch(removeUser());
};

export const updateUserThunk = (userId, form) => async (dispatch) => {
    const { img_url } = form
    try {

        const formData = new FormData();

        formData.append('userId', userId)
        formData.append("image", img_url);

        const option = {
            method: "PUT",
            headers: { 'Content-Type': 'multipart/form-data' },
            body: formData
        }

        const response = await csrfFetch(`/api/users/${userId}/update`, option);
        if (response.ok) {
            const user = await response.json();
            dispatch(editUser(user));

        } else if (response.status < 500) {
            const data = await response.json();
            if (data.errors) {
                return data
            } else {
                throw new Error('An error occured. Please try again.')
            }
        }
        return response;
    } catch (e) {
        return e
    }
}


const initialState = { user: null };

function sessionReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case SET_USER:
            return { ...state, user: action.payload };
        case REMOVE_USER:
            return { ...state, user: null };
        default:
            return state;
    }
}

export default sessionReducer;
