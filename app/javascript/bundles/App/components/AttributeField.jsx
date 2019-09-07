import PropTypes from "prop-types";
import React from "react";

class AttributeField extends React.Component {
  constructor(props) {
    super(props);

    const { attribute: { name, dataType } } = props;

    this.state = { name, dataType };

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeSelect = this.handleChangeSelect.bind(this);
    this.handleClickRemove = this.handleClickRemove.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { attribute } = this.props;

    if (prevProps.attribute !== attribute) {
      this.setState({ ...attribute });
    }
  }

  handleChangeName(e) {
    const { onChange, attribute } = this.props;

    onChange({ ...attribute, name: e.target.value });
  }

  handleChangeSelect(e) {
    const { onChange, attribute } = this.props;

    onChange({ ...attribute, dataType: e.target.value });
  }

  handleClickRemove() {
    const { onRemoveAttribute, attribute: { id } } = this.props;

    onRemoveAttribute(id);
  }

  render() {
    const { id } = this.props;
    const { name, dataType } = this.state;

    const domNameId = `${id}-name`;
    const domDataTypeId = `${id}-data-type`;

    return (
      <div className="my-3">
        <h5>Attribute</h5>
        <button onClick={this.handleClickRemove} type="button" className="close" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        <div className="form-group">
          <label htmlFor={domNameId}>
            Name
          </label>
          <input
            value={name}
            onChange={this.handleChangeName}
            id={domNameId}
            type="text"
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor={domDataTypeId}>
            Data Type
          </label>
          <select onChange={this.handleChangeSelect} value={dataType} id={domDataTypeId} className="form-control">
            <option value="text">
              Text
            </option>
            <option value="numeric">
              Numeric
            </option>
          </select>
        </div>
      </div>
    );
  }
}

export default AttributeField;
