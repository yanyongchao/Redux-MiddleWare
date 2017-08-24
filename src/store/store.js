const createStore = (reducer) => {
  let state;
  let getState = () => state;
  let listeners = [];
  let dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(l => {
      l();
    });
  }
  let subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(_ => {
        _ !== listener;
      });
    }
  }
  return {
    getState,
    subscribe,
    dispatch
  }
}

let applyMiddleware = (middleware) => {
  return createStore => reducer => {
    let store = createStore(reducer);
    middleware = middleware(store);
    let dispatch = middleware(store.dispatch);
    return {
      ...store, dispatch
    };
  }
};

export {createStore, applyMiddleware};