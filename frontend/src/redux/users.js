import { csrfFetch } from './csrf';

const GET_ALL_USERS = 'users/getAll';


const getAllUsers = (users) => ({
    type: GET_ALL_USERS,
    payload: users
});


export const getAllUsersThunk = () => async (dispatch) => {
    const res = await csrfFetch(`/api/users/all`);
    const data = await res.json();
    dispatch(getAllUsers(data));
    return data;
};

const initialState = { allUsers: [], byId: {} };

const usersReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case GET_ALL_USERS:
            newState.allUsers = action.payload;
            action.payload.forEach(user => {
                newState.byId[user.id] = user;
            });
            return newState;
        default:
            return state;
    }
}

export default usersReducer;
