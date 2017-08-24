import * as Types from '../actions-types/Types';

export function actions(data) {   // {type, count}
  switch (data.type) {
    case Types.ADD:
      return {
        type: Types.ADD,
        data: data.data
      }
      break;
    case Types.DECREASE:
      return {
        type: Types.DECREASE,
        data: data.data
      }
      break;
  }
}