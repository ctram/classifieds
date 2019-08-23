Rails.application.routes.draw do
  resources :users, only: [:create, :update] do
    resources :habits do
      member do
        post '/update_habit_completed_for_date', to: 'habits#update_habit_completed_for_date'
      end
    end
  end

  patch '/web_app_settings', to: 'web_app_settings#update'

  resources :sessions, only: [:create]
  get '/sessions', to: 'sessions#authenticate'
  delete '/sessions', to: 'sessions#destroy'

  root 'statics#index'

  get '/sign-in', to: 'statics#sign_in'

  get '*foo', to: 'statics#index'
end
