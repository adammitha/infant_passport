require 'test_helper'

class AllergyTest < ActiveSupport::TestCase
	def setup
		@allergy = Allergy.new(name: "Yogurt", severity: 1)
	end
  
  test "allergy is valid" do
    assert @allergy.valid?
  end

  test "name should be present" do
    @allergy.name = nil
    assert_not @allergy.valid?
  end

  test "severity should be present" do
    @allergy.severity = nil
    assert_not @allergy.valid?
  end

end
