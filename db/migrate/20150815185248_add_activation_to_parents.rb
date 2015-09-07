class AddActivationToParents < ActiveRecord::Migration
  def change
    add_column :parents, :activation_digest, :string
    add_column :parents, :activated, :boolean, default: false
    add_column :parents, :activated_at, :datetime
  end
end
