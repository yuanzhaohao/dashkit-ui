import { ActionEntity } from '../action';

const initialState = {
  isLoading: false,
  isEnough: false,
  listData: []
}

export default function(state = initialState, action: ActionEntity) {
  switch (action.type) {
    case 'LIST_DATA': {
      return state;
    }

    default:
      return state
  }
}
