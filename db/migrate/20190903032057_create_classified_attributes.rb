class CreateClassifiedAttributes < ActiveRecord::Migration[5.2]
  def change
    create_table :classified_attributes do |t|
      t.integer :classified_id
      t.integer :classified_type_attribute_id
      t.string :value
      t.string :type
      t.string :name
    end
  end
end
