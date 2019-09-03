# frozen_string_literal: true

class Classified < ApplicationRecord
  validates :name, presence: true, uniqueness: { case_sensitive: false }
end
