class CreateChildren < ActiveRecord::Migration
  def change
    create_table :children do |t|
      t.text :first_name
      t.text :last_name
      t.datetime :date_of_birth
      t.boolean :gender
      t.references :parent, index: true, foreign_key: true

      t.timestamps null: false
    end
    add_index :children, [:parent_id, :date_of_birth]
  end
end
