# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160117205324) do

  create_table "allergies", force: :cascade do |t|
    t.integer  "timeline_id"
    t.string   "name"
    t.integer  "severity"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "allergies", ["timeline_id"], name: "index_allergies_on_timeline_id"

  create_table "charts", force: :cascade do |t|
    t.integer  "child_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "charts", ["child_id"], name: "index_charts_on_child_id"

  create_table "children", force: :cascade do |t|
    t.text     "first_name"
    t.text     "last_name"
    t.datetime "date_of_birth"
    t.boolean  "gender"
    t.integer  "parent_id"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  add_index "children", ["parent_id", "date_of_birth"], name: "index_children_on_parent_id_and_date_of_birth"
  add_index "children", ["parent_id"], name: "index_children_on_parent_id"

  create_table "heights", force: :cascade do |t|
    t.integer  "chart_id"
    t.float    "value"
    t.datetime "date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "heights", ["chart_id"], name: "index_heights_on_chart_id"

  create_table "parents", force: :cascade do |t|
    t.string   "first_name"
    t.string   "email"
    t.datetime "created_at",                        null: false
    t.datetime "updated_at",                        null: false
    t.string   "password_digest"
    t.string   "last_name"
    t.string   "remember_digest"
    t.string   "activation_digest"
    t.boolean  "activated",         default: false
    t.datetime "activated_at"
    t.string   "reset_digest"
    t.datetime "reset_sent_at"
    t.boolean  "admin",             default: false
    t.boolean  "suspended",         default: false
  end

  add_index "parents", ["email"], name: "index_parents_on_email", unique: true

  create_table "timelines", force: :cascade do |t|
    t.integer  "child_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "timelines", ["child_id"], name: "index_timelines_on_child_id"

  create_table "vaccinations", force: :cascade do |t|
    t.integer  "timeline_id"
    t.string   "name"
    t.datetime "date"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "vaccinations", ["timeline_id"], name: "index_vaccinations_on_timeline_id"

  create_table "weights", force: :cascade do |t|
    t.integer  "chart_id"
    t.float    "value"
    t.datetime "date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "weights", ["chart_id"], name: "index_weights_on_chart_id"

end
