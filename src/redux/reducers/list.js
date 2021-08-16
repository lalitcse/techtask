import { USER_DATA, SINGLE_USER } from '../types'

const initalState = {
    data : []
}

const List = (state = initalState, action) => {
    switch(action.type){
        case USER_DATA:
            return {
                ...state,
                data: [...action.payload]
            }
        case SINGLE_USER:
            return {
                ...state,
                data: [action.payload, ...state.data]
            }
        default:
            return state
    }
}

export default List