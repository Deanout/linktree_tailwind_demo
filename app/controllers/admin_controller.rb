class AdminController < ApplicationController
  before_action :set_nav_display
  before_action :authenticate_user!
  def index
  end

  def appearance
  end

  def analytics
  end

  def settings
  end

  private

  def set_nav_display
    @display_nav = true
  end
end
