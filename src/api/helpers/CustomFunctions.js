'use strict'

const generateOTP = () => {
  // Declare a digits variable
  // which stores all digits
  const digits = '0123456789'
  let OTP = ''
  for (let i = 0; i < 4; i++) {
    OTP += digits[Math.floor(Math.random() * 10)]
  }
  return OTP
}

const generatePassword = () => {
  const length = 8
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let retVal = ''
  for (let i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n))
  }
  return retVal
}

export const CustomFunctions = {
  generateOTP,
  generatePassword
}
