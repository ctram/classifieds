class Habit < ApplicationRecord

  validates :title, presence: true, uniqueness: true
  validates :user_id, presence: true

  belongs_to :user
end