import {configureStore} from '@reduxjs/toolkit'

import cartReducer from './cartRedux'
import userReducer from './userRedux'

export default configureStore({
    reducer: {
        cart: cartReducer,
        user: userReducer
    }
})


// import { createStore } from '@reduxjs/toolkit'
// import { persistStore, persistReducer } from 'reduxjs-toolkit-persist'
// import storage from 'reduxjs-toolkit-persist/lib/storage' // defaults to localStorage for web

// import rootReducer from './reducers'

// const persistConfig = {
//   key: 'root',
//   storage,
// }

// const persistedReducer = persistReducer(persistConfig, rootReducer)

// export default () => {
//   let store = createStore(persistedReducer)
//   let persistor = persistStore(store)
//   return { store, persistor }
// }