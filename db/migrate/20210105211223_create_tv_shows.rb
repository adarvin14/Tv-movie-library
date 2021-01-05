class CreateTvShows < ActiveRecord::Migration[6.0]
  def change
    create_table :tv_shows do |t|
      t.string :title
      t.integer :release_year
      t.integer :seasons

      t.timestamps
    end
  end
end
