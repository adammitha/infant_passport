module ChildrenHelper
  def age_in_months(child)
    (Time.now.year * 12 + Time.now.month) - (child.date_of_birth.year * 12 + child.date_of_birth.month)
  end

  def render_children(children)
    children.each do |child|
      render partial: "child", locals: {child: child}
    end
  end
end
