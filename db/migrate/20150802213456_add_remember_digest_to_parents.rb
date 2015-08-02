class AddRememberDigestToParents < ActiveRecord::Migration
  def change
    add_column :parents, :remember_digest, :string
  end
end
