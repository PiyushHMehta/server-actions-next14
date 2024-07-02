'use server'

import connectToDB from '@/database';
import User from '@/models/user';
import { revalidatePath } from 'next/cache';

// add new user
export async function addNewUserAction(formData, pathToRevalidate) {
    await connectToDB()
    try {
        const newlyCreatedUser = await User.create(formData)
        if (newlyCreatedUser) {
            revalidatePath(pathToRevalidate)
            return {
                success: true,
                message: 'User added successfully'
            }
        } else {
            return {
                success: false,
                message: 'Some error occured, please try again'
            }
        }
    } catch (e) {
        console.log(e);
        return {
            success: false,
            message: 'Some error occured, please try again'
        }
    }
}

// get users
export async function getAllUsersAction() {
    await connectToDB()

    try {
        const users = await User.find({})
        if (users) {
            return {
                success: true,
                data: JSON.parse(JSON.stringify(users))
            }
        } else {
            return {
                success: false,
                message: 'Some error occured, please try again'
            }
        }
    } catch (e) {
        console.log(e);
        return {
            success: false,
            message: 'Some error occured, please try again'
        }
    }
}


// edit user
export async function editUserAction(id, formData, pathToRevalidate) {
    await connectToDB()

    try {
        const { firstName, lastName, email, address } = formData
        const user = await User.findOneAndUpdate({
            _id: id,
        }, {
            firstName, lastName, email, address
        }, {
            new: true
        })

        if (user) {
            revalidatePath(pathToRevalidate)
            return {
                success: true,
                message: 'User updated successfully'
            }
        } else {
            return {
                success: false,
                message: 'Some error occured, please try again'
            }
        }
    } catch (e) {
        console.log(e);
        return {
            success: false,
            message: 'Some error occured, please try again'
        }
    }
}

// delete user
export async function deleteUserAction(id, pathToRevalidate) {
    await connectToDB()

    try {
        const user = await User.findByIdAndDelete(id)
        if (user) {
            revalidatePath(pathToRevalidate)
            return {
                success: true,
                message: 'User deleted successfully'
            }
        } else {
            return {
                success: false,
                message: 'Some error occured, please try again'
            }
        }
    } catch (e) {
        console.log(e);
        return {
            success: false,
            message: 'Some error occured, please try again'
        }
    }
}