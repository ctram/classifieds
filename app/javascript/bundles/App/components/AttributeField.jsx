import PropTypes from "prop-types";
import React from "react";

class AttributeField extends React.Component {
  constructor(props) {
    super(props);

    let { type, value, disabled } = props;

    this.state = {
      type: type || "text",
      value: value || "",
      disabled: disabled === true ? true : false
    };

    this.updateValue = this.updateValue.bind(this);
    this.remove = this.remove.bind(this);
  }

  componentDidUpdate(prevProps) {
    const {
      type: prevType,
      value: prevValue,
      disabled: prevDisabled
    } = prevProps;
    const { type, value, disabled } = this.props;

    if (prevType !== type || prevValue !== value || prevDisabled !== disabled) {
      this.setState({ type, value, disabled });
    }
  }

  updateValue(e) {
    const { onChange, id } = this.props;

    onChange(id, { value: e.target.value });
  }

  remove(e) {
    const { onRemove, id } = this.props;

    onRemove(id);
  }

  onChangeSelect(e) {
    const { onChange, id } = this.props;

    onChange(id, { type: e.target.value });
  }

  render() {
    const { type, value, disabled } = this.state;

    const { id } = this.props;

    let domField = null;

    switch (type) {
      case "text":
        domField = (
          <input
            value={value}
            onChange={this.updateValue}
            className="form-control"
            placeholder="Height"
            disabled={disabled}
            required
          />
        );
      default:
        null;
    }

    const domId = `attribute-field-${id}`;

    return (
      <div>
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
        <div className="form-group">
          <label htmlFor={domId}>Attribute Type</label>
          <select
            value={type}
            onChange={this.onChangeSelect}
            className="form-control"
            id={domId}
            disabled={disabled}
          >
            <option value="text">Text</option>
          </select>
        </div>
        <div className="form-group">{domField}</div>
      </div>
    );
  }
}

AttributeField.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired
};

AttributeField.defaultValues = {
  type: "text",
  value: "",
  disabled: false
};

export default AttributeField;
