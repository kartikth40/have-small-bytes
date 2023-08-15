interface response {
  pass: boolean
  error: string
  minLength?: number
}

export function nameValidate(
  name: string,
  minLength: number = 3,
  maxLength: number = 15
): response {
  const zeroLengthError = 'Name is required!'
  const sizeError = `Name must be ${minLength} - ${maxLength} characters long!`

  const response: response = { pass: true, error: '', minLength: minLength }

  if (name.length === 0) {
    response.pass = false
    response.error = zeroLengthError
  } else if (name.length < minLength || name.length > maxLength) {
    response.pass = false
    response.error = sizeError
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

  const nameResponse = nameValidate(name)
  if (!nameResponse.pass) return nameResponse

  const emailResponse = emailValidate(email)
  if (!emailResponse.pass) return emailResponse

  const passwordResponse = passwordValidate(password)
  if (!passwordResponse.pass) return passwordResponse

  return successResponse
}

export function signinValidation(email: string, password: string): response {
  const successResponse: response = { pass: true, error: '' }

  const emailResponse = emailValidate(email)
  if (!emailResponse.pass) return emailResponse

  const passwordResponse = passwordValidate(password)
  if (!passwordResponse.pass) return passwordResponse

  return successResponse
}
