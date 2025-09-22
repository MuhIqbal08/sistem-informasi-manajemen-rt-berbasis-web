import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { GetMe } from '../../features/authSlice'
import Layout from './Layout'
import Home from '../../components/Home'

const HomePage = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(GetMe())
  }, [dispatch])

  return (
    <Layout>
      <Home />
    </Layout>
  )
}

export default HomePage