'use client'

import { addNewUserAction, editUserAction } from "@/actions"
import { Button } from "../ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { addNewUserFormControl, addNewUserFormInitialState } from "@/utils"
import { useContext, useState } from "react"
import { UserContext } from "@/context"

function AddNewUser() {
    const { openPopup, setOpenPopup, addNewUserFormData, setAddNewUserFormData, currentEditedId, setCurrentEditedId } = useContext(UserContext)

    // console.log(addNewUserFormData);

    function handleSaveButtonValid() {
        return Object.keys(addNewUserFormData).every(key => addNewUserFormData[key].trim() !== '')
    }

    async function handleAddNewUserAction() {
        const result = currentEditedId !== null
            ? await editUserAction(currentEditedId, addNewUserFormData, '/user-management')
            : await addNewUserAction(
                addNewUserFormData,
                "/user-management"
            )
        console.log(result);
        setOpenPopup(false)
        setAddNewUserFormData(addNewUserFormInitialState)
    }

    return (
        <div>

            <Button onClick={() => setOpenPopup(true)}>
                Add new user
            </Button>
            <Dialog open={openPopup} onOpenChange={() => {
                setOpenPopup(false)
                setAddNewUserFormData(addNewUserFormInitialState)
                setCurrentEditedId(null)
            }}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>
                            {
                                currentEditedId !== null ? 'Edit user' : 'Add new user'
                            }
                        </DialogTitle>
                    </DialogHeader>
                    <form action={handleAddNewUserAction} className="grid gap-4 py-4">
                        {
                            addNewUserFormControl.map(controlItem => (
                                <div className="mb-5" key={controlItem.name}>
                                    <Label htmlFor={controlItem.name} className="text-right">
                                        {controlItem.label}
                                    </Label>
                                    <Input
                                        id={controlItem.name}
                                        name={controlItem.name}
                                        placeholder={controlItem.placeholder}
                                        className="col-span-3"
                                        type={controlItem.type}
                                        value={addNewUserFormData[controlItem.name]}
                                        onChange={ev => setAddNewUserFormData({
                                            ...addNewUserFormData,
                                            [controlItem.name]: ev.target.value
                                        })}
                                    />
                                </div>
                            ))
                        }
                        <DialogFooter>
                            <Button
                                disabled={!handleSaveButtonValid()}
                                type="submit"
                                className='disabled:opacity-55'
                            >Save changes
                            </Button>
                        </DialogFooter>
                    </form>

                </DialogContent>
            </Dialog>
        </div>

    )
}

export default AddNewUser