class StaticsController < ApplicationController
  layout 'statics'

  def index
  end

  def sign_in
    redirect_to '/' if current_user
  end
end
