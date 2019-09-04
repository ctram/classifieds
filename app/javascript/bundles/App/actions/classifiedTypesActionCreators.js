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
        dispatch(setCurrentAlert("danger", e));
        console.error(e);
      })
      .finally(() => {
        dispatch(endSpinner());
      });
  };
}

export function createClassifiedType(classifiedType) {
  return (dispatch) => {
    dispatch(startSpinner());

    let { attributes } = classifiedType;

    attributes = attributes.map((attr) => {
      const { name, type } = attr;
      return { name, data_type: type };
    });

    return fetchPlus(`${SERVER_DOMAIN}/classified_types`, {
      method: "POST",
      body: JSON.stringify({ classified_type: { ...classifiedType, attributes } }),
    })
      .then(({ json, res }) => {
        const { errors } = json;
        const message = translateResponseMessage(json.message);

        if (res.status === 200) {
          return dispatch(fetchClassifiedTypes());
        }

        if (errors) {
          throw errors;
        }

        throw message;
      })
      .catch((e) => {
        dispatch(setCurrentAlert("danger", e));
        console.error(e);
      })
      .finally(() => {
        dispatch(endSpinner());
      });
  };
}
