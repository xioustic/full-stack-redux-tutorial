import {setEntries, next, vote, INITIAL_STATE} from './core';

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_ENTRIES':
      return setEntries(state, action.entries);
    case 'NEXT':
      return next(state);
    case 'VOTE':
      // update the 'vote' portion of state
      // using the vote function only passed the voteState portion
      return state.update('vote',
                          voteState => vote(voteState, action.entry));
  }
  return state;
}