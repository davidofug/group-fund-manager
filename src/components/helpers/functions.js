import supabase from './supabase';
import { useAuth } from '../hooks/useAuth';
const signOut = (setUser) => {
    if (supabase.auth.signOut()) {
        setUser(null);
    }
}

export {signOut}