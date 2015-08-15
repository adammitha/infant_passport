# Preview all emails at http://localhost:3000/rails/mailers/parent_mailer
class ParentMailerPreview < ActionMailer::Preview

  # Preview this email at http://localhost:3000/rails/mailers/parent_mailer/account_activation
  def account_activation
    parent = Parent.first
    parent.activation_token = Parent.new_token
    ParentMailer.account_activation(parent)
  end

  # Preview this email at http://localhost:3000/rails/mailers/parent_mailer/password_reset
  def password_reset
    ParentMailer.password_reset
  end

end
