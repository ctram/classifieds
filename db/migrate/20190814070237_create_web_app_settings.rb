class CreateWebAppSettings < ActiveRecord::Migration[5.2]
  def change
    create_table :web_app_settings do |t|
      t.string :web_app_title
      
      t.timestamps
    end
  end
end
