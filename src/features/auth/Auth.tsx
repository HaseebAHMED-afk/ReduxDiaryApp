import React , {FC , useState} from 'react'
import { useForm } from 'react-hook-form'
import { User } from '../../interfaces/user.interface'
import * as Yup from 'yup'
import http from '../../services/api'
import { saveToken , setAuthState} from './authSlice'
import { setUser } from './userSlice'
import { AuthResponse} from '../../services/mirage/routes/user'
import { useAppDispatch } from '../../store'
import { yupResolver } from '@hookform/resolvers/yup'


const schema = Yup.object().shape({
    username: Yup.string()
    .required('You need to enter a username')
    .max(16, 'Username should not be longer than 16 characters'),
    passord: Yup.string().required('You need to enter a password'),
    email: Yup.string().email('Please provide a valid email address')
})

const Auth :FC = () => {

    const { handleSubmit,register,errors } = useForm<User>({
        resolver: yupResolver(schema)
    })
    return (
        <div>
        
        </div>
    )
}

export default Auth
