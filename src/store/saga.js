import {take,put,call} from 'redux-saga/effects'

import axios from 'axios'

const getInfo = async(pattern) =>{
    const posts = await axios.get(`https://blog-server-kirill.herokuapp.com/${pattern}`)

    return posts
}

export function* getPosts(){
    const posts = yield call(getInfo,'blog/posts/postlist')

    yield put({type:"SET_POSTS",payload:posts.data})

    return posts;
}

export function* getUser(){
    const posts = yield call(getInfo,'blog/posts/postlist')
}

export function* watchSaga(){

    yield take("GET_POSTS")

    yield getPosts()

}

export default function* rootSaga(){
    yield  watchSaga()
}