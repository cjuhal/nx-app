"use client";
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchRickAndMortyChar } from '@/store/rickAndMortySlice';

export default function RickAndMortyChar() {
    const dispatch = useAppDispatch();
    const { data, loading } = useAppSelector(state => state.rickAndMorty);
    const userData = useAppSelector(state => state.user.data);
    const userId = userData?.id;

    useEffect(() => {
        if (userId) {
            dispatch(fetchRickAndMortyChar(userId));
        }
    }, [dispatch, userId]);

    if (loading) return <p>Cargando personaje...</p>;
    if (!data) return null; // No renderizamos nada si no hay datos

    return (
        <div className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-inner">
            <img src={data?.image} alt={data?.name} className="w-20 h-20 rounded-full mx-auto" />
            <h3 className="text-center font-bold mt-2 dark:text-white">{data?.name}</h3>
            <p className="text-center text-sm text-gray-500">{data?.species} - {data?.status}</p>
        </div>
    );
}