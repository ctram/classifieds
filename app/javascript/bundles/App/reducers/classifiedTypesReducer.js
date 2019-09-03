import { SET_CLASSIFIED_TYPES } from '../constants/constants';

export default (state = { classifiedTypes: [] }, action) => {


  switch (action.type) {
    case SET_CLASSIFIED_TYPES:
      return { ...state, classifiedTypes: action.classifiedTypes };
    default:
      return state;
  }
};
