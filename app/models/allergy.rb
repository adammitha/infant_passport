class Allergy < ActiveRecord::Base
  belongs_to :timeline
  validates :name, presence: true
  validates :severity, presence: true
end
