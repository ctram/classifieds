module Entities
  class ClassifiedType < Grape::Entity
    expose :id
    expose :name
    expose :classified_type_attributes, using: ClassifiedTypeAttribute do
      expose :name
      expose :data_type
    end
  end
end
