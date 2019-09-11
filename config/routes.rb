Rails.application.routes.draw do
  # resources :users, only: [:create, :update]

  patch '/web_app_settings', to: 'web_app_settings#update'

  root 'statics#index'

  mount ClassifiedsAPI::V1::API => '/'

  get '*foo', to: 'statics#index'
end
