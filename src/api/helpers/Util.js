'use strict'

const maskNumber = (number) => {
  return getStar(number.length - 4) + number.slice(number.length - 4)
}

const getStar = (length) => {
  let starString = ''
  for (let i = 0; i < length; i++) {
    starString += '*'
  }
  return starString
}

export const Utils = { maskNumber, getStar }
