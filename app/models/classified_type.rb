# frozen_string_literal: true

class ClassifiedType < ApplicationRecord
  validates :name, presence: true, uniqueness: { case_sensitive: false }

  has_many :classified_type_attributes
  has_many :classifieds

  def create_attributes(attributes)
    return if attributes.empty?

    ActiveRecord::Base.transaction do
      attributes.each do |attr|
        classified_type_attribute = classified_type_attributes.create(attr)

        unless classified_type_attribute.valid?
          raise classified_type_attribute.errors.messages
        end
      end
    end

    classified_type_attributes
  end
end
