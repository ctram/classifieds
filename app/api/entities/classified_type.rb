module Entities
  class ClassifiedType < Grape::Entity
    expose :id
    expose :name
    expose :classified_type_attributes, using: ClassifiedTypeAttribute
  end
end
