# frozen_string_literal: true

class ClassifiedTypeAttribute < ApplicationRecord
  validates :data_type, presence: true

  validate :name_must_be_unique_within_classified_type

  belongs_to :classified_type

  private

  def name_must_be_unique_within_classified_type
    classified_type.classified_type_attributes.any? do |attr|
      if attr.name.downcase == name.downcase
        errors.add(:name, 'must be unique among sibling classified_type_attributes of a classified_type')
        return true
      end
    end
  end
end
