import React, { useContext, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaSearch, FaBell } from "react-icons/fa";
import { TbMessageCircle2 } from "react-icons/tb";
import { useMutation } from "@tanstack/react-query";
import { UserContext } from "@/context/UserContext";

function Header() {
    const { user, setUser } = useContext(UserContext);
    const [showMenu, setShowMenu] = useState(false);
    const router = useRouter();

    let userImgSrc = user?.user_img ?? "https://img.freepik.com/free-icon/user_318-159711.jpg";

    const logout = async () => {
        try {
            const response = await fetch("/auth/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.ok) {
                setUser(undefined);
                localStorage.removeItem("rede-social:user");
                router.push("/login");
            } else {
                throw new Error("Failed to logout");
            }
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <header className="w-full bg-white flex justify-between py-2 px-4 items-center shadow-md">
            <Link href="/" className="font-bold text-sky-900 text-lg">
                TC
            </Link>
            <div className="flex bg-zinc-100 items-center text-gray-600 px-3 py-1 rounded-full">
                <input
                    type="text"
                    placeholder="Pesquisar"
                    className="bg-zinc-100 focus-visible:outline-none"
                />
                <FaSearch />
            </div>
            <div className="flex gap-5 items-center text-gray-600">
                <div className="flex gap-3 ">
                    <button className="bg-zinc-200 p-2 rounded-full hover:bg-zinc-500">
                        <TbMessageCircle2 />
                    </button>
                    <button className="bg-zinc-200 p-2 rounded-full hover:bg-zinc-500">
                        <FaBell />
                    </button>
                </div>
                <div className="relative" onMouseLeave={() => setShowMenu(false)}>
                    <button
                        className="flex gap-2 items-center "
                        onClick={() => setShowMenu(!showMenu)}
                    >
                        <img
                            src={userImgSrc}
                            alt="imagem do perfil"
                            className="w-8 h-8 rounded-full"
                        />
                        <span className="font-bold">{user?.username}</span>
                    </button>
                    {showMenu && (
                        <div className="absolute flex flex-col bg-white p-4 shadow-md rounded-md gap-2 border-t right-[-8px]">
                            <Link href="" className="border-b whitespace-nowrap">
                                {" "}
                                Editar perfil
                            </Link>
                            <button onClick={logout}>Logout</button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
