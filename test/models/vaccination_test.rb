require 'test_helper'

class VaccinationTest < ActiveSupport::TestCase

  def setup
    @vaccination = Vaccination.new(name: "Diphtheria", date: DateTime.parse("2015-08-23"))
  end

  test "vaccination is valid" do
    assert @vaccination.valid?
  end

  test "name should be present" do
    @vaccination.name = nil
    assert_not @vaccination.valid?
  end

  test "date should be present" do
    @vaccination.date = nil
    assert_not @vaccination.valid?
  end
end
