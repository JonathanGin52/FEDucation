module Mutations
  class CreateProduct < BaseMutation
    argument :name, String, required: true
    argument :description, String, required: false
    argument :price, Float, required: true

    field :product, Types::ProductType, null: true
    field :errors, [String], null: true

    def resolve(name:, description: "", price:)
      product = Product.new(name: name, description: description, price: price)

      if product.save
        {
          product: product,
          errors:  [],
        }
      else
        {
          product: nil,
          errors:  product.errors.full_messages,
        }
      end
    end
  end
end
