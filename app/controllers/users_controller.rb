class UsersController < ApplicationController
  include TokenHelper

  # This is needed to skip CORS. For the create_account action, all other actions on the server will need to be authenticated.
  # https://stackoverflow.com/questions/37945850/actioncontrollerinvalidauthenticitytoken-error-in-controller
  # https://stackoverflow.com/questions/9439313/when-to-skip-verify-authenticity-token
  skip_before_action :verify_authenticity_token, only: [:create_account]
  
  def create_account
    username = params[:username]
    password = params[:password]

    begin
      user = User.new(username: username, password: password)
      if user.save
        token = encodeToken(make_token(user))
        render json: { token: token }, status: :ok
      else
        render json: { error: "Was not able to save data to the database, Errors Triggered: " + user.errors.full_messages.join(', ') }, status: :unprocessable_entity
      end
    rescue => e
      render json: { error: "Unknown Error: "+e.message+" "+ user.errors.full_messages.join(',') }, status: :internal_server_error
    end
  end

  # https://stackoverflow.com/questions/4492557/convert-ruby-date-to-integer
  def make_token(user)
    currentTime = Time.now
    currentTime = currentTime.to_i
    # One day to expire
    # https://github.com/jwt/ruby-jwt?tab=readme-ov-file#expiration-time-claim
    expirationTime = currentTime + 86400 
    return { username: user.username, exp: expirationTime }
  end


end
