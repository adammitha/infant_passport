class ChartsController < ApplicationController
  def show
    @chart = Chart.find(params[:id])
    @heights = @chart.heights
    @weights = @chart.weights
  end

  def update
    data = JSON.parse params[:formData]
	updateChart(Chart.find(params[:id]),data)
    redirect_to Chart.find(params[:id])  
  end
  
    private
    def updateChart(chart,data)
      additions = data['additions']
      deletions = data['deletions']
      addHeights(additions['height'],chart)
      addWeights(additions['weight'],chart)
      deleteHeights(deletions['height'],chart)
      deleteWeights(deletions['weight'],chart)
    end

    def addHeights(heights,chart)
      heights.each do |height|
        height = chart.heights.build(value:height[0],date:height[1].to_datetime)
        height.save
      end
    end

    def addWeights(weights,chart)
      weights.each do |weight|
        weight = chart.weights.build(value:weight[0],date:weight[1].to_datetime)
        weight.save
      end
    end

    def deleteHeights(heights,chart)
      heights.each do |height|
        Height.find(height.to_i).destroy
      end
    end

    def deleteWeights(weights,chart)
      weights.each do |weight|
        Weight.find(weight.to_i).destroy
      end
    end
end
