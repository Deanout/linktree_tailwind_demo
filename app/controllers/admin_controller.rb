class AdminController < ApplicationController
  before_action :set_nav_display
  before_action :authenticate_user!
  def index
    @links = current_user.links.order(position: :asc)

  end

  def appearance
  end

  def analytics
  end

  def settings
  end

  def update
    current_user.update(user_params)
    redirect_to admin_appearance_path
  end

  private

  def set_nav_display
    @display_nav = true
  end

  def user_params
    params.require(:user).permit(:name, :username, :content, :bio, :profile_theme_id)
  end
end
