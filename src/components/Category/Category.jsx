import React from 'react'
import CategoryCard from './CategoryCard'
import {CategoryInfos} from './categoryFullInfos'
import classes from "./Category.module.css"

function Category() {
  return (
    <div>
        <section className={classes.category__container}>
            {
                CategoryInfos.map((infos) => {
                    return (
                        <CategoryCard data={infos}/>
                    )
                })
            }
        </section>

    </div>
  )
}

export default Category
