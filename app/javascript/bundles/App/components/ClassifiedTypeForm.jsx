// import PropTypes from 'prop-types';
import React from "react";

import AttributeField from "./AttributeField";

const defaultAttribute = { type: "text", value: "Name", disabled: true };

export default class ClassifiedTypeForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      attributes: [defaultAttribute],
    };

    this.addAttributeToDOM = this.addAttributeToDOM.bind(this);
    this.onRemoveAttribute = this.onRemoveAttribute.bind(this);
    this.onChangeAttribute = this.onChangeAttribute.bind(this);
  }

  addAttributeToDOM() {
    const { attributes } = this.state;

    attributes.push({ value: "", disabled: false, type: "text" });

    this.setState({ attributes });
  }

  onChangeAttribute(id, data) {
    const { attributes } = this.state;

    attributes.some((attribute, idx) => {
      if (idx === id) {
        attribute = Object.assign(attribute, data);
        return true;
      }
    });

    this.setState({ attributes });
  }

  onRemoveAttribute(id) {
    let { attributes } = this.state;

    attributes = attributes.filter((attribute, idx) => idx !== id);

    this.setState({ attributes });
  }

  render() {
    const { attributes } = this.state;

    let domAttributes = null;

    if (attributes.length !== 0) {
      domAttributes = attributes.map((attribute, idx) => {
        const { type, value, disabled } = attribute;

        let dom;

        const domAttributeField = (
          <AttributeField
            onRemove={this.onRemoveAttribute}
            onChange={this.onChangeAttribute}
            type={type}
            value={value}
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
        <form>
          <div className="form-group">
            <label htmlFor="classified-model-type">Type</label>
            <input
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
          <button type="submit" className="btn btn-primary">
            Add Classified Type
          </button>
        </form>
      </div>
    );
  }
}
