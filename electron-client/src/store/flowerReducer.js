import axios from 'axios'
import config from '../utils/headerConfig'
import { toastSuccess, toastError } from '../utils/toastUtil'
import { store } from '../index'
import { LOGOUT } from './userReducer'

const FETCH_FLOWERS = 'FETCH_FLOWERS'
const CREATE_FLOWERS = 'CREATE_FLOWERS'
const DELETE_FLOWERS = 'DELETE_FLOWERS'

///////////////Actions
export const actionCreators = {
    fetchAllFlowers:() => async dispatch => {
        try {
            const { data } = await axios.get(process.env.REACT_APP_FLOWER_GET, config(store.getState().User.jwt))
            dispatch({
                        type: FETCH_FLOWERS,
                        payload: data.Items
                    })
        }
        catch (e) {
            //log for now, shows 401 Error
            console.log(e)
        }
    },
    createFlowerRecord: (flowerRecord) => async dispatch => {
        try {
            const res = await axios.post(process.env.REACT_APP_FLOWER_POST, flowerRecord, config(store.getState().User.jwt))
            toastSuccess("Flower Saved")
            dispatch({
                type: CREATE_FLOWERS,
                payload: res.data
            })
        }
        catch (e) {
            toastError("Error Saving Flower")
        }
    },
    deleteFlowerRecord:(recordId) => async dispatch => {
        try {
            const res = await axios.delete(`${process.env.REACT_APP_FLOWER_DELETE}/${recordId}`, config(store.getState().User.jwt))
            toastSuccess("Flower Deleted")
            dispatch({
                type: DELETE_FLOWERS,
                payload: res.data
            })
        }
        catch (e) {
            toastError("Error Deleting Flower")
        }
    }
}

/////////////////////Reducer

const initialState = {
    catalogued: {},
    loaded: false
}

export const reducer = (state = initialState, action) => {
    const { type, payload } = action

    switch(type) {
        case FETCH_FLOWERS:
            return{
                ...state,
                catalogued: payload.reduce((obj, item) =>{
                    let { id } = item
                    return {
                        ...obj,
                        [id]:item 
                    }
                }, {}),
                loaded:true
            }
        case CREATE_FLOWERS:
            
            return{
                ...state,
                catalogued: { [payload.id]:payload, ...state.catalogued}
            }
        case DELETE_FLOWERS:
            return {
                ...state,
                catalogued: Object.keys(state.catalogued).filter(flowerId => flowerId !== payload)
                        .reduce((obj, item)=>{
                            return{
                                ...obj,
                                [item]:state.catalogued[item]
                            }
                        }, {})
            }
        case LOGOUT:
            return initialState
        default:
            return state
    }
}