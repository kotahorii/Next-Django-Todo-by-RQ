import axios from 'axios'
import { useCallback, useState } from 'react'
import Cookie from 'universal-cookie'
import { Token, User } from '../../types/auth/authTypes'

const cookie = new Cookie()

export const useAuth = () => {
  const [isLogin, setIsLogin] = useState(true)

  const toggleIsLogin = useCallback(() => {
    setIsLogin(!isLogin)
  }, [isLogin])

  const login = async (user: User) => {
    try {
      const res = await axios.post<Token>(
        `${process.env.NEXT_PUBLIC_RESTAPI_URL}jwt/create/`,
        user,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      if (res.status === 200) {
        const options = { path: '/' }
        cookie.set('access_token', res.data.access, options)
      }
    } catch (err) {
      alert(err.message)
    }
  }

  const authUser = async (user: User) => {
    if (isLogin) {
      login(user)
    } else {
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_RESTAPI_URL}register/`,
          user,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        if (res.status === 201) login(user)
      } catch (err) {
        alert(err.message)
      }
    }
  }

  return {
    isLogin,
    toggleIsLogin,
    authUser,
  }
}
