class Link < ApplicationRecord
  belongs_to :user
  acts_as_list
  validates :name, presence: true
  validates :url, presence: true
  # If the link's active attribute is nil, set it to false
  before_save :set_active

  private

  def set_active
    self.active = false if self.active.nil?
  end

end
