# frozen_string_literal: true

module ClassifiedsAPI
  module V1
    class ClassifiedType < ClassifiedsAPI::V1::API
      resources :classified_types do
        before do
          authenticate!
          error!('must_be_admin', 401) unless current_user.role == 'admin'
        end

        get do
          classified_types = ClassifiedType.all
          present :classified_types, ClassifiedType.all, with: Entities::ClassifiedType
        end

        post do
          ActiveRecord::Base.transaction do
            classified_type_params = params[:classified_type]
            name = classified_type_params[:name]
            classified_type = ::ClassifiedType.create!(name: name)
            attributes = classified_type_params[:attributes] || []

            unless attributes.empty?
              classified_type_params[:attributes].map do |attr|
                classified_type.classified_type_attributes.create!(attr)
              end
            end

            present :classified_type, classified_type, with: Entities::ClassifiedType
          end
        rescue StandardError => e
          error!({ detail: e.message, error: 'classified_type_creation_error' }, 422)
        end
      end
    end
  end
end
