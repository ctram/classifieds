import PropTypes from "prop-types";
import React from "react";

import AttributeField from "./AttributeField";

class GroupOfAttributes extends React.Component {
  constructor(props) {
    super(props);

    const { attributes } = props;

    this.state = { attributes };
  }

  componentDidUpdate(prevProps) {
    const { attributes } = this.props;

    if (prevProps.attributes !== attributes) {
      this.setState({ attributes });
    }
  }

  render() {
    const {
      onChangeAttribute, onAddAttribute, onRemoveAttribute
    } = this.props;

    const { attributes } = this.state;


    const domAttributeFields = attributes.map((attribute) => (
      <AttributeField
        attribute={attribute}
        onChange={onChangeAttribute}
        key={attribute.id}
        onRemoveAttribute={onRemoveAttribute}
      />
    ));

    return (
      <div className="group-of-attributes my-3">
        {
          domAttributeFields
        }

        <button onClick={onAddAttribute} type="button" className="btn btn-secondary">
          Add Attribute
        </button>
      </div>
    );
  }
}
export default GroupOfAttributes;
