class Timeline < ActiveRecord::Base
  belongs_to :child
  has_many :vaccinations, dependent: :destroy
  has_many :allergies, dependent: :destroy
  has_many :milestones, dependent: :destroy
end
