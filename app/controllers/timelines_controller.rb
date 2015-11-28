class TimelinesController < ApplicationController

  def show
    @timeline = Timeline.find(params[:id])
    @vaccinations = @timeline.vaccinations
    @allergies = @timeline.allergies
  end

  def update
    data = JSON.parse params[:formData]
    additions = data['additions']
    changes = data['changes']
    #render :json => changes['allergy']
    editVaccines changes['vaccine']
    addVaccines additions['vaccine']
    addAllergies additions['allergy']
    editAllergies changes['allergy']
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

    def editVaccines(vaccines)
      vaccines.each do |vaccine|
        vaccination = Timeline.find(params[:id]).vaccinations.find(vaccine[0].to_i)
        vaccination.date = vaccine[1].to_datetime
        vaccination.save
      end
    end

    def editAllergies(allergies)
      allergies.each do |allergy|
        modAllergy = Allergy.find(allergy[0].to_i)
        modAllergy.severity = allergy[1].to_i
        modAllergy.save
      end
    end

end
