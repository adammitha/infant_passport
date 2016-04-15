class CreateCharts < ActiveRecord::Migration
  def change
    create_table :charts do |t|
	  t.references :child, index: true, foreign_key: true
      t.timestamps null: false
    end
  end
end
