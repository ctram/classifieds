class ClassifiedTypesController < ApplicationController
  def index
    classified_types = ClassifiedType.all
    render(status: 200, json: { classified_types: classified_types })
  end

  def create
    classified_type = ClassifiedType.create(classified_type_params)

    if classified_type.valid?
      return render(status: 201, json: { classified_type: classified_type })
    end

    render(status: 400, json: {
      message: 'classified_type_already_exists',
      errors: classified_type.errors.messages
    })
  end

  private

  def classified_type_params
    params.require(:classified_type).permit(:type, :name)
  end
end
