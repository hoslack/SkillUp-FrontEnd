import React, { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import months from '../../utils/months'
import { updateSubscription } from '../../store/actions/authActions'

const Payment = () => {
  const dispatch = useDispatch()
  const profile = useSelector(state => state.firebase.profile)
  const userSubscription =
    profile.subscription === '' ? '' : new Date(profile.subscription)
  const [paidFor, setPaidFor] = useState(false)
  const [loaded, setLoaded] = useState(false)
  let payPalRef = useRef()

  const product = {
    price: '2.00',
    description: 'Skill App Annual Subscription'
  }

  useEffect(() => {
    if (userSubscription === '' || new Date() > userSubscription) {
      setPaidFor(false)
    } else {
      setPaidFor(true)
    }
    const script = document.createElement('script')
    script.src =
      'https://www.paypal.com/sdk/js?client-id=Aa1piJ7A_oVkv2zVyo_2e1-pIM2UwKlSvO_qmR9d7w4WtNifr165TPT5N_2E40Bx5QENk4pxxE6mRMRo'
    script.addEventListener('load', () => setLoaded(true))
    document.body.appendChild(script)

    if (loaded) {
      setTimeout(() => {
        window.paypal
          .Buttons({
            createOrder: (data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    description: product.description,
                    amount: {
                      currency_code: 'USD',
                      value: product.price
                    }
                  }
                ]
              })
            },
            onApprove: async (data, actions) => {
              const order = await actions.order.capture()
              if (order.status === 'COMPLETED') {
                dispatch(updateSubscription())
                setPaidFor(true)
              }
            }
          })
          .render(payPalRef)
      })
    }
  }, [
    paidFor,
    loaded,
    product.price,
    product.description,
    userSubscription,
    dispatch
  ])
  return (
    <div className="payment">
      <div className="vh-100 ml5-l">
        {paidFor && userSubscription !== '' ? (
          <div>
            <h1>
              Congrats, Your Subscription is active until{' '}
              {months[userSubscription.getMonth()]}{' '}
              {userSubscription.getFullYear()}{' '}
            </h1>
          </div>
        ) : (
          <div>
            {userSubscription < new Date() && userSubscription !== '' && (
              <h1 className="mb3 fw7">Your Subscription Has expired</h1>
            )}
            <h1 className="mb3 fw7">
              {product.description} for ${product.price}
            </h1>
            <div ref={v => (payPalRef = v)} />
          </div>
        )}
      </div>
    </div>
  )
}

export default Payment
