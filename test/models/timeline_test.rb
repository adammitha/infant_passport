require 'test_helper'

class TimelineTest < ActiveSupport::TestCase
	def setup
		@parent = parents(:adam)
		@child = @parent.children.build(first_name: "Luke", last_name: "Skywalker", date_of_birth: DateTime.parse("1995-01-01"), gender: false)
		@timeline = @child.timeline.build()
	end
	
	test "should be valid" do
		assert @timeline.valid?
	end
	
	test "child id should be present" do
		@timeline.child_id = nil
		assert_not @timeline.valid?
	end
	
end
