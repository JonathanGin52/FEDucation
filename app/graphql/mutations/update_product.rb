module Mutations
  class UpdateProduct < BaseMutation
    argument :id, ID, required: true
    argument :name, String, required: false
    argument :description, String, required: false
    argument :price, Float, required: false

    field :product, Types::ProductType, null: true
    field :errors, [String], null: false

    def resolve(id:, name:, description:, price:)
      product = Product.find(id)
      if product.update(name: name, description: description, price: price)
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
