class Movie < ApplicationRecord
    belongs_to :catalog
    accepts_nested_attributes_for :catalog, reject_if: :all_blank
end
