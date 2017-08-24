import React, {Component} from 'react';
import {createStore, applyMiddleware} from '../store/store';
import {reducer} from '../reducers/reducer';
import * as Types from '../actions-types/Types';
import {actions} from '../actions/action';

let logger = store => next => action => {
  /*logger*/
  // console.log('before', store.getState());
  // next(action);
  // console.log('after', store.getState());

  /*thunk*/
  // if (typeof action === 'function') {
  //   return action(next);
  // }
  // return next(action);

  /*promise*/
  let isPromise = obj => obj.then;
  if (isPromise(action)) {
    action.then((r) => next(r));
    return;
  }
  next(action);
}

// let log = function (store) {
//   return function (next) {
//     return function (action) {
//     }
//   }
// }

let store = applyMiddleware(logger)(createStore)(reducer);

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      num: 0
    }
  }
  componentWillMount() {
    this.unSubscribe = store.subscribe(() => {
      this.setState({
        num: store.getState().count
      })
    })
  }
  componentWillUnMount() { //将要卸载
    this.unSubscribe();
  }
  add = () => {
    // store.dispatch(function (dispatch) {
    //   setTimeout(function () {
    //     dispatch(actions({type: 'add', data: 3}));
    //   }, 300);
    // });

    store.dispatch(new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve(actions({type: 'add', data: 3}));
      }, 300)
    }))
  }
  sub = () => {
    store.dispatch(actions({type: 'decrease', data: -2}));
  }
  render() {
    return (
      <div>
        <p>{this.state.num}</p>
        <button onClick={this.add}>+</button>
        <button onClick={this.sub}>-</button>
      </div>
    )
  }
};