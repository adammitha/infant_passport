module SessionsHelper

  # Logs in the given parent.
  def log_in(parent)
    session[:parent_id] = parent.id
  end

  # Remembers a parent in a persistent session.
  def remember(parent)
    parent.remember
    cookies.permanent.signed[:parent_id] = parent.id
    cookies.permanent[:remember_token] = parent.remember_token
  end

  # Returns true if the given parent is the current parent
  def current_parent?(parent)
    parent == current_parent
  end

  # Returns the current logged-in parent (if any)
  def current_parent
    if (parent_id = session[:parent_id])
      @current_parent ||= Parent.find_by(id: session[:parent_id])
    elsif (parent_id = cookies.signed[:parent_id])
      parent = Parent.find_by(id: parent_id)
      if parent && parent.authenticated?(cookies[:remember_token])
        log_in parent
        @current_parent = parent
      end
    end
  end

  # Returns true if the parent is logged in, false otherwise.
  def logged_in?
    !current_parent.nil?
  end

  # Forgets a persistent session.
  def forget(parent)
    parent.forget
    cookies.delete(:parent_id)
    cookies.delete(:remember_token)
  end

  #Logs out the current parent.
  def log_out
    forget(current_parent)
    session.delete(:parent_id)
    @current_parent = nil
  end

  # Redirects to store location (or to the default).
  def redirect_back_or(default)
    redirect_to(session[:forwarding_url] || default)
    session.delete(:forwarding_url)
  end

  # Store the URL trying to be accessed.
  def store_location
    session[:forwarding_url] = request.url if request.get?
  end

end
