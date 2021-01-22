class CatalogSerializer < ActiveModel::Serializer
    attributes :id, :name
    has_many :movies

    validates_uniqueness_of :name
end    