class AdminController < ApplicationController
  before_action :set_nav_display
  before_action :authenticate_user!
  def index
    @links = current_user.links.order(position: :asc)
  end

  def appearance
  end

  def analytics
    @daily_profile_views = current_user.daily_profile_views
    @daily_link_clicks = current_user.daily_link_clicks
    @daily_device_views = current_user.daily_views_by_device_type

    @daily_device_views_by_type = @daily_device_views.map do |device, count|
      { name: device.to_s, data: count }
    end
  end

  def settings
  end

  def update
    current_user.update(user_params)
    redirect_to admin_appearance_path
  end

  def sort
    # Sort the user's links alphabetically and then update the position attribute
    @links = current_user.links.order("LOWER(name)")

    @links.each_with_index do |link, index|
      link.insert_at(index + 1)
      puts "Link #{link.name} has been updated to position #{link.position}"
    end

    redirect_to admin_index_path
  end

  def update_theme
    profile_theme_id = params[:user][:profile_theme_id]
    @theme = Theme.find(profile_theme_id)
    current_user.profile_theme = @theme
    current_user.save
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
