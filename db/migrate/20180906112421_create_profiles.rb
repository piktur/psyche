class CreateProfiles < ActiveRecord::Migration[5.1]
  def change
    create_table :profiles do |t|
      t.string :first_name
      t.string :last_name
      t.date :birthday
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
