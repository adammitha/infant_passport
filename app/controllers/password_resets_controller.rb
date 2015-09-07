class PasswordResetsController < ApplicationController
  before_action :get_parent, only: [:edit, :update]
  before_action :valid_parent, only: [:edit, :update]
  before_action :check_expiration, only: [:edit, :update]

  def new
  end

  def create
    @parent = Parent.find_by(email: params[:password_reset][:email].downcase)
    if @parent
      @parent.create_reset_digest
      @parent.send_password_reset_email
      flash[:info] = "Email sent with password reset instructions. The message should arrive within 15 minutes."
      redirect_to root_url
    else
      flash.now[:danger] = "Email address not found"
      render 'new'
    end
  end

  def edit
  end

  def update
    if params[:parent][:password].empty?
      flash.now[:danger] = "Password can't be empty"
      render 'edit'
    elsif @parent.update_attributes(parent_params)
      log_in @parent
      flash[:success] = "Password has been reset."
      redirect_to @parent
    else
      render 'edit'
    end
  end


  private

    def parent_params
      params.require(:parent).permit(:password, :password_confirmation)
    end

    def get_parent
      @parent = Parent.find_by(email: params[:email])
    end

    # Confirms a valid user.
    def valid_parent
      unless (@parent && @parent.activated? && @parent.authenticated?(:reset, params[:id]))
        redirect_to root_url
      end
    end

    # Checks expiration of reset token.
    def check_expiration
      if @parent.password_reset_expired?
        flash[:danger] = "Password reset has expired."
        redirect_to new_password_reset_url
      end
    end
end
