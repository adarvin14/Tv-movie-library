class Catalog < ApplicationRecord
    has_many :movies
    has_many :tv_shows
end
