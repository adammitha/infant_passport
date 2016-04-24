module TimelinesHelper
  def render_feeding_milestone(milestone_id,milestone_text,placeholder_age)
    the_milestone = @milestones.find_by milestone_id:milestone_id
    if the_milestone
      date = the_milestone.date.strftime("%B %e, %Y")
      "<tr>
      <td>#{milestone_text}</td>
      <td>#{age_at_milestone the_milestone.date} months</td>
      <td>#{date}<i id=\"#{milestone_id}\" class=\"fa fa-pencil pull-right\" onclick=\"editFunc(this,this.id)\"></i></td>
      </tr>"
    else
      "<tr>
      <td>#{milestone_text}</td>
      <td>#{placeholder_age}</td>
      <td>Incomplete<i id=\"#{milestone_id}\" class=\"fa fa-pencil pull-right\" onclick=\"editFunc(this,this.id)\"></i></td>
      </tr>"
    end
  end

  def render_development_milestone(milestone_id,category,milestone_text)
    the_milestone = @milestones.find_by milestone_id:milestone_id
    if the_milestone
      date = the_milestone.date.strftime("%B %e, %Y")
      "<tr>
      <td>#{category}</td>
      <td>#{milestone_text}</td>
      <td>#{age_at_milestone the_milestone.date} months</td>
      <td>#{date}<i id=\"dev1.1\" class=\"fa fa-pencil pull-right\" onclick=\"editFunc(this,this.id)\"></i></td>
      </tr>"
    else
      "<tr>
      <td>#{category}</td>
      <td>#{milestone_text}</td>
      <td>–</td>
      <td>Incomplete<i id=\"dev1.1\" class=\"fa fa-pencil pull-right\" onclick=\"editFunc(this,this.id)\"></i></td>
      </tr>"
    end
  end

  def age_at_milestone(date_of_milestone)
    (date_of_milestone.year * 12 + date_of_milestone.month) - (@date_of_birth.year * 12 + @date_of_birth.month)
  end
end
