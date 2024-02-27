class Link < ApplicationRecord
  belongs_to :user
  acts_as_list
  validates :name, presence: true
  validates :url, presence: true
  # If the link's active attribute is nil, set it to false
  before_save :set_active

  after_create_commit :broadcast_create_link
  after_update_commit :replace_all_links
  after_destroy_commit :delete_link


  private

  def set_active
    self.active = false if self.active.nil?
  end

  def broadcast_create_link
    broadcast_append_to "admin_links_#{user_id}",
      target: "links",
      partial: "links/admin_link",
      locals: { link: self }
  end

  def replace_all_links
    replace_links
  end

  def delete_link
    replace_links
  end

  def replace_links
    broadcast_replace_to "profile_links_#{user_id}",
      target: "links_container",
      partial: "profiles/links",
      locals: { links: user.links.where(active: true).order(position: :asc) }

    broadcast_replace_to "admin_links_#{user_id}",
      target: "links",
      partial: "links/admin_links",
      locals: { links: user.links }
  end
end
