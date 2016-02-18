import makeStore from './src/store';
import startServer from './src/server';

export const store = makeStore();
startServer(store);

// set initial data
store.dispatch({
  type: 'SET_ENTRIES',
  entries: require('./entries.json')
});
// push into the voting stage
store.dispatch({type: 'NEXT'});