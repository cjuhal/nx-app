"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { removePicture, setPicture } from "@/store/userSlice";

export default function User() {

    const user = useAppSelector(state => state.user);
    const dispatch = useAppDispatch()

    return (
        <div className="border-1 border-gray-200 p-4 w-full mx-auto shadow-lg mt-5">
            <div className="flex">
                <div className="flex flex-col w-full">
                    <p className="font-bold text-xl w-full">{user.name}</p>
                    <span className="text-gray-500 w-full">{user.age} | {user.email} </span>
                </div>
                <div className="flex w-full justify-end">
                    {
                        user.picture ? (
                            <img src={user.picture} className="w-16 h-16 rounded-full object-cover border-2 border-blue-500" alt="picture" />
                        ) : (
                            <p className="text-sm font-bold">No hay foto disponible</p>
                        )
                    }
                </div>
            </div>

            <div className="flex gap-4 mt-2">
                <button className="bg-red-500 border-2 p-4 rounded-lg border-gray-200 shadow-lg text-white" onClick={() => dispatch(removePicture())}> remote picture</button>
                <button className="bg-green-500 border-2 p-4 rounded-lg border-gray-200 shadow-lg text-white " onClick={() => dispatch(setPicture('/next.svg'))}> upload picture</button>
            </div>

        </div>
    )
}