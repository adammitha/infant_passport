require 'test_helper'

class SessionsHelperTest < ActionView::TestCase

  def setup
    @parent = parents(:adam)
    remember(@parent)
  end

  test "current_parent returns right parent when session is nil" do
    assert_equal @parent, current_parent
    assert is_logged_in?
  end

  test "current_parent returns nil when remember digest is wrong" do
    @parent.update_attribute(:remember_digest, Parent.digest(Parent.new_token))
    assert_nil current_parent
  end
end
