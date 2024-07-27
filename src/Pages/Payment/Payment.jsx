import React, { useContext, useState } from 'react'
import classes from './Payment.module.css'
import LayOut from '../../components/Layout/LayOut'
import { DataContext } from '../../components/DataProvider/DataProvider'
import ProductCard from '../../components/Product/ProductCard'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import CurrencyFormat from '../../components/CurrencyFormat/CurrencyFormat'
import { axiosInstance } from '../../API/axios'
import { ClipLoader } from 'react-spinners'
import { db } from '../../Utility/firebase'
import { collection, addDoc } from 'firebase/firestore';
import {Link, useNavigate, useLocation} from 'react-router-dom'
import { Type } from '../../Utility/action.type'

function Payment() {
  const [{ user, basket }, dispatch] = useContext(DataContext);

  const totalItems = basket?.reduce((amount, item) => {
    return amount + item.amount;
  }, 0)

  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount
  }, 0)

  const stripe = useStripe();
  const elements = useElements();
  const navigate=useNavigate();
  const navStateData=useLocation();

  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleChange = (e) => {
    e?.error?.message ? setCardError(e?.error?.message) : setCardError("")
  }
  const handlePayment = async (e) => {
    e.preventDefault()
    try {
      setProcessing(true)

      const response = await axiosInstance({
        method: "POST",
        url: `https://api-vfn556glta-uc.a.run.app/payment/create?total=${total * 100}`
      });
      const clientSecret = response.data?.clientSecret;

      const confirmation = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement)
          },
        }
      );

      if (confirmation.paymentIntent && user && user.uid) {
        const userOrdersRef = collection(db, 'users', user.uid, 'orders');
        await addDoc(userOrdersRef, {
          basket: basket,
          amount: confirmation.paymentIntent.amount,
          created: confirmation.paymentIntent.created,
        });

        dispatch({type: Type.EMPTY_BASKET})
      /*   setBasket([]); */
      }



      setProcessing(false)
      navigate("/orders", {state: {msg:"you have placed new Order"}})
    } catch (error) {
      console.log(error);
      setProcessing(false)
    }
  };

 /*  const handlePayment = async (e) => {
    e.preventDefault()
    try {
      setProcessing(true)

      const response = await axiosInstance({
        method: "POST",
        url: `http://127.0.0.1:5001/clone-f6ae6/us-central1/api/payment/create?total=${total * 100}`
      });
      const clientSecret = response.data?.clientSecret;

      const confirmation = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement)
          },
        }
      );

      if (confirmation.paymentIntent) {
        await addDoc(collection(db, 'users', user.uid, 'orders'), {
          basket: basket,
          amount: confirmation.paymentIntent.amount,
          created: confirmation.paymentIntent.created,
        });
      }

      setProcessing(false)
      navigate("/orders", {state: {msg:"you have placed new Order"}})
    } catch (error) {
      console.log(error);
      setProcessing(false)
    }
  };
 */
  return (
    <LayOut>
      <div className={classes.payment__header}>Checkout {totalItems} items</div>

      <section className={classes.payment}>
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user.email}</div>
            <div>123 react</div>
            <div>addis ababa</div>
          </div>
        </div>

        <hr />
        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {
              basket?.map((item) =>
                <ProductCard key={item.id} product={item} flex={true} />)
            }
          </div>
        </div>

        <hr />
        <div className={classes.flex}>
          <h3>Payment Methods</h3>
          <div className={classes.payment__card__container}>
            <div className={classes.payment__details}>
              <form onSubmit={handlePayment}>
                {cardError && <small style={{ color: 'red' }}>{cardError}</small>}
                <CardElement onChange={handleChange} />

                <div className={classes.payment__price}>
                  <div>
                    <span style={{ display: 'flex', gap: '10px' }}>
                      <p>Total Order | </p> <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button type="submit">
                    {processing ? (
                      <div className={classes.loading}>
                        <ClipLoader color="gray" size={12} />
                        <p>Please Wait...</p>
                      </div>
                    ) : ("Pay Now")
                    }
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  )
}

export default Payment
