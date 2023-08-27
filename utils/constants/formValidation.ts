interface response {
  pass: boolean
  error: string
  minLength?: number
}

export interface sucessResponse {
  pass: boolean
  passType: 'email' | 'username' | 'none'
  error: string
}

export function usernameValidate(
  username: string,
  minLength: number = 4,
  maxLength: number = 10
): response {
  const validUsernameRegex = /^[a-z0-9_\-]+$/

  const zeroLengthError = 'Username is required!'
  const sizeError = `Username must be ${minLength} - ${maxLength} characters long!`
  const invalidUsernameError =
    'Username must only contain lower-case letters, numbers and only one symbol out of "-" or "_".'

  const response: response = { pass: true, error: '', minLength: minLength }

  if (username.length === 0) {
    response.pass = false
    response.error = zeroLengthError
  } else if (username.length < minLength || username.length > maxLength) {
    response.pass = false
    response.error = sizeError
  } else if (!username.match(validUsernameRegex)) {
    response.pass = false
    response.error = invalidUsernameError
  }

  return response
}

export function emailValidate(email: string, maxLength: number = 35): response {
  const validEmailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

  const zeroLengthError = 'Email is required!'
  const overSizeEmailError = `Email must not exceed ${maxLength} characters!`
  const invalidEmailError = 'Email is not valid!'

  const response: response = { pass: true, error: '' }

  if (email.length === 0) {
    response.pass = false
    response.error = zeroLengthError
  } else if (email.length > maxLength) {
    response.pass = false
    response.error = overSizeEmailError
  } else if (!email.match(validEmailRegex)) {
    response.pass = false
    response.error = invalidEmailError
  }

  return response
}

export function otpValidate(otp: string, size: number = 6): response {
  const OTPError = `OTP must be a ${size} digit number!`
  const response: response = { pass: true, error: '' }

  const validOTPRegex = /^[0-9]*$/

  if (otp.length !== size || !otp.match(validOTPRegex)) {
    response.pass = false
    response.error = OTPError
  }
  return response
}

export function passwordValidate(
  password: string,
  minLength: number = 8,
  maxLength: number = 20
): response {
  const zeroLengthError = 'Password is required!'
  const underSizeError = `Password must be atleast ${minLength} characters long!`
  const overSizeError = `Password must be atmost ${maxLength} characters long!`

  const response: response = { pass: true, error: '', minLength: minLength }

  if (password.length === 0) {
    response.pass = false
    response.error = zeroLengthError
  } else if (password.length < minLength) {
    response.pass = false
    response.error = underSizeError
  } else if (password.length > maxLength) {
    response.pass = false
    response.error = overSizeError
  }

  return response
}

export function signupValidation(
  name: string,
  email: string,
  password: string
): response {
  const successResponse: response = { pass: true, error: '' }

  const nameResponse = usernameValidate(name)
  if (!nameResponse.pass) return nameResponse

  const emailResponse = emailValidate(email)
  if (!emailResponse.pass) return emailResponse

  const passwordResponse = passwordValidate(password)
  if (!passwordResponse.pass) return passwordResponse

  return successResponse
}

// export function signinValidation(
//   emailOrUsername: string,
//   password: string
// ): response {
//   const successResponse: response = { pass: true, error: '' }

//   const emailResponse = emailValidate(emailOrUsername)
//   if (!emailResponse.pass) {
//     emailResponse.error = 'Credentials do not match!'
//     return emailResponse
//   }

//   const UsernameResponse = usernameValidate(emailOrUsername)
//   if (!UsernameResponse.pass) {
//     emailResponse.error = 'Credentials do not match!'
//     return emailResponse
//   }

//   const passwordResponse = passwordValidate(password)
//   if (!passwordResponse.pass) return passwordResponse

//   return successResponse
// }
