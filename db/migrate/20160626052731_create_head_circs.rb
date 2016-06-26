class CreateHeadCircs < ActiveRecord::Migration
  def change
    create_table :head_circs do |t|
	  t.references :chart, index: true, foreign_key: true
    t.float :value
      t.datetime :date
      t.timestamps null: false
    end
  end
end
