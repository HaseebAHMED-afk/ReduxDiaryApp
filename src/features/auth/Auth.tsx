/* eslint-disable @typescript-eslint/no-unused-vars */
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

    const [isLogin , setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();

    const submitForm = ( data: User) => {
        const path = isLogin ? '/auth/login' : '/auth/signup';
        http
        .post<User, AuthResponse>(path,data)
        .then((res) => {
            const { user,token } = res;
            dispatch(saveToken(token))
            dispatch(setUser(user))
            dispatch(setAuthState(true))
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            setLoading(false)
        })
    }
    

    return (
        <div className="auth">
            <div className="card">
                <form onSubmit={handleSubmit(submitForm)} >
                    <div className="inputWrapper">
                        <input type="text" ref={register} name="username" placeholder="Username" />
                        {
                            errors && errors.username && (
                                <p className="error">{errors.username.message}</p>
                            )
                        }
                    </div>
                    <div className="inputWrapper">
                        <input type="password" ref={register} name="password" placeholder="Password" />
                        {
                            errors && errors.password && (
                                <p className="error">{errors.password.message}</p>
                            )
                        }
                    </div>
                    {
                        !isLogin 
                    }
                </form>
            </div>
        </div>
    )
}

export default Auth
