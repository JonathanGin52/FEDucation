require 'faker'

Product.destroy_all

100.times do
  name = Faker::Commerce.product_name
  description = Faker::Lorem.paragraph
  price = Faker::Commerce.price

  Product.create(name: name, description: description, price: price)
end
