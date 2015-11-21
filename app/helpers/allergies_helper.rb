module AllergiesHelper
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
