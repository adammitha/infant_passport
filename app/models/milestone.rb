class Milestone < ActiveRecord::Base
  belongs_to :timeline
  validates :milestone_id, presence: true
  validates :date, presence: true
end
