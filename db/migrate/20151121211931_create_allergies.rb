class CreateAllergies < ActiveRecord::Migration
  def change
    create_table :allergies do |t|
      t.references :timeline, index: true, foreign_key: true
      t.string :name
      t.integer :severity

      t.timestamps null: false
    end
  end
end
