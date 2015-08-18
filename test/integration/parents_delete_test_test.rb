require 'test_helper'

class ParentsDeleteTestTest < ActionDispatch::IntegrationTest
  def setup
    @parent = parents(:adam)
  end

  test "delete parent" do
    log_in_as @parent
    get edit_parent_path @parent
    delete parent_path(@parent)
    assert_not flash.empty?
    assert_redirected_to root_url
  end
end
