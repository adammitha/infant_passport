class Child < ActiveRecord::Base
  belongs_to :parent
  has_one :timeline, dependent: :destroy
  before_create :create_timeline
  default_scope -> { order(date_of_birth: :desc) }
  validates :parent_id, presence: true
  validate :date_of_birth_is_valid
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :gender, :inclusion => { :in => [true, false] }

  def date_of_birth_is_valid
    errors.add(:date_of_birth, 'date of birth must be today or earlier') if date_of_birth > Date.today
  end

  private

    # Creates timeline for child when child is added
    def create_timeline
      self.build_timeline
    end
end
