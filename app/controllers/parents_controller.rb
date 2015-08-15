class ParentsController < ApplicationController
  before_action :logged_in_parent, only: [:show]

  def new
    @parent = Parent.new
  end

  def show
    @parent = Parent.find(params[:id])
    @child = current_parent.children.build
    @children = @parent.children
  end

  def create
    @parent = Parent.new(parent_params)
    if @parent.save
      log_in @parent
      flash[:success] = "Welcome to the Infant Passport!"
      redirect_to @parent
    else
      render 'new'
    end
  end

  def edit
    @parent = Parent.find(params[:id])
  end

  def update
  end

  private
    def parent_params
      params.require(:parent).permit(:first_name, :last_name, :email, :password, :password_confirmation)
    end

    # Confirms a logged-in parent
    def logged_in_parent
      unless logged_in?
        flash[:danger] = "Please log in."
        redirect_to login_url
      end
    end
end
