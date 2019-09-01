# frozen_string_literal: true

class ApplicationController < ActionController::Base
  helper_method :current_user, :login, :who_is_logged_in?

  before_action :verify_user_logged_in
  before_action :set_web_app_settings

  private

  def verify_user_logged_in
    redirect_to '/sign-in' unless current_user
  end

  def current_user
    if session[:user_id]
      @current_user ||= User.find(session[:user_id])
    else
      @current_user = nil
    end
  end

  def login(user)
    session[:user_id] = user.id
    @current_user = user
  end

  def who_is_logged_in?
    @current_user
  end

  def logout
    session[:user_id] = nil
    @current_user = nil
  end

  def set_web_app_settings
    @web_app_settings ||= WebAppSetting.first

    @web_app_settings ||= WebAppSetting.create!(web_app_title: 'Classifieds')
  end
end
