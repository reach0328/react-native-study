import { API_URL } from "../../constant";
import { actionCreator as userAction} from "./user";
import uuidv1 from "uuid";

const SET_FEED = "SET_FEED";
const SET_SEARCH = "SET_SEARCH";

function setFeed(feed) {
    return {
        type: SET_FEED,
        feed
    }
}

function setSearch(search) {
    return {
        type: SET_SEARCH,
        search
    }
}

function getFeed() {
    return (dispatch, getState) => {
        const { user : { token }} = getState();
        fetch(`${API_URL}/images/`,{
            headers: {
                Authorization: `JWT ${token}`
            }
        })
        .then(response => {
            if(response.status === 401) {
                dispatch(userAction.logOut());
            } else {
                return response.json();
            }
        })
        .then(json => {
            dispatch(setFeed(json));
        })
    }
}


function getSearch() {
    return (dispatch, getState) => {
        const { user : { token }} = getState();
        fetch(`${API_URL}/images/search/`,{
            headers: {
                Authorization: `JWT ${token}`
            }
        })
            .then(response => {
                if(response.status === 401) {
                    dispatch(userAction.logOut());
                } else {
                    return response.json();
                }
            })
            .then(json => {
                dispatch(setSearch(json));
            })
    }
}

function searchByHashtag(hashtag) {
    return (dispatch, getState) => {
        const { user : { token }} = getState();
        fetch(`${API_URL}/images/search/?hashtags=${hashtag}`,{
            headers: {
                Authorization: `JWT ${token}`
            }
        })
            .then(response => {
                if(response.status === 401) {
                    dispatch(userAction.logOut());
                } else {
                    return response.json();
                }
            })
            .then(json => {
                dispatch(setSearch(json));
            })
    }
}



function likePhoto(photoId) {
    return (dispatch, getState) => {
        const { user : { token }} = getState();
        return fetch(`${API_URL}/images/${photoId}/likes/`,{
            method: "POST",
            headers: {
                Authorization: `JWT ${token}`
            }
        })
            .then(response => {
                if(response.status === 401) {
                    dispatch(userAction.logOut());
                } else if(response.ok){
                    return true;
                } else {
                    return false;
                }
            })
    }
}

function unlikePhoto(photoId) {
    return (dispatch, getState) => {
        const { user : { token }} = getState();
        return fetch(`${API_URL}/images/${photoId}/unlikes/`,{
            method: "DELETE",
            headers: {
                Authorization: `JWT ${token}`
            }
        })
            .then(response => {
                if(response.status === 401) {
                    dispatch(userAction.logOut());
                } else if(response.ok){
                    return true;
                } else {
                    return false;
                }
            })
    }
}


function uploadPhoto(file, caption, loaction, tags) {

    const tagsArray = tags.splice(",");
    const data = new FormData();
    data.append("caption",caption);
    data.append("location",loaction);
    data.append("tags",JSON.stringify(tagsArray));
    data.append("file",{
        uri: file,
        type:"image/jpg",
        name: `${uuidv1()}.jpg`
    });
    return (dispatch, getstate) => {
        const { user : { token }} = getState();
        return fetch(`${API_URL}/image/`,{
            method:"POST",
            headers: {
                Authorization: `JWT ${token}`,
                "Content-Type": "multipart/form-data"
            },
            body: data
        })
            .then(response => {
                if(response.status === 401) {
                    dispatch(userAction.logOut());
                } else if(response.ok){
                    return true;
                } else {
                    return false;
                }
            })
    }
}


const initialState = {

};



function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_FEED:
            return applySetFeed(state,action);
        case SET_SEARCH:
            return applySetSearch(state,action);
        default:
            return state;
    }
}



function applySetFeed(state, action) {
    const { feed } = action;
    return {
        ...state,
        feed
    };
}

function applySetSearch(state, action) {
    const { search } = action;
    return {
        ...state,
        search
    };
}

const actionCreators = {
    getFeed,
    getSearch,
    likePhoto,
    unlikePhoto,
    searchByHashtag,
    uploadPhoto
};


export { actionCreators };



export default reducer;