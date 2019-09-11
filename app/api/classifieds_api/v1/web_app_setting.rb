# frozen_string_literal: true

module ClassifiedsAPI
  module V1
    class WebAppSetting < ClassifiedsAPI::V1::API
      resources :web_app_setting do
        patch do
          web_app_title = params[:web_app_setting][:web_app_title]

          error!('not_authorized', 401) unless current_user.role == 'admin'

          web_app_setting = ::WebAppSetting.first
          web_app_setting.update(web_app_title: web_app_title)

          unless web_app_setting.valid?
            error!('web_app_settings_update_error', 422)
          end

          present :web_app_setting, web_app_setting, using: Entities::WebAppSetting
          present :message, 'web_app_settings_update_success'
        end
      end
    end
  end
end
