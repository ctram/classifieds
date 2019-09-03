import PropTypes from "prop-types";
import React from "react";

class AttributeField extends React.Component {
  constructor(props) {
    super(props);

    const { type, value, disabled } = props;

    this.state = {
      type: type || "text",
      value: value || "",
      disabled: disabled === true,
    };

    this.onChangeValue = this.onChangeValue.bind(this);
    this.onChangeSelect = this.onChangeSelect.bind(this);
    this.remove = this.remove.bind(this);
  }

  componentDidUpdate(prevProps) {
    const {
      type: prevType,
      value: prevValue,
      disabled: prevDisabled,
    } = prevProps;
    const { type, value, disabled } = this.props;

    if (prevType !== type || prevValue !== value || prevDisabled !== disabled) {
      this.setState({ type, value, disabled });
    }
  }

  onChangeValue(e) {
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
          <label htmlFor="attribute-name">
            Attribute Name
          </label>
          <input
            value={value}
            onChange={this.onChangeValue}
            className="form-control"
            placeholder="Height"
            disabled={disabled}
            id="attribute-name"
            required
          />
        </div>
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
            <option value="number">Number</option>
          </select>
        </div>
      </div>
    );
  }
}

AttributeField.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

AttributeField.defaultValues = {
  type: "text",
  value: "",
  disabled: false,
};

export default AttributeField;
