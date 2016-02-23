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

export default store => next => action => {
  console.log('in middleware', action);
  return next(action);
}