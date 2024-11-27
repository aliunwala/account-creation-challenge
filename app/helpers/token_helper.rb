
module TokenHelper
  require 'jwt'
  require 'dotenv'


  # Returns a token
  def encodeToken(payload)
    secret = ENV["SECRET_KEY_TOKEN"]
    JWT.encode(payload, secret)
  end
  
  def decodeToken(token)
    secret = ENV["SECRET_KEY_TOKEN"]
    if token.is_a? String
      token = JSON.parse(token)
    end
    begin
      # return "authorized"
        return JWT.decode(token, secret , true, { algorithm: 'HS256' })[0]
    rescue JWT::ExpiredSignature
      # Handle expired token, e.g. logout user or deny access
      return false
    rescue JWT::DecodeError => e
      # Handle modified token
      return false
    end
  end
  




end