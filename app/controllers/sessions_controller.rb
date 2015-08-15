class SessionsController < ApplicationController
  def new
  end

  def create
    parent = Parent.find_by(email: params[:session][:email].downcase)
    if parent && parent.authenticate(params[:session][:password])
      log_in parent
      params[:session][:remember_me] == '1' ? remember(parent) : forget(parent)
      redirect_back_or parent
    else
      flash.now[:danger] = 'Invalid email/password combination'
      render 'new'
    end
  end

  def destroy
    log_out if logged_in?
    redirect_to root_url
  end
end
