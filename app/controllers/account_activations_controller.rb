class AccountActivationsController < ApplicationController
  def edit
    parent = Parent.find_by(email: params[:email])
    if parent && !parent.activated? && parent.authenticated?(:activation, params[:id])
      parent.activate
      log_in parent
      flash[:success] = "Account activated!"
      redirect_to parent
    else
      flash[:danger] = "Invalid activation link"
      redirect_to root_url
    end
  end
end
