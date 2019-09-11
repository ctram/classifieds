import fetchPlus from "../../../helpers/fetch-plus";
import { startSpinner, endSpinner } from "./spinnersActionCreators";
import { setCurrentAlert } from "./alertsActionCreators";
import { translateResponseMessage } from "../../../helpers/response-helper";

import { SET_CLASSIFIED_TYPES, SET_NEW_CLASSIFIED_TYPE_DATA } from "../constants/constants";

export function setNewClassifiedTypeData(newClassifiedType) {
  return { type: SET_NEW_CLASSIFIED_TYPE_DATA, newClassifiedType };
}

export function setClassifiedTypes(classifiedTypes) {
  return { type: SET_CLASSIFIED_TYPES, classifiedTypes };
}

export function fetchClassifiedTypes() {
  return (dispatch) => {
    dispatch(startSpinner());

    return fetchPlus(`${SERVER_DOMAIN}/api/v1/classified_types`, {
      method: "GET",
    })
      .then(({ json, res }) => {
        const { error, message } = json;

        if (res.status === 200) {
          return dispatch(setClassifiedTypes(json.classified_types));
        }

        if (error) {
          throw error;
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
      const { name, dataType } = attr;
      return { name, data_type: dataType };
    });

    return fetchPlus(`${SERVER_DOMAIN}/api/v1/classified_types`, {
      method: "POST",
      body: JSON.stringify({ classified_type: { ...classifiedType, attributes } }),
    })
      .then(({ json, res }) => {
        const { error, detail } = json;

        const message = translateResponseMessage(error);

        if (res.status === 201) {
          return dispatch(fetchClassifiedTypes());
        }

        if (error) {
          throw error;
        }

        throw message;
      })
      .catch(e => {

      })
      .finally(() => {
        dispatch(endSpinner());
      });
  };
}
