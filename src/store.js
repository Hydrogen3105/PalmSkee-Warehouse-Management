import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { loadState, saveState } from './localStorage'

const middleware = [thunk];
const persistStore = loadState()

const store = createStore(
  rootReducer,
  persistStore,
  composeWithDevTools(applyMiddleware(...middleware))
);

store.subscribe(() => {
  saveState(store.getState())
})

export default store