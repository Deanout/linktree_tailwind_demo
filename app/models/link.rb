class Link < ApplicationRecord
  belongs_to :user
  acts_as_list
  validates :name, presence: true
  validates :url, presence: true
  # If the link's active attribute is nil, set it to false
  before_save :set_active

  # When a link is updated we need to broadcast that change to
  # the profile_links stream. This will update the link on the
  # Profile show page.
  after_update_commit do
    broadcast_replace_to "profile_links_#{user_id}",
      target: "links_container",
      partial: "profiles/links",
      locals: { links: user.links.where(active: true).order(position: :asc) }
  end

  private

  def set_active
    self.active = false if self.active.nil?
  end

end
