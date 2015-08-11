ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../../config/environment', __FILE__)
require 'rails/test_help'
require "minitest/reporters"
Minitest::Reporters.use!

class ActiveSupport::TestCase
  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  fixtures :all

  # Add more helper methods to be used by all tests here...
  def is_logged_in?
    !session[:parent_id].nil?
  end

  # Logs in a test user.
  def log_in_as(parent, options = {})
    password = options[:password] || 'password'
    remember_me = options[:remember_me] || '1'
    if integration_test?
      post login_path, session: {email: parent.email, password: password, remember_me: remember_me}
    else
      session[:parent_id] = parent.id
    end
  end

  private

    # Returns true inside an integration test
    def integration_test?
      defined?(post_via_redirect)
    end
end
