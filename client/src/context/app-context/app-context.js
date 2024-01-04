import { createContext, useContext, useReducer } from 'react';
import { TYPES, appReducer } from './app-reducer';

export const AppContext = createContext();

const initialState = { user: null, mp3: new Audio('../../bgmusic.mp3'), isMusicPlaying: false, customerDb: null };
initialState.mp3.loop = true;

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, initialState);

    const updateUser = user => dispatch({ type: TYPES.UPDATE_USER, payload: user });
    const updateCustomerDb = dbName => {
        dispatch({ type: TYPES.UPDATE_CUSTOMER_DB, payload: dbName });

        if (dbName) {
            localStorage.setItem('db_name', dbName);
        } else {
            localStorage.removeItem('db_name');
        }
    };
    const playMusic = () => dispatch({ type: TYPES.UPDATE_PLAYING, payload: true });
    const pauseMusic = () => dispatch({ type: TYPES.UPDATE_PLAYING, payload: false });

    return (
        <AppContext.Provider
            value={{
                ...state,
                updateUser,
                playMusic,
                pauseMusic,
                updateCustomerDb,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
export const useAppContext = () => useContext(AppContext);

export default AppProvider;
