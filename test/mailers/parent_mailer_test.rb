require 'test_helper'

class ParentMailerTest < ActionMailer::TestCase
  test "account_activation" do
    parent = parents(:adam)
    parent.activation_token = Parent.new_token
    mail = ParentMailer.account_activation(parent)
    assert_equal "Account activation", mail.subject
    assert_equal [parent.email], mail.to
    assert_equal ["noreply@example.com"], mail.from
    assert_match parent.first_name, mail.body.encoded
    assert_match parent.activation_token, mail.body.encoded
    assert_match CGI::escape(parent.email), mail.body.encoded
  end

  test "password_reset" do
    parent = parents(:adam)
    parent.reset_token = Parent.new_token
    mail = ParentMailer.password_reset(parent)
    assert_equal "Password reset", mail.subject
    assert_equal [parent.email], mail.to
    assert_equal ["noreply@example.com"], mail.from
    assert_match parent.reset_token, mail.body.encoded
    assert_match CGI::escape(parent.email), mail.body.encoded
  end
end
