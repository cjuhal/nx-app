import { useAppSelector } from "@/store/hooks"
import Image from "next/image";

export default function UserDetailModal() {
    const { data } = useAppSelector(state => state.user)
    const { id, name, picture, username, email, phone, website, address, company } = data || {};


    return (
        <div className="space-y-3 text-sm">
            <div className="flex w-full">
                <span className="w-50"><b>ID:</b> {id}</span>
                {
                    picture ? (
                        <div className="w-50">
                            <Image src={picture} className="rounded-full object-cover dark:invert float-end" width={100} height={100} alt={`Foto de perfil de ${name}`} />
                        </div>
                    ) : (
                        <span className="w-50 text-sm font-bold">No hay foto disponible</span>
                    )
                }
            </div>
            <p><b>Nombre:</b> {name}</p>
            <p><b>Usuario:</b> {username}</p>
            <p><b>Email:</b> {email}</p>
            <p><b>Teléfono:</b> {phone}</p>
            <p>
                <b>Website:</b>{" "}
                <a
                    href={`https://${website}`}
                    target="_blank"
                    className="text-blue-600 underline"
                >
                    {website}
                </a>
            </p>



            {/* Address */}
            <div className="pt-2">
                <h3 className="font-semibold">Dirección</h3>
                <p>
                    {address?.street}, {address?.suite}
                </p>
                <p>
                    {address?.city} ({address?.zipcode})
                </p>
                <p className="text-xs text-gray-500">
                    Lat: {address?.geo?.lat} | Lng: {address?.geo?.lng}
                </p>
            </div>

            {/* Company */}
            <div className="pt-2">
                <h3 className="font-semibold">Empresa</h3>
                <p><b>Nombre:</b> {company?.name}</p>
                <p><b>Slogan:</b> {company?.catchPhrase}</p>
                <p><b>Business:</b> {company?.bs}</p>
            </div>
        </div>
    )
}