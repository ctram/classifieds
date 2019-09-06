import PropTypes from "prop-types";
import React from "react";

import AttributeField from "./AttributeField";

import { createClassifiedType } from "../actions/classifiedTypesActionCreators";

const defaultAttribute = { type: "text", name: "Name", disabled: true };

class ClassifiedTypeForm extends React.Component {
  constructor(props) {
    super(props);

    const { name, attributes } = props;

    this.state = {
      attributes, name, errorMsg: '', canDelete: false,
    };

    this.addAttributeToDOM = this.addAttributeToDOM.bind(this);
    this.onRemoveAttribute = this.onRemoveAttribute.bind(this);
    this.onChangeAttribute = this.onChangeAttribute.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.delete = this.delete.bind(this);
  }

  onChangeAttribute(id, data) {
    let { attributes } = this.state;

    attributes = attributes.map((attribute, idx) => {
      if (idx === id) {
        return { ...attribute, ...data };
      }

      return attribute;
    });

    this.setState({ attributes });
  }

  onRemoveAttribute(id) {
    let { attributes } = this.state;

    attributes = attributes.filter((attribute, idx) => idx !== id);

    this.setState({ attributes });
  }

  onChangeName(e) {
    this.setState({ name: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const { dispatch } = this.props;
    const { name, attributes } = this.state;

    const classifiedType = { name, attributes };

    this.setState({ errorMsg: '' });

    dispatch(createClassifiedType(classifiedType))
      .then(() => {
        this.setState({ name: '', attributes: [defaultAttribute] });
      })
      .catch((error) => {
        this.setState({ errorMsg: error });
        console.error(error);
      });
  }

  addAttributeToDOM() {
    const { attributes } = this.state;

    attributes.push({ name: "", disabled: false, type: "text" });

    this.setState({ attributes });
  }

  delete(e) {
    const { id, onRemove } = this.props;

    if (window.confirm("Are you sure you want to remove this Classified Type?")) {
      onRemove(id);
    }
  }

  render() {
    const {
      attributes, name, errorMsg, canDelete,
    } = this.state;

    let domAttributes = null;

    if (attributes.length !== 0) {
      domAttributes = attributes.map((attribute, idx) => {
        const { type, name: attributeName, disabled } = attribute;

        const domAttributeField = (
          <AttributeField
            onRemove={this.onRemoveAttribute}
            onChange={this.onChangeAttribute}
            type={type}
            name={attributeName}
            disabled={disabled}
            id={idx}
          />
        );

        let inner = domAttributeField;

        if (idx !== 0) {
          inner = (
            <div>
              <hr className="my-5"/>
              {domAttributeField}
            </div>
          );
        }

        return (
          <div className="my-3" key={idx}>
            {inner}
          </div>
        );
      });
    }

    return (
      <div className="classified-type-form">
        {
          canDelete
          && (
          <button onClick={this.delete} type="button" className="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          )
        }

        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="classified-model-type">Type</label>
            <input
              value={name}
              onChange={this.onChangeName}
              className="form-control"
              id="classified-model-type"
              placeholder="Cat"
              required
            />
          </div>
          {domAttributes && (
            <div>
              <hr className="my-5" />
              {domAttributes}
            </div>
          )}
          {
            errorMsg && (
              <div className="d-flex justify-content-center">
                <div className="alert alert-danger text-center" role="alert">
                  {errorMsg}
                </div>
              </div>
            )
          }
          <hr className="my-5" />
          <div className="d-flex flex-column align-items-start">
            <button
              onClick={this.addAttributeToDOM}
              type="button"
              className="btn btn-secondary btn-sm mb-3"
            >
              Add Attribute
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              Save
            </button>
          </div>

        </form>
      </div>
    );
  }
}

ClassifiedTypeForm.propTypes = {
  name: PropTypes.string,
  attributes: PropTypes.instanceOf(Array),
  dispatch: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

ClassifiedTypeForm.defaultProps = {
  name: "",
  attributes: [defaultAttribute],
};

export default ClassifiedTypeForm;
