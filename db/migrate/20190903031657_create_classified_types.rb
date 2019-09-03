class CreateClassifiedTypes < ActiveRecord::Migration[5.2]
  def change
    create_table :classified_types do |t|
      t.string :name
    end
  end
end
