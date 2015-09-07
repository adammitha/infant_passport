require 'test_helper'

class AddChildTest < ActionDispatch::IntegrationTest

  def setup
    @parent = parents(:adam)
  end

  test "add with invalid information" do
    get parent_path @parent
    assert_no_difference 'Child.count' do
      post children_path, child: {first_name: "", last_name: "", date_of_birth: Date.today + 1, gender: nil }
    end
  end
end
