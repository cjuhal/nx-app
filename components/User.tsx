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
        <div className="border-1 border-gray-200 p-4 w-full mx-auto shadow-lg mt-5">
            <input type="number" value={inputId} onChange={(e) => setInputId(e.target.value)} placeholder="ingresar id del usuario" />
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
                                    <Image src={picture} className="rounded-full object-cover" width={64} height={64} alt={`Foto de perfil de ${name}`} />
                                ) : (
                                    <p className="text-sm font-bold">No hay foto disponible</p>
                                )
                            }
                        </div>
                    </div>

                    <div className="flex gap-4 mt-2">
                        <button className="bg-red-700 border-2 p-4 rounded-lg border-gray-200 shadow-lg text-white" onClick={() => dispatch(removePicture())}> Remove picture</button>
                        <button className="bg-green-700 border-2 p-4 rounded-lg border-gray-200 shadow-lg text-white " onClick={() => dispatch(setPicture('/next.svg'))}> Upload picture</button>
                    </div>
                </>
            }
        </div>
    )
}