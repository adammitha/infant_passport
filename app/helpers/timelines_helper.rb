module TimelinesHelper
  def render_feeding_milestone(milestone_id,milestone_text)
    the_milestone = @milestones.find_by milestone_id:milestone_id
    if the_milestone
      date = the_milestone.date.strftime("%B %e, %Y")
      "<tr id=\"#{milestone_id}\">
      <td>#{milestone_text}</td>
      <td>#{age_at_milestone the_milestone.date} months</td>
      <td>#{date}<i class=\"fa fa-pencil pull-right\" onclick=\"editFunc(this,'#{milestone_id}')\"></i></td>
      </tr>"
    else
      "<tr id=\"#{milestone_id}\">
      <td>#{milestone_text}</td>
      <td>-</td>
      <td>Incomplete<i class=\"fa fa-pencil pull-right\" onclick=\"editFunc(this,'#{milestone_id}')\"></i></td>
      </tr>"
    end
  end

  def render_development_milestone(milestone_id,category,milestone_text)
    the_milestone = @milestones.find_by milestone_id:milestone_id
    if the_milestone
      date = the_milestone.date.strftime("%B %e, %Y")
      "<tr id=\"#{milestone_id}\">
      <td>#{category}</td>
      <td>#{milestone_text}</td>
      <td>#{age_at_milestone the_milestone.date} months</td>
      <td>#{date}<i class=\"fa fa-pencil pull-right\" onclick=\"editFunc(this,'#{milestone_id}')\"></i></td>
      </tr>"
    else
      "<tr id=\"#{milestone_id}\">
      <td>#{category}</td>
      <td>#{milestone_text}</td>
      <td>–</td>
      <td>Incomplete<i class=\"fa fa-pencil pull-right\" onclick=\"editFunc(this,'#{milestone_id}')\"></i></td>
      </tr>"
    end
  end

  def age_at_milestone(date_of_milestone)
    (date_of_milestone.year * 12 + date_of_milestone.month) - (@date_of_birth.year * 12 + @date_of_birth.month)
  end

  def age_at_vaccination(date_of_birth, date_of_vaccine)
     (date_of_vaccine.year * 12 + date_of_vaccine.month) - (date_of_birth.year * 12 + date_of_birth.month)
  end

  def severity(index)
    case index
    when 0
      "Mild"
    when 1
      "Moderate"
    when 2
      "Severe"
    else
      "Unknown"
    end
  end
end
