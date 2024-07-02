'use strict'

const checkSubscriptionStatus = async (subscriptionId, stripe) => {
  const subscription = await stripe.subscriptions.retrieve(
    subscriptionId
  )

  return subscription.status
}

export const PaymentsHelper = {
  checkSubscriptionStatus
}
