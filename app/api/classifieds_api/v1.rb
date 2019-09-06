module ClassifiedsAPI
  class V1 < Grape::API
    version 'v1', using: :path
    format :json
    prefix :api
    #
    # helpers do
    #   def current_user
    #     @current_user ||= User.authorize!(env)
    #   end
    #
    #   def authenticate!
    #     error!('401 Unauthorized', 401) unless current_user
    #   end
    # end

    resources :classified_types do
      desc 'Return classified_types'
      get do
        present classified_types: ClassifiedType.all, with: Entities::ClassifiedType
      end
    end
  end
end
