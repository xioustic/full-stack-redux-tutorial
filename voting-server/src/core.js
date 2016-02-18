import {List,Map} from 'immutable';

function getWinners(vote) {
  if (!vote) return [];
  const [a,b] = vote.get('pair');
  const aVotes = vote.getIn(['tally', a], 0);
  const bVotes = vote.getIn(['tally', b], 0);
  if    (aVotes > bVotes) return [a];
  if    (bVotes > aVotes) return [b];
  else                    return [a,b];
}

export function setEntries(state, entries) {
  return state.set('entries', List(entries));
}

export function next(state) {
  const entries = state.get('entries')
                       .concat(getWinners(state.get('vote')));
  return state.merge({
    vote: Map({pair: entries.take(2)}),
    entries: entries.skip(2)
  });
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