Rails.application.routes.draw do
  # resources :users, only: [:create, :update]

  patch '/web_app_settings', to: 'web_app_settings#update'

  # resources :sessions, only: [:create]
  # get '/sessions', to: 'sessions#authenticate'
  # delete '/sessions', to: 'sessions#destroy'

  root 'statics#index'

  get '/sign-in', to: 'statics#sign_in'

  mount ClassifiedsAPI::V1::API => '/'

  get '*foo', to: 'statics#index'
end
