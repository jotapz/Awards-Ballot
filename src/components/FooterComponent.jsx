import { Copyright } from "lucide-react";

const FooterComponent = () => {
    return (
        <footer className="bg-[#000000] flex text-white items-center justify-center pb-8">
            <Copyright width={18} height={18} />
            <p className="ml-1">
                2025 | Coded️ by Eduarda Saleth, Julia Mattos and João Franco
            </p>
        </footer>
    )
}

export default FooterComponent;