/*
export default store => next => action => {
  
}

is a concise way of expressing

export default function(store) {
  return function(next) {
    return function (action) {
      
    }
  }
}

ie a concise method to nest single-function arguments, aka currying
*/

export default socket => store => next => action => {
  if (action.meta && action.meta.remote) {
    socket.emit('action', action);
  }
  return next(action);
}