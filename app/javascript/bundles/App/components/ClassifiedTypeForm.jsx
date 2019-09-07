import PropTypes from "prop-types";
import React from "react";

import GroupOfAttributes from './GroupOfAttributes';

import { createClassifiedType } from "../actions/classifiedTypesActionCreators";

const defaultAttribute = { type: "text", name: "Name", disabled: true };

class ClassifiedTypeForm extends React.Component {
  constructor(props) {
    super(props);

    const { classifiedType: { name, attributes }, canDelete } = props;

    this.state = {
      attributes, name, errorMsg: '', canDelete,
    };

    this.onRemoveAttribute = this.onRemoveAttribute.bind(this);
    this.onChangeAttribute = this.onChangeAttribute.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.delete = this.delete.bind(this);
    this.onAddNewAttribute = this.onAddNewAttribute.bind(this);
  }

  onChangeAttribute(id, data) {
    let { attributes } = this.state;

    attributes = attributes.map((attribute) => {
      if (id === attribute.id) {
        return { ...attribute, ...data };
      }

      return attribute;
    });

    this.setState({ attributes });
  }

  onRemoveAttribute(id) {
    let { attributes } = this.state;

    attributes = attributes.filter((attribute, _id) => _id !== id);

    this.setState({ attributes });
  }

  onChangeName(e) {
    this.setState({ name: e.target.value });
  }

  onAddNewAttribute() {
    let { attributes } = this.state;

    attributes.push({ name: '', type: 'text', id: Math.random() });

    this.setState({ attributes });
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

    const { id } = this.props;

    return (
      <div className="classified-type-form">
        {
          canDelete && (
            <button onClick={this.delete} type="button" className="close" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          )
        }
        <h4 className="my-3">Add a New Type</h4>
        <form>
          <div className="form-group">
            <label htmlFor={`${id}-input-name`}>
              Name
            </label>
            <input onChange={this.onChangeName} id={`${id}-input-name`} className="form-control" type="text" value={name} />
          </div>
          <h5 className="mb-2">Attributes</h5>
          <GroupOfAttributes
            attributes={attributes}
            onAddNewAttribute={this.onAddNewAttribute}
            onRemoveAttribute={this.onRemoveAttribute}
            onChangeAttribute={this.onChangeAttribute} />
        </form>
      </div>
    );
  }
}

ClassifiedTypeForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  classifiedType: PropTypes.shape({
    name: PropTypes.string.isRequired,
    attributes: PropTypes.instanceOf(Array),
  }).isRequired,
  canDelete: PropTypes.bool,
};

ClassifiedTypeForm.defaultProps = {
  canDelete: false,
};

export default ClassifiedTypeForm;
