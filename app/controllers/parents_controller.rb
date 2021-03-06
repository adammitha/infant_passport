class ParentsController < ApplicationController
  before_action :logged_in_parent, only: [:show, :edit, :update, :destroy]
  before_action :correct_parent, only: [:show, :edit, :update]
  before_action :correct_parent_or_admin, only: [:destroy]

  def new
    @parent = Parent.new
  end

  def show
    @parent = Parent.find(params[:id])
    if @parent.admin?
      @parents = Parent.where(admin: false).paginate(page: params[:page])
      render 'show_admin'
    else
      @child = current_parent.children.build
      @children = @parent.children
      render 'show'
    end
  end

  def create
    @parent = Parent.new(parent_params)
    if @parent.save
      @parent.send_activation_email
      flash[:info] = "Please check your email to activate your account. The message should arrive within the next 15 minutes."
      redirect_to root_url
    else
      render 'new'
    end
  end

  def edit
    @parent = Parent.find(params[:id])
  end

  def update
    @parent = Parent.find(params[:id])
    if @parent.update_attributes(parent_params)
      flash[:success] = "Profile updated"
      redirect_to @parent
    else
      render 'edit'
    end
  end

  def destroy
    if current_parent.admin?
      name = "#{Parent.find(params[:id]).first_name} #{Parent.find(params[:id]).last_name}"
      Parent.find(params[:id]).destroy
      flash[:success] = "#{name}'s account has been deleted"
      redirect_to current_parent
    else
      log_out
      Parent.find(params[:id]).destroy
      flash[:success] = "Account deleted"
      redirect_to root_url
    end
  end

  private
    def parent_params
      params.require(:parent).permit(:first_name, :last_name, :email, :password, :password_confirmation)
    end

    # Confirms a logged-in parent
    def logged_in_parent
      unless logged_in?
        store_location
        flash[:danger] = "Please log in."
        redirect_to login_url
      end
    end

    # Confirms the correct parent.
    def correct_parent
      @parent = Parent.find(params[:id])
      redirect_to(root_url) unless current_parent?(@parent)
    end

    # Before action for destroy
    def correct_parent_or_admin
      unless current_parent.admin?
        @parent = Parent.find(params[:id])
        redirect_to(root_url) unless current_parent?(@parent)
      end
    end

    # Confirms admin user
    def admin_user
      redirect_to(root_url) unless current_parent.admin?
    end
end
