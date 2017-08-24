import * as Types from '../actions-types/Types';

export function reducer(state = {count: 0}, action) {
  switch (action.type) {
    case Types.ADD:
      return {count: state.count + action.data};
      break;
    case Types.DECREASE:
      return {count: state.count + action.data}
      break;
    default:
      return state;
      break;
  }
}