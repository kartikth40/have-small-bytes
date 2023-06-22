import jwt, { JwtPayload } from 'jsonwebtoken'

interface signOption {
  expiresIn?: string | Number
}

const DEFAULT_SIGN_OPTION: signOption = { expiresIn: '1h' }

export function signJwtAccessToken(
  payload: JwtPayload,
  options: signOption = DEFAULT_SIGN_OPTION
) {
  const secretKey = process.env.JWT_SECRET
  const token = jwt.sign(payload, secretKey!)
  return token
}
export function verifyJwt(token: string) {
  try {
    const secretKey = process.env.JWT_SECRET
    const decoded = jwt.verify(token, secretKey!)
    return decoded as JwtPayload
  } catch (err) {
    console.log(err)
    return null
  }
}
