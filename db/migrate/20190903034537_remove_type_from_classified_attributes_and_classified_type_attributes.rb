class RemoveTypeFromClassifiedAttributesAndClassifiedTypeAttributes < ActiveRecord::Migration[5.2]
  def change
    rename_column :classified_type_attributes, :type, :data_type
    rename_column :classified_attributes, :type, :data_type
  end
end
