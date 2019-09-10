# frozen_string_literal: true

module ClassifiedsAPI
  module V1
    class API < Grape::API
      version 'v1', using: :path
      format :json
      prefix :api

      use ActionDispatch::Session::CookieStore

      helpers do
        def session
          env['rack.session']
        end

        def login(user)
          session[:user_id] = user.id
          @current_user = user
        end

        def logout
          session[:user_id] = nil
          @current_user = nil
        end

        def current_user
          @current_user = User.find_by_id(session[:user_id])
        end

        def authenticate!
          error!('unauthorized', 401) unless current_user
        end
      end

      mount ClassifiedsAPI::V1::Session
    end
  end
end
