/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useEffect, useState } from "react";

import { FaUserFriends, FaAlignLeft, FaPeopleArrows, FaStore, FaBookmark, FaFlag, FaCalendar } from "react-icons/fa"
import { TbDeviceImac, TbClockHour4 } from "react-icons/tb"

function Sidebar() {
    interface IUser {
        user_img: string,
        username: string
    }
    const [user, setUser] = useState<IUser | undefined>(undefined);
    useEffect(() => {
        let value = localStorage.getItem("rede-social:user");
        if (value) {
            setUser(JSON.parse(value));
        }
    }, []);
    const userImgSrc = user?.user_img ?? "https://img.freepik.com/free-icon/user_318-159711.jpg";
    return (
        <aside className="pl-4">
            <nav className="flex flex-col gap-6 text-gray-600 font-semibold">
                <Link href='' className="flex gap-2 pb-6 items-center"><img src={userImgSrc}
                    alt="imagem do perfil"
                    className="w-8 h-8 rounded-full"
                /><span>{user?.username}</span></Link>

                <Link href='' className=" flex gap-3 items-center"><FaUserFriends className="w-6h-6" />Amigos</Link>
                <Link href='' className=" flex gap-3 items-center"><FaAlignLeft className="w-6h-6" />Feed</Link>
                <Link href='' className=" flex gap-3 items-center"><FaPeopleArrows className="w-6h-6" />Grupos</Link>
                <Link href='' className=" flex gap-3 items-center"><FaStore className="w-6h-6" /> Loja</Link>
                <Link href='' className=" flex gap-3 items-center"><TbDeviceImac className="w-6h-6" /> Watch</Link>
                <Link href='' className=" flex gap-3 items-center"><TbClockHour4 className="w-6h-6" /> Lembranças</Link>
                <Link href='' className=" flex gap-3 items-center"><FaBookmark className="w-6h-6" />Salvo</Link>
                <Link href='' className=" flex gap-3 items-center"><FaFlag className="w-6h-6" />Página</Link>
                <Link href='' className=" flex gap-3 items-center"><FaCalendar className="w-6h-6" />Eventos</Link>
            </nav>

        </aside>
    );
}

export default Sidebar;