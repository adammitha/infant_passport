require 'test_helper'

class ChildTest < ActiveSupport::TestCase

  def setup
    @parent = parents(:adam)
    @child = @parent.children.build(first_name: "Luke", last_name: "Skywalker", date_of_birth: DateTime.parse("1995-01-01"), gender: false)
  end

  test "should be valid" do
    assert @child.valid?
  end

  test "parent id should be present" do
    @child.parent_id = nil
    assert_not @child.valid?
  end

  test "date of birth must be today or earlier" do
    @child.date_of_birth = Date.today + 1
    assert_not @child.valid?
  end
end
