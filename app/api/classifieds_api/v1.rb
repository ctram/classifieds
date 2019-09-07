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

      desc 'Create and return a classified_type'
      post do
        name, attributes = params[:classified_type].values_at :name, :attributes

        ActiveRecord::Base.transaction do
          classified_type = ClassifiedType.create!(name: name)

          attributes.each do |attr|
            classified_type.classified_type_attributes.create!(attr)
          end
        end

        present classified_type: classified_type, with: Entities::ClassifiedType
      end
    end
  end
end
