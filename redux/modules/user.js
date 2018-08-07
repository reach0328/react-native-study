//Imports
import { API_URL, FB_APP_ID } from "../../constant";
import { AsyncStorage } from "react-native"
import { Facebook } from "expo";


//Actions

const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
const SET_USER = "SET_USER";
const SET_NOTIFICATIONS = "SET_NOTIFICATIONS";
// Action creator

function setLogIn(token) {
    return {
        type: LOG_IN,
        token
    }
}

function logOut() {
    return {
        type: LOG_OUT
    }
}

function setUser(user) {
    return {
        type: SET_USER,
        user
    }
}

function setNotification(notifications) {
    return {
        type: SET_NOTIFICATIONS,
        notifications
    }
}


// api actions
function login(username, password) {
  return dispatch => {
      return fetch(`${API_URL}/rest-auth/login/`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
              username,
              password
          })
      })
          .then(response => response.json())
          .then(json => {
              if(json.user && json.token) {
                  dispatch(setLogIn(json.token));
                  dispatch(setUser(json.user));
                  return true;
              } else {
                  return false;
              }
          });
  };
}

function facebookLogin() {
    return async dispatch => {
        const { type, token } = await Facebook.logInWithReadPermissionsAsync(
            FB_APP_ID,
            {
                permissions: ["public_profile","email"]
            }
        );
        if(type === "success") {
            fetch(`${API_URL}/users/login/facebook/`,{
                method:"POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    access_token: token
                })
            })
                .then(response => response.json())
                .then(json => {
                    if(json.user && json.token) {
                        dispatch(setLogIn(json.token));
                        dispatch(setUser(json.user));
                        return true;
                    } else {
                        return false;
                    }
                });
        }
    };

}

function getNotifications() {
    return (dispatch, getState) => {
        const { user : { token }} = getState();
        fetch(`${API_URL}/notifications/`,{
            headers: {
                Authorization: `JWT ${token}`
            }
        })
            .then(response => {
                if(response.status === 401) {
                    dispatch(logOut());
                } else {
                    return response.json();
                }
            })
            .then(json => {
                dispatch(setNotification(json));
            })
    }
}


function getOwnProfile() {
    return (dispatch, getState) => {
        const { user : { token,profile: { username } }} = getState();
        fetch(`${API_URL}/users/${username}/`,{
            headers: {
                Authorization: `JWT ${token}`
            }
        })
            .then(response => {
                if(response.status === 401) {
                    dispatch(logOut());
                } else {
                    return response.json();
                }
            })
            .then(json => {
                dispatch(setUser(json));
            })
    }
}

// initilal state
const initialState = {
    isLoggedIn: false
};


// reducer



function reducer(state = initialState, action) {
    switch (action.type) {
        case LOG_IN:
            return applyLogin(state,action);
        case LOG_OUT:
            return applyLogOut(state,action);
        case SET_USER:
            return applySetUser(state,action);
        case SET_NOTIFICATIONS:
            return applySetNofications(state,action);
        default:
            return state;
    }
}

// reducer functions
function applyLogin(state,action) {
    const { token } = action;
    return {
        ...state,
        isLoggedIn: true,
        token
    }
}

function applyLogOut(state,action) {
    AsyncStorage.clear();
    return {
        ...state,
        isLoggedIn:false,
        token: ""
    }
}

function applySetUser(state,action) {
    const { user } = action;
    return {
        ...state,
        profile: user
    }
}

function applySetNofications(state, action) {
    const { notifications } = action;
    return {
        ...state,
        notifications
    }
}


// export

const actionCreators = {
    login,
    facebookLogin,
    logOut,
    getNotifications,
    getOwnProfile
};

export { actionCreators };

//default reducer export

export default reducer