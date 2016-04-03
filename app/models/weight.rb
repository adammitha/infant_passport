class Weight < ActiveRecord::Base
  belongs_to :chart
  validates :value, presence: true
  validates :date, presence: true
end
