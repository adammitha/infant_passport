# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
Parent.create(first_name: "Adam", last_name: "Mitha", email: "adam@example.com", password: "foobar18", password_confirmation: "foobar18")
parent = Parent.first
parent.children.create!(first_name: "Han", last_name: "Solo", date_of_birth: 1.year.ago, gender: false)
