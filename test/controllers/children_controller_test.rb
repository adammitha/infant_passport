require 'test_helper'

class ChildrenControllerTest < ActionController::TestCase
  def setup
    @child = children(:han)
  end

  test "should redirect create when not logged in" do
    assert_no_difference 'Child.count' do
      post :create, child: { first_name: "Obi Wan", last_name: "Kenobi", date_of_birth: 2.years.ago, gender: false }
    end
    assert_redirected_to login_url
  end
end
