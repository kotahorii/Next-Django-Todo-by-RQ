import axios from 'axios'
import { useRouter } from 'next/router'
import { ChangeEvent, FormEvent, useCallback, useState } from 'react'
import Cookie from 'universal-cookie'
import { Token, User } from '../../types/auth/authTypes'

const cookie = new Cookie()

export const useAuth = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleUsername = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }, [])

  const handlePassword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }, [])

  const toggleIsLogin = useCallback(() => {
    setIsLogin(!isLogin)
  }, [isLogin])

  const login = async () => {
    try {
      const res = await axios.post<Token>(
        `${process.env.NEXT_PUBLIC_RESTAPI_URL}jwt/create/`,
        { username: username, password: password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      if (res.status === 200) {
        const options = { path: '/' }
        cookie.set('access_token', res.data.access, options)
        router.push('/tasks')
      }
    } catch (err) {
      alert(err.message)
    }
  }

  const authUser = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (isLogin) {
        setIsLoading(true)
        login()
        setIsLoading(false)
      } else {
        try {
          setIsLoading(true)
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_RESTAPI_URL}register/`,
            { username: username, password: password },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          )
          if (res.status === 201) login()
        } catch (err) {
          alert(err.message)
        } finally {
          setIsLoading(false)
        }
      }
    },
    [isLogin, username, password]
  )

  return {
    isLogin,
    username,
    password,
    handleUsername,
    handlePassword,
    toggleIsLogin,
    isLoading,
    authUser,
  }
}
