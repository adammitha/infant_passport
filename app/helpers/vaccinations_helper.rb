module VaccinationsHelper
  def age_at_vaccination(date_of_birth, date_of_vaccine)
     (date_of_vaccine.year * 12 + date_of_vaccine.month) - (date_of_birth.year * 12 + date_of_birth.month)
  end
end
