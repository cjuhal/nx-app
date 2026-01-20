"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchUser, removePicture, setPicture } from "@/store/userSlice";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function User() {

    const { data, loading, error } = useAppSelector(state => state.user);
    const dispatch = useAppDispatch()
    const { name, email, phone, picture } = data || {};
    const [inputId, setInputId] = useState("");
    const [id, setId] = useState<number | null>(null);

    // 🔹 Debounce
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (inputId !== "") {
                setId(Number(inputId));
            }
        }, 500); // ⏱️ debounce 500ms

        return () => clearTimeout(timeout);
    }, [inputId]);

    // 🔹 Fetch cuando cambia el id debounced
    useEffect(() => {
        if (id !== null) {
            dispatch(fetchUser(id));
        }
    }, [dispatch, id]);

    if (loading) return <p className="animate-pulse">Cargando datos del servidor...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <div className="border-1 border-gray-200 rounded-xl p-4 w-full mx-auto shadow-lg mt-5">
            <input type="number" className="border-1 border-gray-200 rounded-xl p-1 m-1 w-full " value={inputId} onChange={(e) => setInputId(e.target.value)} placeholder="ingresar id del usuario" />
            {!!data &&
                <>
                    <div className="flex">
                        <div className="flex flex-col w-full">
                            <p className="font-bold text-xl w-full">{name}</p>
                            <span className="text-gray-500 w-full text-xs">{phone} | {email} </span>
                        </div>
                        <div className="flex w-full justify-end">
                            {
                                picture ? (
                                    <Image src={picture} className="rounded-full object-cover dark:invert" width={64} height={64} alt={`Foto de perfil de ${name}`} />
                                ) : (
                                    <p className="text-sm font-bold">No hay foto disponible</p>
                                )
                            }
                        </div>
                    </div>

                    <div className="flex gap-4 mt-2">
                        <button className="px-4 py-2 bg-red-500  dark:bg-orange-500 dark:hover:bg-orange-600 text-white rounded-lg hover:bg-red-600 transition-colors font-bold text-xl" onClick={() => dispatch(removePicture())}> Remove picture</button>
                        <button className="px-4 py-2 bg-green-500 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg hover:bg-green-600 transition-colors font-bold text-xl" onClick={() => dispatch(setPicture('/next.svg'))}> Upload picture</button>
                    </div>
                </>
            }
        </div>
    )
}