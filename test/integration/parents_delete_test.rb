require 'test_helper'

class ParentsDeleteTest < ActionDispatch::IntegrationTest
  def setup
    @parent = parents(:adam)
    @admin_parent = parents(:obiwan)
    @other_parent = parents(:anakin)
  end

  test "delete parent" do
    log_in_as @parent
    number_of_children = @parent.children.count
    get edit_parent_path @parent
    assert_difference 'Child.count', -number_of_children do
      delete parent_path(@parent)
    end
    assert_not flash.empty?
    assert_redirected_to root_url
  end

  test "delete as admin" do
    log_in_as @admin_parent
    assert_difference 'Parent.count', -1 do
      delete parent_path(@other_parent)
    end
    assert_not flash.empty?
    assert_redirected_to @admin_parent
  end

end
