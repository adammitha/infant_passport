# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
Parent.create!(first_name: "Adam", last_name: "Mitha", email: "adam@example.com", password: "foobar18", password_confirmation: "foobar18", activated: true, activated_at: Time.zone.now, admin: true)

Parent.create!(first_name: "Obi Wan", last_name: "Kenobi", email: "obiwan@jedi.com", password: "password", password_confirmation: "password", activated: true, activated_at: Time.zone.now)
parent = Parent.find(2)
parent.children.create!(first_name: "Han", last_name: "Solo", date_of_birth: 1.year.ago, gender: false)

99.times do |n|
  first_name = Faker::Name.first_name
  last_name = Faker::Name.last_name
  email = "example-#{n+1}@infantpassport.ca"
  password = "password"
  Parent.create!(first_name: first_name, last_name: last_name, email: email, password: password, password_confirmation: password, activated: true, activated_at: Time.zone.now, admin: false)
  parent = Parent.find(n+2)
  gender = rand(2) == 1
  number_of_months = 1 + rand(24)
  parent.children.create!(first_name: Faker::Name.first_name, last_name: Faker::Name.last_name, date_of_birth: number_of_months.months.ago, gender: gender)
end
