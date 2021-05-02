import { toastSuccess, toastError } from '../utils/toastUtil'
import { signOut } from '../utils/cognitoOperations'

export const FETCH_USER = 'FETCH_USER'
export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGOUT = 'LOGOUT'

//////////////Actions
export const actionCreators = {
    login: (credentials) => async dispatch => {
        try {
            const userCredentials = {
                jwt: credentials.jwtToken,
                userName: credentials.payload.username,
                id:credentials.payload.sub,
            }

            dispatch({
                type: LOGIN_SUCCESS,
                payload: userCredentials
            })
        } catch (err) {
            toastError('failed to login')
        }
    },
    logout: () => async dispatch => {
        try {
            signOut()
            toastSuccess("Logged Out")
            dispatch({ type: LOGOUT });
        } catch (err) {
            toastError('could not logout!')
        }
    }
}

/////////////////////////Reducer

const initialState = {
    isAuthenticated: false,
    loading: true,
}

export const reducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch(type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
                };
        case LOGOUT: 
            return initialState
        default:
            return state
    }
}