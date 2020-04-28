let defaultState = {
    user: {}
}

const mainReducer = (state = defaultState, action) => {
    if (action.type === "USER_LOGIN") {
        return {
            ...state,
            user: action.user
        }
    } else {
        return {
            ...state
        }
    }
}

export default mainReducer;
