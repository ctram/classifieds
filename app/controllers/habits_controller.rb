class HabitsController < ApplicationController
  before_action :verify_user_logged_in

  def index
    timezone_offset = request.headers['X-Timezone-Offset']

    render(status: 200, json: { habits: habits_plus_info(timezone_offset) })
  end

  def create
    habit = current_user.habits.create(habit_params)

    render(status: 201, json: { habit: habit })
  end

  def destroy
    habit = Habit.find(params[:id])
    habit.destroy

    render(status: 204, json: {})
  end

  def update_habit_completed_for_date
    id, date, completed = habit_params.values_at :id, :date, :completed

    habit = Habit.find(id)

    return render(status: 400, json: { message: 'HabitNotFound' }) unless habit

    if completed
      habit.dates[date] = true
    else
      habit.dates.delete(date)
    end

    habit.save
    render(status: 200, json: { habit: habit })
  end

  private

  def habit_params
    params.require(:habit).permit(:title, :date, :completed, :id)
  end

  # TODO: we can expose this using entity gem
  def habits_plus_info(timezone_offset)
    current_user.habits.sort do |a,b|
      a.title <=> b.title
    end.map do |habit|
      habit.as_json.merge(
        num_days_longest_streak: habit.num_days_longest_streak,
        num_days_current_streak: habit.num_days_current_streak(timezone_offset)
      )
    end
  end
end
