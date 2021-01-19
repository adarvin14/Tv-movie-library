class CreateMovies < ActiveRecord::Migration[6.0]
  def change
    create_table :movies do |t|
      t.string :title
      t.integer :release_year
      t.integer :catalog_id

      t.timestamps
    end
  end
end
