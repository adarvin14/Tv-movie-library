class Catalog < ApplicationRecord
    has_many :movies
    validates_uniqueness_of :name
end
