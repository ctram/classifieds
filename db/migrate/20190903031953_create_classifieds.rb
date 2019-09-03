class CreateClassifieds < ActiveRecord::Migration[5.2]
  def change
    create_table :classifieds do |t|
      t.integer :classified_type_id
      t.string :name
    end
  end
end
