require 'zxcvbn'

class User < ApplicationRecord
  validates :username, presence: true, length: { minimum: 10, maximum: 50 }
  validates :password, presence: true, length: { minimum: 20, maximum: 50 }
  
  # https://guides.rubyonrails.org/active_record_validations.html#custom-validators
  # https://guides.rubyonrails.org/active_record_validations.html#custom-methods
  validate :uniqueness_of_username
  validate :customPasswordHasACharacter
  validate :customPasswordHasADigit
  validate :customPasswordzxcvbnScore


  def uniqueness_of_username
    existing_record = User.find_by({:username=> username})
    unless existing_record.nil?
      errors.add(:username, "The username: #{username} is already taken, please try another")
    end
 end
 

  def customPasswordHasACharacter
    unless password.match?(/[a-zA-Z]/) 
      errors.add(:password, 'Missing a lower or uppercase charcter')
    end
  end

  def customPasswordHasADigit
    unless password.match?(/\d/)
      errors.add(:password, 'Missing a digit')
    end
  end

  def customPasswordzxcvbnScore
    pwObject = Zxcvbn.test(password)
    if pwObject.score < 2
      errors.add(:password, 'Please add more digits your password is not strong enough')
    end

  end

  def self.validate_username
  end

  def self.validate_password
  end
end
