import PropTypes from "prop-types";
import React from "react";

class AttributeField extends React.Component {
  constructor(props) {
    super(props);

    const { type, name, disabled } = props;

    this.state = {
      type: type || "text",
      name: name || "",
      disabled: disabled === true,
    };

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeSelect = this.onChangeSelect.bind(this);
    this.remove = this.remove.bind(this);
  }

  componentDidUpdate(prevProps) {
    const {
      type: prevType,
      name: prevName,
      disabled: prevDisabled,
    } = prevProps;
    const { type, name, disabled } = this.props;

    if (prevType !== type || prevName !== name || prevDisabled !== disabled) {
      this.setState({ type, name, disabled });
    }
  }

  onChangeName(e) {
    const { onChange, id } = this.props;

    onChange(id, { name: e.target.value });
  }

  onChangeSelect(e) {
    const { onChange, id } = this.props;

    onChange(id, { type: e.target.value });
  }

  remove(e) {
    const { onRemove, id } = this.props;

    onRemove(id);
  }

  render() {
    const { type, name, disabled } = this.state;

    const { id } = this.props;

    const domId = `attribute-field-${id}`;

    return (
      <div className="attribute-field">
        {!disabled && (
          <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={this.remove}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        )}
        <h4>Attribute</h4>
        <div className="form-group">
          <label htmlFor="attribute-name">Name</label>
          <input
            value={name}
            onChange={this.onChangeName}
            className="form-control"
            placeholder="Height"
            disabled={disabled}
            id="attribute-name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor={domId}>Type</label>
          <select
            value={type}
            onChange={this.onChangeSelect}
            className="form-control"
            id={domId}
            disabled={disabled}
          >
            <option value="text">Text</option>
            <option value="number">Number</option>
          </select>
        </div>
      </div>
    );
  }
}

AttributeField.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

export default AttributeField;
