class Child < ActiveRecord::Base
  belongs_to :parent
  validates :parent_id, presence: true
  validate :date_of_birth_is_valid
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :gender, presence: true

  def date_of_birth_is_valid
    errors.add(:date_of_birth, 'date of birth must be today or earlier') if date_of_birth > Date.today
  end
end
