import React, { useEffect } from 'react'
import Layout from './Layout'
import { useDispatch, useSelector } from 'react-redux'
import { GetMe } from '../../features/authSlice'
import { useNavigate } from 'react-router-dom'
import KeuanganUser from '../../components/Keuangan'

const KeuanganPage = () => {
    const dispatch = useDispatch()
    const { isError, user } = useSelector((state) => state.auth)
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(GetMe())
    }, [dispatch])
    
    useEffect(() => {
        if (isError === true) {
            navigate('/')
        }
        if (user && user.roleId !== 7) {
            navigate('/')
        }
    }, [isError, user, navigate])
    


  return (
    <Layout>
        <KeuanganUser />
    </Layout>
  )
}

export default KeuanganPage;