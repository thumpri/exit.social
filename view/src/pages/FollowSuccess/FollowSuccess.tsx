import React from 'react'
import { useParams} from 'react-router'
import { Link} from 'react-router-dom'
import { useQuery } from '@apollo/client'

import SESSION_QUERY from 'apollo/queries/session'
import { SessionInterface } from 'types/users'
import { Loading, ShareLink } from 'ui'

import * as S from './styled'

type RouteParams = {
  userName: string,
  followerName: string
}

const FollowSuccess = () => {
  const params = useParams<RouteParams>()
  const {loading } = useQuery<SessionInterface>(SESSION_QUERY)

  return loading ? (
    <Loading />
  ) : (
    <S.Wrapper>
      <S.Title>Your email was verified</S.Title>
      <S.Description>
        Welcome to the community. Help grow the community. By inviting other followers you are earning points! You can see the best members of our 
        <Link to={`/${params.userName}/leaderboard`}> community here</Link>
        
  
      </S.Description>
      <S.Label>Your Invite link</S.Label>
      <ShareLink
        withButton
        value={`${window.location.protocol}//${window.location.host}${process.env.REACT_APP_VIEW_BASE_URL}/follow/${params.userName}?ref=${params.followerName}`}
        link={`https://twitter.com/intent/tweet?text=By%20sharing%20this%20link%20you%20will%20help%20the%20influencer%20to%20migrate%20to%20a%20new%20platform%20with%20new%20%26%20fresh content.%20${window.location.protocol}//${window.location.host}${process.env.REACT_APP_VIEW_BASE_URL}/follow/${params.userName}?ref=${params.followerName}`}
      />
    </S.Wrapper>
  )
}

export default FollowSuccess
