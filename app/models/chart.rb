class Chart < ActiveRecord::Base
  belongs_to :child
  has_many :heights, dependent: :destroy
  has_many :weights, dependent: :destroy
  has_many :head_circs, dependent: :destroy
end
