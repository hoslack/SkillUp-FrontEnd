import React, { useState, useRef, useEffect } from 'react'

const Payment = () => {
  const [paidFor, setPaidFor] = useState(false)
  const [loaded, setLoaded] = useState(false)

  let payPalRef = useRef()

  const product = {
    price: '2.00',
    description: 'Skill App Annual Subscription'
  }

  useEffect(() => {
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
              setPaidFor(true)
              console.log(order)
            }
          })
          .render(payPalRef)
      })
    }
  })
  return (
    <div className="payment">
      {paidFor ? (
        <div>
          <h1>Congrats, Subscription Successful</h1>
        </div>
      ) : (
        <div>
          <h1>
            {product.description} for {product.price}
          </h1>
          <div ref={v => (payPalRef = v)} />
        </div>
      )}
    </div>
  )
}

export default Payment
