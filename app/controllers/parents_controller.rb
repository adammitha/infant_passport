class ParentsController < ApplicationController
  def new
    @parent = Parent.new
  end

  def show
    @parent = Parent.find(params[:id])
  end

  def create
    @parent = Parent.new(user_params)
    if @parent.save
      log_in @parent
      flash[:success] = "Welcome to the Infant Passport!"
      redirect_to @parent
    else
      render 'new'
    end
  end

  private
    def user_params
      params.require(:parent).permit(:name, :email, :password, :password_confirmation)
    end
end
