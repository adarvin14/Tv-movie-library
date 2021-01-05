json.extract! tv_show, :id, :title, :release_year, :seasons, :created_at, :updated_at
json.url tv_show_url(tv_show, format: :json)
