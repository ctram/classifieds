class User < ApplicationRecord
  has_secure_password

  validates :email, presence: true, uniqueness: true
  validates :role, presence: true

  has_many :habits
end
