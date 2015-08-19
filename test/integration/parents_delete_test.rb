require 'test_helper'

class ParentsDeleteTest < ActionDispatch::IntegrationTest
  def setup
    @parent = parents(:adam)
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
end
