class StaticsController < ApplicationController
  layout 'statics'

  skip_before_action :verify_user_logged_in, only: [:sign_in]

  def index
    @web_app_settings = WebAppSetting.first

    unless @web_app_settings
      @web_app_settings = WebAppSetting.create web_app_title: 'Classifieds'

      raise 'Unable to load web app settings' unless @web_app_settings
    end
  end

  def sign_in
    redirect_to '/' if current_user
  end
end
