import React from 'react'
import { AuthContext } from '../helpers/AuthProvider'
const useAuth = () => {
    return React.useContext(AuthContext)
}

export {useAuth}