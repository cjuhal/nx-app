"use client";
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchRickAndMortyChar } from '@/store/rickAndMortySlice';

export default function RickAndMortyChar() {
    const dispatch = useAppDispatch();
    const { data, loading } = useAppSelector(state => state.rickAndMorty);
    const userData = useAppSelector(state => state.user.data);
    const { id } = userData

    useEffect(() => {
        dispatch(fetchRickAndMortyChar(id)); // Traemos a Rick
    }, [dispatch, id]);

    if (loading) return <p className="animate-pulse">Buscando en el multiverso...</p>;

    return (
        <div className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-inner">
            <img src={data?.image} alt={data?.name} className="w-20 h-20 rounded-full mx-auto" />
            <h3 className="text-center font-bold mt-2 dark:text-white">{data?.name}</h3>
            <p className="text-center text-sm text-gray-500">{data?.species} - {data?.status}</p>
        </div>
    );
}