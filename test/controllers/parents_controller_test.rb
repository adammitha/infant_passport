require 'test_helper'

class ParentsControllerTest < ActionController::TestCase
  def setup
    @parent = parents(:adam)
    @other_parent = parents(:anakin)
  end

  test "should redirect show when not logged in" do
    get :show, id: @parent
    assert_not flash.empty?
    assert_redirected_to login_url
  end

  test "should redirect edit when not logged in" do
    get :edit, id: @parent
    assert_not flash.empty?
    assert_redirected_to login_url
  end

  test "should redirect update when not logged in" do
    patch :update, id: @parent, parent: { first_name: @parent.first_name, last_name: @parent.last_name, email: @parent.email }
    assert_not flash.empty?
    assert_redirected_to login_url
  end

  test "should redirect show when logged in as wrong user" do
    log_in_as(@other_parent)
    get :show, id: @parent
    assert flash.empty?
    assert_redirected_to root_url
  end

  test "should redirect edit when logged in as wrong user" do
    log_in_as(@other_parent)
    get :edit, id: @parent
    assert flash.empty?
    assert_redirected_to root_url
  end

  test "should redirect update when logged in as wrong user" do
    log_in_as(@other_parent)
    patch :update, id: @parent, parent: { first_name: @parent.first_name, last_name: @parent.last_name, email: @parent.email }
    assert flash.empty?
    assert_redirected_to root_url
  end
end
