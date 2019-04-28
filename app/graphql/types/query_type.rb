module Types
  class QueryType < Types::BaseObject
    field :all_products, [ProductType], null: false do
      description "Queries all products"
    end

    field :product, ProductType, null: true do
      description "Find a product by id"
      argument :id, ID, required: true
    end

    def all_products
      Product.all
    end

    def product(id:)
      Product.find(id)
    end
  end
end
