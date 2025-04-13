import Form from 'next/form'
import { resetTimer } from "./actions";
import Link from 'next/link';

export default function ResetPage() {
    return (
        <main className="flex flex-col h-full w-full text-black bg-linear-to-br from-cyan-600 to-blue-600">
            <nav className="flex flex-row bg-white py-4 px-4 items-center justify-between w-full rounded-md ">
                <span className="text-black font-semibold text-lg">Of Potatos and Blabbers</span>
                <Link href="/" className=" bg-black rounded-lg py-2 px-4 text-white hover:cursor-pointer hover:shadow-xl">Back To Clock</Link>
            </nav>
            <section className=" flex flex-col flex-grow items-center pt-48 ">
                <Form
                    className=" bg-white flex flex-col py-4 px-8 rounded-lg "
                    action={resetTimer}
                >
                    <div className=" pb-2 ">
                        <label className=" text-black font-semibold ">Password</label>
                    </div>
                    <div className=" pb-8 ">
                        <input
                            type="text" 
                            name="password" 
                            placeholder="abc123..."
                            className="min-w-[20em] border-2 border-gray-300 py-2 px-2  "
                        />
                    </div>
                    <button type="submit" className=" bg-black text-white px-8 py-4 rounded-md hover:cursor-pointer hover:shadow-xl ">Reset Clock</button>
                </Form>
            </section>
            <footer className="flex flex-row w-full bg-white px-8 pt-4 ">
                <span className="text-black">Made with NextJS in Vercel</span>
            </footer>
        </main>
    );
}