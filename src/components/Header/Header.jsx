import React, { useContext } from 'react'
import { FaSearch } from "react-icons/fa";
import { SlLocationPin } from "react-icons/sl";
import { FaShoppingCart } from "react-icons/fa";
import classes from './Header.module.css'
import LowerHeader from './LowerHeader';
import {Link} from 'react-router-dom'
import { DataContext } from '../DataProvider/DataProvider';
import { auth } from '../../Utility/firebase';


function Header() {

    const [{user, basket}, dispatch] =useContext(DataContext)
    const totalItem =basket?.reduce((amount, item)=>{
        return item.amount + amount
      },0)


  return (
    <section className={classes.fixed}>
      <section>
        <section>
            <div className={classes.header__container}>
                {/* logo */}
               <div className={classes.logo__container}>
               <Link to="/">
                    <img src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="Amazon Logo" />
                </Link>
                {/* delivery */}

                <span>
                <SlLocationPin />
                </span>
               </div>


                <div className={classes.delivery}>
                    <p>Delivered to</p>
                    <span>Ethiopia</span>
                </div>

                  {/* search bar */}
                <div className={classes.search}>
                <select name="" id="">
                    <option value="">All</option>
                </select>
                <input type="text" placeholder='search product' />
                <FaSearch />
            </div>

            {/* other sections */}
            <div className={classes.order__container}>

                   <a href="#" className={classes.language}>
                   <img src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/800px-Flag_of_the_United_States.svg.png?20151118161041" alt="US Flag image" />
                    <select>
                        <option value="">EN</option>
                    </select>
                   </a>


                {/* three componenets */}
                <Link to={!user && '/auth'}>
                    <div>
                        {user ? (
                            <>
                                <p>Hello {user?.email?.split('@')[0]}</p>
                                <span onClick={()=>auth.signOut()}>Sign Out</span>
                            </>
                    ) : (
                        <>
                            <p>Hello, Sign In</p>
                            <span>Account & Lists</span>
                        </>

                    )}
                </div>

                </Link>


                {/* Orders */}
               <Link to="/orders">
                    <p>returns</p>
                    <span>& Orders</span>
                </Link>

                {/* Cart */}
                <Link to="/cart"  className={classes.cart}>
                <FaShoppingCart />
                    <span>{totalItem}</span>
                </Link>
            </div>
            </div>



        </section>
    </section>
    <LowerHeader/>
    </section>

  )
}

export default Header
