class AddSuspendToParents < ActiveRecord::Migration
  def change
    add_column :parents, :suspended, :boolean, default: false
  end
end
