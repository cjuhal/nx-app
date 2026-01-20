"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { increment, decrement } from "@/store/counterSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function Counter() {
    // 📖 Leemos el valor del estado global
    const count = useAppSelector(state => state.counter.value);
    // 📣 Obtenemos la función para enviar acciones
    const dispatch = useAppDispatch();

    return (
        <div className="p-8 bg-white dark:bg-black rounded-xl shadow-lg text-center border border-gray-200">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Contador Redux</h2>

            <div className="flex items-center justify-center gap-6">
                <button
                    onClick={() => dispatch(decrement())}
                    className="px-4 py-2 bg-red-500  dark:bg-orange-500 dark:hover:bg-orange-600 text-white rounded-lg hover:bg-red-600 transition-colors font-bold text-xl"
                >
                    -
                </button>

                <span className="text-4xl font-mono font-semibold text-blue-600 min-w-[60px] dark:text-white">
                    {count}
                </span>

                <button
                    onClick={() => dispatch(increment())}
                    className="px-4 py-2 bg-green-500  dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg hover:bg-green-600 transition-colors font-bold text-xl"
                >
                    +
                </button>
            </div>
        </div>
    );
}