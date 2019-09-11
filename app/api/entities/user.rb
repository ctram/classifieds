# frozen_string_literal: true

module Entities
  class User < Grape::Entity
    expose :email
    expose :id
  end
end
