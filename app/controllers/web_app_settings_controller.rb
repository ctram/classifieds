class WebAppSettingsController < ApplicationController
  def update
    unless current_user.role == 'admin'
      return render(status: 401, json: {
        message: 'not_authorized'
      })
    end

    web_app_setting = WebAppSetting.first

    if web_app_setting.update(web_app_setting_params)
      return render(status: 200, json: {
        message: 'web_app_settings_update_successful',
        web_app_settings: web_app_setting
      })
    end

    render(status: 500, json: { message: 'web_app_settings_update_error', errors: web_app_setting.errors.messages })
  end

  private

  def web_app_setting_params
    params.require(:web_app_setting).permit(:web_app_title)
  end
end
