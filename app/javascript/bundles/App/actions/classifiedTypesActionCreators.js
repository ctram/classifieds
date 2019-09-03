import fetchPlus from "../../../helpers/fetch-plus";
import { startSpinner, endSpinner } from "./spinnersActionCreators";
import { setCurrentAlert } from "./alertsActionCreators";
import { translateResponseMessage } from "../../../helpers/response-helper";

import { SET_CLASSIFIED_TYPES } from "../constants/constants";

export function setClassifiedTypes(classifiedTypes) {


  return { type: SET_CLASSIFIED_TYPES, classifiedTypes };
}

export function fetchClassifiedTypes() {
  return (dispatch) => {
    dispatch(startSpinner());

    return fetchPlus(`${SERVER_DOMAIN}/classified_types`, {
      method: "GET",
    })
      .then(({ json, res }) => {

        debugger
        const { errors } = json;
        const message = translateResponseMessage(json.message);

        if (res.status === 200) {
          return dispatch(setClassifiedTypes(json.classified_types));
        }

        if (errors) {
          throw errors;
        }

        throw message;
      })
      .catch((e) => {
        debugger

        dispatch(setCurrentAlert("danger", e));
        console.error(e);
      })
      .finally(() => {
        dispatch(endSpinner());
      });
  };
}
