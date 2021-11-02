import { useRouter } from 'next/router'
import { ChangeEvent, FormEvent, useCallback, useState } from 'react'
import Cookie from 'universal-cookie'
import { client } from '../../lib/fetch'
import { Token } from '../../types/auth/authTypes'

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
      await client
        .post(`auth/jwt/create/`, {
          json: {
            username: username,
            password: password,
          },
        })
        .then((res): Promise<Token> => {
          if (res.status === 400) {
          } else if (res.ok) {
            return res.json()
          }
        })
        .then((data) => {
          const options = { path: '/' }
          cookie.set('access_token', data.access, options)
        })
      router.push('/tasks')
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
          await client
            .post(`${process.env.NEXT_PUBLIC_RESTAPI_URL}register/`, {
              json: { username: username, password: password },
            })
            .then((res) => {
              if (res.status === 400) {
                throw 'authentication failed'
              }
            })
          login()
        } catch (err) {
          alert(err.message)
        } finally {
          setIsLoading(false)
        }
      }
    },
    [isLogin, username, password] //eslint-disable-line
  )
  const logout = () => {
    cookie.remove('access_token')
  }

  return {
    isLogin,
    username,
    password,
    handleUsername,
    handlePassword,
    toggleIsLogin,
    isLoading,
    authUser,
    logout,
  }
}
