class Vaccination < ActiveRecord::Base
  belongs_to :timeline
  validates :name, presence: true
  validates :date, presence: true
end
