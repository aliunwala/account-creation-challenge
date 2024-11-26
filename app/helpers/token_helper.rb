
module TokenHelper
  require 'jwt'

  # Returns a token
  def encodeToken(payload)
    # TODO: Make this into a ENV variable, need to explore how to do this in RoR
    secret = "PIJ6qEh*z3BfgQ%nn@@26XVcUTIx4w%J&2Vwgi9G&x1DYeeS8Zd9i@2c1TnZL"  
    JWT.encode(payload, secret)
  end
  
  def decodeToken(token)
    # TODO: Make this into a ENV variable, need to explore how to do this in RoR
    secret = "PIJ6qEh*z3BfgQ%nn@@26XVcUTIx4w%J&2Vwgi9G&x1DYeeS8Zd9i@2c1TnZL"  
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