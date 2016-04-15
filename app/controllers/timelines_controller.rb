class TimelinesController < ApplicationController

  def show
    @timeline = Timeline.find(params[:id])
    @vaccinations = @timeline.vaccinations
    @allergies = @timeline.allergies
    @milestones = @timeline.milestones
  end

  def update
    data = JSON.parse params[:formData]
    editMilestones(data['changes']['development'],Timeline.find(params[:id]))
    # updateTimeline(Timeline.find(params[:id]),data)
    redirect_to Timeline.find(params[:id])
  end

  def destroy
  end

  private
    def updateTimeline(timeline,data)
      additions = data['additions']
      changes = data['changes']
      deletions = data['deletions']
      editVaccines(changes['vaccine'],timeline)
      addVaccines(additions['vaccine'],timeline)
      addAllergies(additions['allergy'],timeline)
      editAllergies(changes['allergy'],timeline)
      editMilestones(changes['development'],timeline)
      deleteVaccines(deletions['vaccine'],timeline)
      deleteAllergies(deletions['allergy'],timeline)
    end

    def addVaccines(vaccines,timeline)
      vaccines.each do |vaccine|
        vaccination = timeline.vaccinations.build(name:vaccine[0],date:vaccine[1].to_datetime)
        vaccination.save
      end
    end

    def addAllergies(allergies,timeline)
      allergies.each do |allergy|
        new_allergy = timeline.allergies.build(name:allergy[0],severity:allergy[1])
        new_allergy.save
      end
    end

    def editVaccines(vaccines,timeline)
      vaccines.each do |vaccine|
        vaccination = timeline.vaccinations.find(vaccine[0].to_i)
        vaccination.date = vaccine[1].to_datetime
        vaccination.save
      end
    end

    def editAllergies(allergies,timeline)
      allergies.each do |allergy|
        modAllergy = timeline.allergies.find(allergy[0].to_i)
        modAllergy.severity = allergy[1].to_i
        modAllergy.save
      end
    end

    def editMilestones(milestones,timeline)
      milestones.each do |milestone|
        the_milestone = Milestone.find_or_initialize_by(timeline_id:timeline.id,milestone_id:milestone[0])
        the_milestone.date = milestone[1].to_datetime
        the_milestone.save
      end
    end

    def deleteVaccines(vaccines,timeline)
      vaccines.each do |vaccine|
        Vaccination.find(vaccine.to_i).destroy
      end
    end

    def deleteAllergies(allergies,timeline)
      allergies.each do |allergy|
        Allergy.find(allergy.to_i).destroy
      end
    end

end
