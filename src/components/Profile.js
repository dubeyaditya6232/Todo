import React from 'react';
import Header from './Header/Header';
import { useAuth } from '../useContext';


function Profile({ isDark, setIsDark }) {
    const { user } = useAuth();
    return (
        <div>
            <Header
                isDark={isDark}
                setIsDark={setIsDark}
            />
            <div className='container'>
                <h3 className='text-center'>Welcome {user.displayName}</h3>
                <div className='d-sm-flex justify-content-center mt-md-5'>
                    <div className='p-2'>
                        <img src={user.photoURL} alt='profile' className='rounded-circle' style={{width:150,height:150}} />
                    </div>
                    <div className='flex-column '>
                        <p className='p-1' >Email:{user.email}</p>
                        <p className='p-1' >Phone Number:{user.phoneNumber}</p>
                        <p className='p-1' >Last Login:{user.metadata.lastSignInTime}</p>
                        <p className='p-1' >Created At:{user.metadata.creationTime}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
