# frozen_string_literal: true

module ClassifiedsAPI
  module V1
    class User < ClassifiedsAPI::V1::API

      resources :users do
        before do
          authenticate!
        end

        get do
          present :users, ::User.all, with: Entities::User
        end

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

        patch ':id' do
          user_id = params[:id].to_i

          if user_id != current_user.id && current_user.role != 'admin'
            error!('unauthorized', 401)
          end

          email, new_password, current_password = params[:user].values_at :email, :new_password, :current_password
          user = ::User.find_by_id(user_id)

          error!('error', 422) unless user

          if current_user.role == 'admin'
            error!('action_not_allowed_for_user', 403)
          end

          user.email = email if email

          if new_password
            unless user.authenticate(current_password) || current_user.role == 'admin'
              error!('incorrect_password', 401)
            end

            user.password = new_password
          end

          unless user.save
            error!({ error: 'user_update_error', detail: user.errors.messages }, 422)
          end

          present :user, user, with: Entities::User
          present :message, 'user_update_success'
        end
      end
    end
  end
end
