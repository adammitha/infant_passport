class ParentsController < ApplicationController
  def new
    @parent = Parent.new
  end

  def show
    @parent = Parent.find(params[:id])
    @child = current_parent.children.build
    @children = @parent.children
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
      params.require(:parent).permit(:first_name, :last_name, :email, :password, :password_confirmation)
    end
end
