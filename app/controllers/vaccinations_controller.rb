class VaccinationsController < ApplicationController
  def create
    @vaccination = Vaccination.new(vaccination_params)
  end

  def update
  end

  def destroy
  end

  private

    # Gets params for new vaccination
    def vaccination_params
      params.require(:vaccination).permit(:name, :date)
    end
end
