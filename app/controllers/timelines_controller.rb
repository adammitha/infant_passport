class TimelinesController < ApplicationController

  def show
    @timeline = Timeline.find(params[:id])
  end

  def update
    render :json => params[:formData]
  end

  def destroy
  end

end
