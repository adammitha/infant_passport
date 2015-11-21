class TimelinesController < ApplicationController

  def show
    @timeline = Timeline.find(params[:id])
    @vaccinations = @timeline.vaccinations
    @allergies = @timeline.allergies
  end

  def update
    data = JSON.parse params[:formData]
    changes = data['changes']
    deletions = data['deletions']
    addVaccines changes['vaccine']
    addAllergies changes['allergy']
    redirect_to Timeline.find(params[:id])
  end

  def destroy
  end

  private
    def addVaccines(vaccines)
      vaccines.each do |vaccine|
        vaccination = Timeline.find(params[:id]).vaccinations.build(name:vaccine[0],date:vaccine[1].to_datetime)
        vaccination.save
      end
    end

    def addAllergies(allergies)
      allergies.each do |allergy|
        allergy = Timeline.find(params[:id]).allergies.build(name:allergy[0],severity:allergy[1])
        allergy.save
      end
    end

end
