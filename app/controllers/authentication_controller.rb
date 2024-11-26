class AuthenticationController < ApplicationController
  include TokenHelper
  # https://dev.to/mohhossain/a-complete-guide-to-rails-authentication-using-jwt-403p
  

  # This is needed to skip CORS we are using jwtToken auth instead.
  # https://stackoverflow.com/questions/37945850/actioncontrollerinvalidauthenticitytoken-error-in-controller
  # https://stackoverflow.com/questions/9439313/when-to-skip-verify-authenticity-token
  skip_before_action :verify_authenticity_token

  def verify_token
    # https://stackoverflow.com/questions/44323531/how-to-get-bearer-token-passed-through-header-in-rails
    token = request.headers['Authorization'].split(' ').last

    # https://stackoverflow.com/questions/15988960/testing-for-empty-or-nil-value-string
    if(token.blank?)
      render json: {allowed: false, error: "No authorization token received"}, status: :unauthorized
      return
    end

    begin
      decodedValue = decodeToken(token)
      if(decodedValue.blank?)
        render json: { allowed: false, error: "Token could not be decoded" }, status: :unauthorized
        return
      end
    rescue => e
      render json: { allowed: false, error: "Token could not be decoded" }, status: :unauthorized
      return
    end

    # Checking DB to see if we have a valid user with this token
    userTemp =  User.find_by username: decodedValue["username"]
    foundUser = userTemp != nil

    if foundUser 
      render json: { allowed: true }, status: :ok
      return
    else
      render json: { allowed: false, error:"Unknown error" }, status: :unauthorized
      return
    end
    
  end

  




end
