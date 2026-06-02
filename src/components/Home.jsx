import BlogProfileImage from "../assets/profile.jpeg"
import CSS from "../assets/css-3.png"
import HTML from "../assets/html.png"
import DB from "../assets/data-server.png"
import JS from "../assets/js.png"
import REACTICON from "../assets/physics.png"
import NODE from "../assets/node-js.png"

function Home() {
    return (
        <div>

            <div className='flex items-center justify-center'>
                <div className="w-full sm:w-1/2 flex-col justify-center">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Hey This Is Hariram 👋
                    </h1>

                    <img
                        src={BlogProfileImage}
                        className='w-60 h-60 object-cover rounded-full border-4 border-yellow-500 shadow-[0_0_30px_rgba(234,179,8,0.7)] block sm:hidden mx-auto'
                        alt="Blog Profile"
                    />

                    <p className='py-2 mt-4 text-lg font-medium text-gray-700 leading-relaxed max-w-xl'>
                        Passionate about creating innovative web solutions with modern technologies.
                        Specialized in building scalable applications using MERN stack and Java ecosystem.
                    </p>

                    <a
                        href="/CV.pdf"
                        download="Hariram-CV.pdf"
                        className="mt-6 inline-flex items-center justify-center rounded-xl bg-orange-500 px-6 py-3 text-base font-semibold text-white shadow-md transition hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 w-fit"
                    >
                        Download CV
                    </a>
                </div>

                <div className='justify-center hidden sm:block ml-10'>
                    <img
                        src={BlogProfileImage}
                        className='w-60 h-60 md:w-80 md:h-80 object-cover rounded-full border-[6px] border-yellow-500 shadow-[0_0_50px_rgba(234,179,8,0.6)] hover:scale-105 transition-transform duration-500'
                        alt="Blog Profile"
                    />
                </div>
            </div>

            <div className='flex justify-evenly py-6'>
                <img src={HTML} style={{ width: "50px" }} alt="HTML" />
                <img src={CSS} style={{ width: "50px" }} alt="CSS" />
                <img src={JS} style={{ width: "50px" }} alt="JavaScript" />
                <img src={REACTICON} style={{ width: "50px" }} alt="React" />
                <img src={DB} style={{ width: "50px" }} alt="Database" />
                <img src={NODE} style={{ width: "50px" }} alt="Node.js" />
            </div>

        </div>
    )
}

export default Home