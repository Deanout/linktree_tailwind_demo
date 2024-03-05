class Theme < ApplicationRecord
  def self.default_css_value
    '--light-theme'
  end

  def self.default_theme
    find_by(css_value: default_css_value)
  end
end
