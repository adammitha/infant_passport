class CreateVaccinations < ActiveRecord::Migration
  def change
    create_table :vaccinations do |t|
      t.references :timeline, index: true, foreign_key: true
      t.string :name
      t.datetime :date

      t.timestamps null: false
    end
  end
end
