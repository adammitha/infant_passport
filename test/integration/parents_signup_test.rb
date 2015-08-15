require 'test_helper'

class ParentsSignupTest < ActionDispatch::IntegrationTest

  def setup
    ActionMailer::Base.deliveries.clear
  end

  test "invalid signup information" do
    get signup_path
    assert_no_difference 'Parent.count' do
      post parents_path, parent: { first_name: "", last_name: "", email: "parent@invalid", password: "foo", password_confirmation: "bar" }
    end
    assert_template 'parents/new'
  end

  test "valid signup information with account activation" do
    get signup_path
    assert_difference 'Parent.count', 1 do
      post parents_path, parent: { first_name: "Example", last_name: "Parent", email: "parent@example.com", password: "password", password_confirmation: "password" }
    end
    assert_equal 1, ActionMailer::Base.deliveries.size
    parent = assigns(:parent)
    assert_not parent.activated?
    # Try to log in before activation.
    log_in_as(parent)
    assert_not is_logged_in?
    # Invalid activated token
    get edit_account_activation_path("invalid token")
    assert_not is_logged_in?
    # Valid token, wrong email
    get edit_account_activation_path(parent.activation_token, email: 'wrong')
    assert_not is_logged_in?
    # Valid activation token
    get edit_account_activation_path(parent.activation_token, email: parent.email)
    assert parent.reload.activated?
    follow_redirect!
    assert_template 'parents/show'
    assert is_logged_in?
  end
end
