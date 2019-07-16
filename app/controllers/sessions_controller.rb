class SessionsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: :create

  def create
    email, password = params[:user].values_at :email, :password

    user = User.find_by_email(email)

    unless user && user.authenticate(password)
      return render(status: 401, json: { message: 'IncorrectEmailOrPassword' })
    end

    login(user)

    session[:user_id] = user.id
    render(status: 200, json: { user: user.slice(:id, :email) })
  end

  def show
    binding.pry

    return render(status: 401) unless current_user

    render(status: 200, json: { user: current_user.slice(:email, :id) })
  end

  def destroy
    return render(status: 401) unless current_user

     logout
     redirect_to '/'
  end
end
