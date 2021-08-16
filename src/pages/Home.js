import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getUser, singleUser } from '../redux/actions'
import { useSelector } from 'react-redux'
import User from '../components/User'

function Home() {
    const [loadingState, setLoadingState] = useState(true)
    const dispatch = useDispatch()
    let data = useSelector(state => state.List.data)
    const getRandomIntBetween = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

    const fetchApi = (flag) => {
        setLoadingState(true)
        let api = `https://jsonplaceholder.typicode.com/users`
        fetch(api)
        .then(response => {
            if(!response.ok){
                throw new Error(response.statusText)
            }else{
                return response.json()
            }
        })
        .then(data => {
            setLoadingState(false)
            if(flag === 'single'){
                let user = {
                    name : data[getRandomIntBetween(0,9)].name,
                    id : Date.now()
                }
                dispatch(singleUser(user))
            }else{
                dispatch(getUser(data))
            }
        })
        .catch(err => {
            setLoadingState(false)
            console.log(err)
        })
    }

    const getSingleUser = () => {
        fetchApi('single')
    }

    useEffect(() => {
        fetchApi('all')  
    }, [])
    return (
        <div>
            <button onClick={() => getSingleUser()}>Get New User </button>
            {
                loadingState ?
                <img style={{marginLeft: '8px', width: '17px'}} src="images/loader.gif" alt="loader" />
                :
                ('')
            }
            <div>
            {
                data.map(item => (
                    <User key={item.id} name={item.name} />
                ))
            }
            </div>
            
            
        </div>
    )
}

export default Home
