Rails.application.routes.draw do
  patch '/web_app_settings', to: 'web_app_settings#update'

  root 'statics#index'

  mount ClassifiedsAPI::V1::API => '/'

  get '*foo', to: 'statics#index'
end
