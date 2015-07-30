require 'test_helper'

class ParentsSignupTest < ActionDispatch::IntegrationTest

  test "invalid signup information" do
    get signup_path
    assert_no_difference 'Parent.count' do
      post parents_path, parent: { name: "", email: "parent@invalid", password: "foo", password_confirmation: "bar" }
    end
    assert_template 'parents/new'
  end

  test "valid signup information" do
    get signup_path
    assert_difference 'Parent.count', 1 do
      post_via_redirect parents_path, parent: { name: "Example Parent", email: "parent@example.com", password: "password", password_confirmation: "password" }
    end
    assert_template 'parents/show'
    assert is_logged_in?
  end
end
