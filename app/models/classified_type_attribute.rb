# frozen_string_literal: true

class ClassifiedTypeAttribute < ApplicationRecord
  validates :name, presence: true, uniqueness: { case_sensitive: false }
  validates :data_type, presence: true

  belongs_to :classified_type
end
