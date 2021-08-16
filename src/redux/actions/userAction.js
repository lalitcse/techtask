import { USER_DATA, SINGLE_USER } from '../types'

export const getUser = (data) => {
    return {
        type : USER_DATA,
        payload : data
    }
}

export const singleUser = (data) => {
    return {
        type : SINGLE_USER,
        payload : data
    }
}