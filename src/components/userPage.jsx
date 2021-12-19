import React,{useState,useEffect} from "react";
import {useHistory} from "react-router-dom";
import {useSelector,useDispatch} from "react-redux"
import axios from "axios"

const UserPage = () =>{

    const[userInfo,setUser] = useState({});

    const[file,setFile] = useState()

    const[active,setActive] = useState(false)

    const token = useSelector(state => state.token)
    
    const history = useHistory()

    const sendFile = async() =>{
        if(file){
            const dataFile = new FormData();
            dataFile.append('avatar',file)

            await axios.post('http://localhost:3000/auth/upload',dataFile,{
                headers: {
                    Authorization:`Bearer ${user.token}`,
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(res => history.go(0))
            .catch(err => console.log(err))
        }        
    }   

    const toggleActive = () => {
        setActive(!active)
    }

    useEffect(async()=>{
        try {
            await axios.get('https://blog-server-kirill.herokuapp.com/auth/user',{headers: {Authorization:`Bearer ${token}`}})
                .then(res => setUser(res.data))           
        } catch (error) {
            console.log(error);
        }  
    },[])

    const dispatch = useDispatch()

    const logoutuUser = () =>{
        dispatch({ type:"CLEAR_USER"})
        localStorage.removeItem('token')
        history.push('/')
        history.go(0)
    }
    return(
        <div className="user__page">
            <div className="user__page__title">
                Мой аккаунт
            </div>  
            
                <div className="user__page__content">
                   
                    <div className="user__page__avatar" style={{background:`url(${userInfo.avatar}) 0 0px/cover no-repeat`}}></div>
                    <div className="change__avatar">
                        <div className="change__avatar__btn" onClick={() => toggleActive()}>
                            Изменить аватарку
                        </div>
                        {active ? <div className="change__avatar__content">
                                    <input type="file" onChange={e => setFile(e.target.files[0])}/>
                                    <button className="user__page__btn" onClick={() => sendFile()}>Обновить аватарку</button>
                                  </div>
                        :null}
                    </div>
                    <div className="user__page__content-text">
                        <div className="user__page__name">{userInfo.name}</div>
                        <div className="user__page__email">{userInfo.email}</div>
                    </div>
                </div>
                
            <button onClick={() =>logoutuUser()}>Выход</button>
        </div>
    )
}
export default UserPage;