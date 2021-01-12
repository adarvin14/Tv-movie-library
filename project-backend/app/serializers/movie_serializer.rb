class MovieSerializer < ActiveModel::Serializer
    attributes :id, :title, :release_year
    belongs_to :catalog
end 