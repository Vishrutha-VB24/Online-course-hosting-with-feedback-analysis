import { AuthButton, Input} from ".";
function Header() {
    return (
        <>
            <header className="h-14 flex  px-8 items-center gap-20">
            <h2 className="font-bold text-[1.7rem] bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Learner&apos;s Point</h2> 
            <div className="grow flex items-center">
                <Input className="rounded-full pl-8 text-lg" placeholder="Search Courses here" ></Input>
            </div>
            <AuthButton className="min-w-24 text-md hover:text-cyan-400"></AuthButton>
            </header>
        </>

    );
}

export default Header;