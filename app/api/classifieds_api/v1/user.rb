module ClassifiedsAPI
  module V1
    class User < ClassifiedsAPI::V1::API
      resources :users do
        post do
          email, password = params[:user].values_at :email, :password
          user = ::User.find_by_email(email)

          error!('email_already_taken', 409) if user

          user = ::User.create(email: email, password: password)

          unless user.valid?
            error!({ detail: user.errors.messages, error: 'user_creation_error', message: 'user_creation_error' }, 422)
          end

          present :user, user, using: Entities::User
          present :message, 'user_creation_success'
        end
      end
    end
  end
end
