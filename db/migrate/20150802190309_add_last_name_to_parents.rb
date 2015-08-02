class AddLastNameToParents < ActiveRecord::Migration
  def change
    add_column :parents, :last_name, :string
    rename_column :parents, :name, :first_name
  end
end
