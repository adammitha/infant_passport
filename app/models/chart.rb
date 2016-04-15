class Chart < ActiveRecord::Base
  belongs_to :child
  has_many :height, dependent: :destroy
  has_many :weight, dependent: :destroy
end
