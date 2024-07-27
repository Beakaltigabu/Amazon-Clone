import React, { useContext, useState, useEffect } from 'react'
import classes from './Orders.module.css'
import LayOut from '../../components/Layout/LayOut'
import { collection, query, orderBy, onSnapshot, doc } from 'firebase/firestore'
import { db } from '../../Utility/firebase'
import { DataContext } from '../../components/DataProvider/DataProvider'
import ProductCard from '../../components/Product/ProductCard'

function Orders() {
  const [{user}, dispatch]=useContext(DataContext)
  const [orders, setOrders] = useState([])

  useEffect(() => {
    if (user && user.uid) {
      const ordersRef = collection(db, 'users', user.uid, 'orders');
      const q = query(ordersRef, orderBy('created', 'desc'));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        setOrders(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data()
          }))
        );
      });

      return () => unsubscribe();
    } else {
      setOrders([]);
    }
  }, [user]);




  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.orders__container}>
          <h2>Your Orders</h2>
          {orders?.length==0 && <div style={{padding: '20px'}}>You Don't have Orders Yet.</div>

          }

          <div>
            {
              orders?.map((eachOrder, i)=>{
                return (
                  <div key={i}>
                    <hr />
                    <p>Order ID: {eachOrder?.id}</p>
                    {
                      eachOrder?.data.basket?.map(order=>{

                     return  ( <ProductCard
                        flex={true}
                        product={order}
                        key={order.id}
                        />)

                      })
                    }
                  </div>
                )
              })
            }

          </div>
        </div>
      </section>

    </LayOut>
  )
}

export default Orders
