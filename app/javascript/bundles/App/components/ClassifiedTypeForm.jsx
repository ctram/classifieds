import PropTypes from "prop-types";
import React from "react";

import GroupOfAttributes from './GroupOfAttributes';

class ClassifiedTypeForm extends React.Component {
  constructor(props) {
    super(props);

    const { classifiedType: { name, attributes } } = props;

    this.state = { name, attributes };

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeAttribute = this.handleChangeAttribute.bind(this);
    this.handleAddAttribute = this.handleAddAttribute.bind(this);
    this.handleRemoveAttribute = this.handleRemoveAttribute.bind(this);
  }

  handleRemoveAttribute(attributeId) {
    let { attributes } = this.state;

    attributes = attributes.filter((attribute) => {
      return attribute.id !== attributeId;
    });

    this.setState({ attributes });
  }

  handleChangeAttribute(attribute) {
    let { attributes } = this.state;
    const { name, dataType, id } = attribute;
    
    attributes = attributes.map((_attribute) => {
      if (_attribute.id === id) {
        return { ..._attribute, name, dataType };
      }

      return _attribute;
    });

    this.setState({ attributes });
  }

  handleAddAttribute() {
    const { attributes } = this.state;

    attributes.push({ name: '', dataType: 'text', id: Math.random() });

    this.setState({ attributes });
  }

  handleChangeName(e) {
    this.setState({ name: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { onSave } = this.props;
    const { name, attributes, id } = this.state;

    onSave({ name, attributes, id });
  }

  render() {
    const { name, attributes } = this.state;
    const { classifiedType: { id } } = this.props;

    const idInputName = `${id}-input-name`;

    return (
      <div className="classified-type-form">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor={idInputName}>
              Name
            </label>
            <input
              value={name}
              onChange={this.handleChangeName}
              id={idInputName}
              className="form-control"
              type="text"
              required
            />
          </div>
          <div className="my-3">
            <GroupOfAttributes
              classifiedTypeId={id}
              attributes={attributes}
              onChangeAttribute={this.handleChangeAttribute}
              onAddAttribute={this.handleAddAttribute}
              onRemoveAttribute={this.handleRemoveAttribute}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </form>
      </div>
    );
  }
}

ClassifiedTypeForm.defaultProps = {
  classifiedType: {
    name: '', dataType: 'text', attributes: [], id: 'new-classified-type',
  },
  removable: false
};

export default ClassifiedTypeForm;
