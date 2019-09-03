# frozen_string_literal: true

class ClassifiedTypesController < ApplicationController
  before_action :check_is_admin

  def index
    classified_types = ClassifiedType.all
    render(status: 200, json: { classified_types: classified_types })
  end

  def create
    ActiveRecord::Base.transaction do
      name = classified_type_params[:name]
      classified_type = ClassifiedType.create(name: name)

      raise classified_type.errors.messages unless classified_type.valid?

      attributes = classified_type_params[:attributes].map do |attr|
        { data_type: attr[:type], name: attr[:name] }
      end

      attributes = classified_type.create_attributes(attributes)
    end


    render(status: 201, json: { classified_type: {
             name: classified_type.name,
             attributes: attributes
           } })
  rescue StandardError => e

    render(status: 400, json: {
             message: 'error_creating_classified_type',
             errors: e.message
           })
  end

  private

  def classified_type_params
    params.require(:classified_type).permit(:name, attributes: [ :value, :type ])
  end

  def check_is_admin
    render(status: 401, json: { message: 'must_be_admin' }) unless current_user && current_user.role == 'admin'
  end
end
