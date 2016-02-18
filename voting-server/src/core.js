import {List,Map} from 'immutable';

export const INITIAL_STATE = Map();

function getWinners(vote) {
  // if vote state does not exist, no winner(s)
  if (!vote) return [];
  const [a,b] = vote.get('pair');
  const aVotes = vote.getIn(['tally', a], 0);
  const bVotes = vote.getIn(['tally', b], 0);
  if    (aVotes > bVotes) return [a];
  if    (bVotes > aVotes) return [b];
  // if tie, return both
  else                    return [a,b];
}

export function setEntries(state, entries) {
  return state.set('entries', List(entries));
}

export function next(state) {
  // get the entries from state and try to determine the winner
  // from the vote state (which may or may not exist)
  const entries = state.get('entries')
                       .concat(getWinners(state.get('vote')));

  // if only one entry remains, it must be the winner
  if (entries.size === 1) {
    return state.remove('vote')
                .remove('entries')
                .set('winner', entries.first());
  } else {
    // pluck a pair of entries for voting and remove them from the
    // state's entries
    return state.merge({
      vote: Map({pair: entries.take(2)}),
      entries: entries.skip(2)
    });
  }
}

export function vote(state, entry) {
  // reach into the nested data structure path ['vote', 'tally', entry]
  // apply this function there
  // if any keys missing along the path, create new maps in their place
  // if the value at the end is missing, initialize with 0 before applying function
  return state.updateIn(
    ['vote','tally', entry],
    0,
    v => v + 1
  )
}