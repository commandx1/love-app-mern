const TYPES = {
    UPDATE_USER: 'UPDATE_USER',
    UPDATE_PLAYING: 'UPDATE_PLAYING',
    STOP_PLAYING: 'STOP_PLAYING',
    UPDATE_CUSTOMER_DB: 'UPDATE_CUSTOMER_DB',
};

const appReducer = (state, action) => {
    switch (action.type) {
        case TYPES.UPDATE_USER:
            return { ...state, user: action.payload };
        case TYPES.UPDATE_CUSTOMER_DB:
            return { ...state, customerDb: action.payload };
        case TYPES.UPDATE_PLAYING:
            if (action.payload) {
                state.mp3.play();
            } else {
                state.mp3.pause();
            }

            return { ...state, isMusicPlaying: action.payload };

        default:
            return state;
    }
};

export { TYPES, appReducer };
