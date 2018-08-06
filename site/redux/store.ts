import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
// import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducer';

const middleware = compose(applyMiddleware(promise(), thunk));
const store = createStore(rootReducer, middleware);

export default store
