Rails.application.routes.draw do
  root 'statics#index'

  mount ClassifiedsAPI::V1::API => '/'

  get '*foo', to: 'statics#index'
end
