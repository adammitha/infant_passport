require 'test_helper'

class ParentsEditTest < ActionDispatch::IntegrationTest
  def setup
    @parent = parents(:adam)
  end

  test "unsuccessful edit" do
    get edit_parent_path(@parent)
    assert_template 'parents/edit'
    patch parent_path(@parent), parent: { name: "", email: "foo@invalid", password: "foo", password_confirmation: "bar" }
    assert_template 'parents/edit'
  end

  test "successful edit" do
    get edit_parent_path(@parent)
    assert_template 'parents/edit'
    first_name = "Foo"
    last_name = "Bar"
    email = "foo@bar.com"
    patch parent_path(@parent), parent: { first_name: first_name, last_name: last_name, email: email, password: "", password_confirmation: "" }
    assert_not flash.empty?
    assert_redirected_to @parent
    @parent.reload
    assert_equal first_name, @parent.first_name
    assert_equal last_name, @parent.last_name
    assert_equal email, @parent.email
  end
end
