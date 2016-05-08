require 'test_helper'

class TimelinesControllerTest < ActionController::TestCase
  # test "the truth" do
  #   assert true
  # end
  def setup
    @parent = parents(:adam)
    @other_parent = parents(:anakin)
    @timeline = timelines(:one)
  end

  test "should redirect show when not logged in" do
    get :show, id: @timeline
    assert_not flash.empty?
    assert_redirected_to login_url
  end

  test "should redirect update when not logged in" do
    patch :update, id: @timeline, timeline: {formData:""}
    assert_not flash.empty?
    assert_redirected_to login_url
  end

end
