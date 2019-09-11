# frozen_string_literal: true

module ClassifiedsAPI
  module V1
    class Session < ClassifiedsAPI::V1::API
      resources :sessions do
        get do
          authenticate!

          present :user, current_user, with: Entities::User
          present :message, 'user_signed_in'
        end

        post do
          email, password = params[:user].values_at :email, :password
          user = ::User.find_by_email(email)

          unless user&.authenticate(password)
            error!({ error: 'unauthorized', message: 'authentication_error' }, 401)
          end

          login(user)
          status 200
          present(:user, user, using: Entities::User)
          present(:message, 'user_sign_in_success')
        end

        delete do
          logout
          status(200)
        end
      end
    end
  end
end
