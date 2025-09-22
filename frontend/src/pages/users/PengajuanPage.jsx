import React, { useEffect } from 'react'
import Layout from './Layout'
import Pengajuan from '../../components/Pengajuan'
import { useDispatch, useSelector } from 'react-redux'
import { GetMe } from '../../features/authSlice'
import { useNavigate } from 'react-router-dom'

const PengajuanPage = () => {
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
        <Pengajuan />
    </Layout>
  )
}

export default PengajuanPage