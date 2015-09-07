require 'test_helper'

class PasswordResetsTest < ActionDispatch::IntegrationTest
  def setup
    ActionMailer::Base.deliveries.clear
    @parent = parents(:adam)
  end

  test "password resets" do
    get new_password_reset_path
    assert_template 'password_resets/new'
    # Invalid email
    post password_resets_path, password_reset: { email: "" }
    assert_not flash.empty?
    assert_template 'password_resets/new'
    # Valid email
    post password_resets_path, password_reset: { email: @parent.email }
    assert_not_equal @parent.reset_digest, @parent.reload.reset_digest
    assert_equal 1, ActionMailer::Base.deliveries.size
    assert_not flash.empty?
    assert_redirected_to root_url
    # Password reset form
    parent = assigns(:parent)
    # Wrong email
    get edit_password_reset_path(parent.reset_token, email: "")
    assert_redirected_to root_url
    # Inactive parent
    parent.toggle!(:activated)
    get edit_password_reset_path(parent.reset_token, email: parent.email)
    assert_redirected_to root_url
    parent.toggle!(:activated)
    # Right email, wrong token
    get edit_password_reset_path('wrong token', email: parent.email)
    assert_redirected_to root_url
    # Right email, right token
    get edit_password_reset_path(parent.reset_token, email: parent.email)
    assert_template 'password_resets/edit'
    assert_select "input[name=email][type=hidden][value=?]", parent.email
    # Invalid password & confirmation
    patch password_reset_path(parent.reset_token),
          email: parent.email,
          parent: { password:              "foobaz",
                  password_confirmation: "barquux" }
    assert_select 'div#error_explanation'
    # Empty password
    patch password_reset_path(parent.reset_token),
          email: parent.email,
          parent: { password:              "",
                  password_confirmation: "" }
    assert_not flash.empty?
    assert_template 'password_resets/edit'
    # Valid password & confirmation
    patch password_reset_path(parent.reset_token),
          email: parent.email,
          parent: { password:              "foobaz18",
                  password_confirmation: "foobaz18" }
    assert is_logged_in?
    assert_not flash.empty?
    assert_redirected_to parent
  end
end
