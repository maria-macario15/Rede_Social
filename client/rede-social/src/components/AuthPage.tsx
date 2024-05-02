function AuthPage({Children}:{Children:React.ReactNode}){
    return(
        <main className="flex min-h-screen flex-col items-center justify-center bg-black">
            <form className="flex flex-col bg-white px-6 py-14 rounded-2xl gap-11 text-gray-600 w-1/4">
                {Children}
            </form>
        </main>
    );
}
export default AuthPage;