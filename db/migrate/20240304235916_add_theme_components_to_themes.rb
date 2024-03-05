class AddThemeComponentsToThemes < ActiveRecord::Migration[7.1]
  def change
    add_column :themes, :background_color, :string
    add_column :themes, :font_color, :string
    add_column :themes, :link_color, :string
    add_column :themes, :link_font_color, :string
  end
end
