class ChildrenController < ApplicationController
before_action :logged_in_parent, only: [:create, :destroy]

def create
  @child = current_parent.children.build(child_params)
  if @child.save
    flash[:success] = "Child added!"
    redirect_to @child.parent
  else
    render flash[:danger] = "Error!"
  end
end

def destroy
end

private

  def child_params
    params.require(:child).permit(:first_name, :last_name, :date_of_birth, :gender)
  end
end
