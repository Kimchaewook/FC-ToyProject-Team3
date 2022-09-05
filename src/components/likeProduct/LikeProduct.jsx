import React, { useState } from 'react'
import * as S from './LikeProductStyle'
import { useWishListQuery, useGetUserDataQuery, useWishListAllDeleteMutation } from '../../api/useApi'
import ProductItem from '../../common/ProductItem/ProductItem'
import { useCookies } from 'react-cookie'

function LikeProduct() {
  const [cookies] = useCookies()
  const token = cookies.accessToken
  const { data: whihList, isLoadding } = useWishListQuery(token)
  const { data: username } = useGetUserDataQuery(token)
  const [allDeleteList] = useWishListAllDeleteMutation()
  if (isLoadding) {
    return <div>로딩중...</div>
  }

  return (
    <>
      {!token ? (
        <S.ScrollBar>
          <S.Title>관심 상품 목록</S.Title>
          <div>로그인 후 이용해 주세요!</div>
        </S.ScrollBar>
      ) : (
        <>
          <S.User>{username && <S.Username>{username.username}</S.Username>} 회원님 관심상품</S.User>
          <S.ScrollBar>
            <S.deleteBtnContainer>
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => {
                  allDeleteList(token)
                }}
              >
                전체삭제
              </Button>
            </S.deleteBtnContainer>
            {whihList &&
              whihList.map(list => {
                return (
                  <div key={list.productId}>
                    <ProductItem name={list.name} loan={list.loan} logo={list.logo} productId={list.productId} />
                  </div>
                )
              })}
          </S.ScrollBar>
        </>
      )}
    </>
  )
}

export default LikeProduct
