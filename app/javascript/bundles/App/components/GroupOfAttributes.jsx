import PropTypes from "prop-types";
import React from "react";

import AttributeField from "./AttributeField";


class GroupOfAttributes extends React.Component {
  constructor(props) {
    super(props);

    const { attributes } = props;

    this.state = {
      attributes,
    };
  }

  render() {
    const { attributes } = this.state;
    const { onChangeAttribute, onRemoveAttribute, onAddNewAttribute } = this.props;

    const domAttributes = attributes.map((attribute) => {
      const isDefaultAttribute = attribute.name && attribute.name.toLowerCase() === 'name';

      return (
        <div className="mb-5">
          <AttributeField
            attribute={attribute}
            id={attribute.id}
            onChange={onChangeAttribute}
            onRemove={onRemoveAttribute} />
        </div>
      );
    });

    return (
      <div className="group-of-attributes">
        <div>
          {domAttributes.length > 0 && domAttributes || "This Classified Type has not attributes. Go ahead and add one."}
        </div>

        <button onClick={onAddNewAttribute} type="button" className="btn btn-secondary btn-sm mt-3">
          New Attribute
        </button>
      </div>
    );
  }
}

export default GroupOfAttributes;
