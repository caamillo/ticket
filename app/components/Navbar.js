// Deps
import Image from "next/image"

// Icons
import HomeIcon from "../../public/home.svg"
import ArrowIcon from "../../public/arrow.svg"
import ProfileIcon from "../../public/profile.svg"

const Navbar = () => {
    return(
        <div className="w-full h-[var(--navbar-height)] bg-tuaGreen fixed top-0 left-0 rounded-b-2xl text-white shadow-lg">
            <div className="h-full flex justify-between items-center container mx-auto">
                <div className="flex justify-center items-center space-x-2 relative">
                    <Image
                        priority
                        src={ ArrowIcon }
                        alt="ArrowIcon"
                        className=" w-7"
                    />
                    <Image
                        priority
                        src={ HomeIcon }
                        alt="HomeIcon"
                        className=" w-9 absolute left-10"
                    />
                </div>
                <p className="font-semibold text-lg">My tickets</p>
                <Image
                    priority
                    src={ ProfileIcon }
                    alt="ProfileIcon"
                    className=" w-9"
                    />
            </div>
        </div>
    )
}

export default Navbar