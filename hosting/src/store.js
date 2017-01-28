import {Map} from 'immutable';
import {createStore} from 'redux';
import reducers from './reducers/index';

export default createStore(reducers, Map());