class ClassifiedType < ApplicationRecord
  validates :name, presence: true, uniqueness: { case_sensitive: false }

  has_many :classified_type_attributes
  has_many :classifieds
end
