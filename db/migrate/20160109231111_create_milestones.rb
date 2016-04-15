class CreateMilestones < ActiveRecord::Migration
  def change
    create_table :milestones do |t|
      t.references :timeline, index: true, foreign_key: true
      t.string :milestone_id
      t.datetime :date

      t.timestamps null: false
    end
  end
end
