class CreateClassifiedTypeAttributes < ActiveRecord::Migration[5.2]
  def change
    create_table :classified_type_attributes do |t|
      t.integer :classified_type_id
      t.string :name
      t.string :type
    end
  end
end
