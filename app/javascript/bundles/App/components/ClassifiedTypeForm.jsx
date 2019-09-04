import PropTypes from "prop-types";
import React from "react";

import AttributeField from "./AttributeField";

import { createClassifiedType } from "../actions/classifiedTypesActionCreators";

const defaultAttribute = { type: "text", name: "Name", disabled: true };

class ClassifiedTypeForm extends React.Component {
  constructor(props) {
    super(props);

    const { name, attributes } = props;

    this.state = { attributes, name, errorMsg: '' };

    this.addAttributeToDOM = this.addAttributeToDOM.bind(this);
    this.onRemoveAttribute = this.onRemoveAttribute.bind(this);
    this.onChangeAttribute = this.onChangeAttribute.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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

  render() {
    const { attributes, name, errorMsg } = this.state;

    let domAttributes = null;

    if (attributes.length !== 0) {
      domAttributes = attributes.map((attribute, idx) => {
        const { type, name: attributeName, disabled } = attribute;

        let dom;

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

        if (idx === 0) {
          dom = (
            <div key={idx}>
              <small className="form-text text-muted">
                The "Name" attribute is set by default and cannot be changed or
                removed.
              </small>
              {domAttributeField}
            </div>
          );
        } else {
          dom = (
            <div key={idx}>
              <hr />
              {domAttributeField}
            </div>
          );
        }

        return dom;
      });
    }

    return (
      <div>
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
          <div className="my-5">
            {domAttributes && (
              <div className="mb-3">
                <hr />
                {domAttributes}
              </div>
            )}
            <button
              onClick={this.addAttributeToDOM}
              type="button"
              className="btn btn-secondary btn-sm"
            >
              Add Attribute
            </button>
          </div>
          {
            errorMsg && (
              <div className="d-flex justify-content-center">
                <div className="alert alert-danger text-center" role="alert">
                  {errorMsg}
                </div>
              </div>
            )
          }
          <button
            type="submit"
            className="btn btn-primary"
          >
            Add Classified Type
          </button>
        </form>
      </div>
    );
  }
}

ClassifiedTypeForm.propTypes = {
  name: PropTypes.string,
  attributes: PropTypes.instanceOf(Array),
  dispatch: PropTypes.func.isRequired,
};

ClassifiedTypeForm.defaultProps = {
  name: "",
  attributes: [defaultAttribute],
};

export default ClassifiedTypeForm;
