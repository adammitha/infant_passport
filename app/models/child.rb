class Child < ActiveRecord::Base
  belongs_to :parent
  has_one :timeline, dependent: :destroy
  has_one :chart, dependent: :destroy
  before_create :create_dependents
  default_scope -> { order(date_of_birth: :desc) }
  validates :parent_id, presence: true
  validate :date_of_birth_is_valid
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :gender, :inclusion => { :in => [true, false] }

  private

    # Creates timeline for child when child is added
    def create_dependents
      self.build_timeline
	  self.build_chart
    end

    # Ensures that the date of birth cannot be set in the future
    def date_of_birth_is_valid
      errors.add(:date_of_birth, 'date of birth must be today or earlier') if date_of_birth > Date.today
    end
end
