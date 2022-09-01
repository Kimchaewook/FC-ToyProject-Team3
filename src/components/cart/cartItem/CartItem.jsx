import React, { useState } from 'react'
import * as S from './CartItemStyle'
import { BsCartX } from 'react-icons/all'
import {useGetCartQuery} from '../../../api/useApi'
import { Cookies } from 'react-cookie'


function CartItem() {
  const cookies = new Cookies()
  const token = cookies.get('accessToken')

  const {data: carts} = useGetCartQuery(token);
 

  return (
    <>
      {carts && carts.map((cart) => (
        <>
          <S.Container>
            <S.Logo>
              <S.Img src={cart.logo}/>
            </S.Logo>
            <S.ProductInfo>
              <div>{cart.name}</div>
              <div>{cart.loan} 원</div>
            </S.ProductInfo>
            <S.Cancel>
              <BsCartX />
            </S.Cancel>
          </S.Container>
        </>
      ))}
      
    </>
  )
}

export default CartItem
