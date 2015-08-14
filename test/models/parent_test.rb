require 'test_helper'

class ParentTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
  def setup
    @parent = Parent.new(first_name: "Example", last_name: "Parent", email: "parent@example.com", password: "foobar18", password_confirmation: "foobar18")
  end

  test "should be valid" do
    assert @parent.valid?
  end

  test "name should be present" do
    @parent.first_name = "     "
    @parent.last_name = "     "
    assert_not @parent.valid?
  end

  test "email should be present" do
    @parent.email = "      "
    assert_not @parent.valid?
  end

  test "name should not be too long" do
    @parent.first_name = "a" * 51
    @parent.last_name = "b" * 51
    assert_not @parent.valid?
  end

  test "email should not be too long" do
    @parent.email = "a" * 244 + "@example.com"
    assert_not @parent.valid?
  end

  test "email validation should accept valid addresses" do
    valid_addresses = %w[user@example.com USER@foo.COM A_US-ER@foo.bar.org
                         first.last@foo.jp alice+bob@baz.cn]
    valid_addresses.each do |valid_address|
      @parent.email = valid_address
      assert @parent.valid?, "#{valid_address.inspect} should be valid"
    end
  end

  test "email validation should reject invalid addresses" do
    invalid_addresses = %w[user@example,com user_at_foo.org user.name@example. foo@bar_baz.com foo@bar+baz.com]
    invalid_addresses.each do |invalid_address|
      @parent.email = invalid_address
      assert_not @parent.valid?, "#{invalid_address.inspect} should be invalid"
    end
  end

  test "email addresses should be unique" do
    duplicate_parent = @parent.dup
    duplicate_parent.email = @parent.email.upcase
    @parent.save
    assert_not duplicate_parent.valid?
  end

  test "email addresses should be saved as lower-case" do
    mixed_case_email = "Foo@ExAMPle.CoM"
    @parent.email = mixed_case_email
    @parent.save
    assert_equal mixed_case_email.downcase, @parent.reload.email
  end

  test "password should be present (nonblank)" do
    @parent.password = @parent.password_confirmation = " " * 6
    assert_not @parent.valid?
  end

  test "password should have a minimum length" do
    @parent.password = @parent.password_confirmation = "a" * 5
    assert_not @parent.valid?
  end

  test "authenticated? should return false for a user with nil digest" do
    assert_not @parent.authenticated?('')
  end
end
