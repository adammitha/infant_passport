require 'test_helper'

class MilestoneTest < ActiveSupport::TestCase
  def setup
    @milestone = Milestone.new(milestone_id: "fed1.1", date: DateTime.parse("2015-08-23"))
  end

  test "milestone is valid" do
    assert @milestone.valid?
  end

  test "milestone_id should be present" do
    @milestone.milestone_id = nil
    assert_not @milestone.valid?
  end

  test "date should be present" do
    @milestone.date = nil
    assert_not @milestone.valid?
  end

end
