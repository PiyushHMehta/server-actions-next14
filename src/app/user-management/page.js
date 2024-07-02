import { getAllUsersAction } from '@/actions'
import AddNewUser from '@/components/add-new-user'
import SingleUserCard from '@/components/single-user-card'
import React from 'react'

async function UserManagement() {
    const getUsersList = await getAllUsersAction()
    // console.log(getUsersList);
    return (
        <div className='p-20 max-w-6xl'>
            <div className='flex justify-between'>
                <h1>User Management</h1>
                <AddNewUser />
            </div>
            <div className='grid sm:grid-cols-2 md:grid-cols-3 mt-6 gap-5'>
                {
                    getUsersList && getUsersList.data && getUsersList.data.length > 0 ? (
                        getUsersList.data.map(user => (
                            <SingleUserCard key={user._id} user={user} />
                        ))
                    ) : <h3>No User found</h3>
                }
            </div>
        </div>
    )
}

export default UserManagement


// mongodb+srv://jainpiyush1450:7NoXNGiPLCbNb92R@cluster0.ck3ffqz.mongodb.net/