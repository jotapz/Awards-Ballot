import Link from "next/link";
import Image from 'next/image';
import Estatueta from '../../images/estatueta.svg';
import Gramofone from '../../images/gramofone.svg';
import GoldenGlobe from '../../images/golden-globe.svg';
import { Button } from "@/components/ui/button";

const HomePage = () => {
    return (
        <div className="flex items-center justify-center h-full w-full">
            <div className="w-[716px] h-[550px] max-w-full max-h-full sm:w-[35%] sm:h-[79%] rounded-4xl shadow-lg p-6 overflow-auto bg-[#E5D9B6]">
                <span className="flex items-center justify-center text-[#3A3535] text-6xl font-mono font-bold pt-15">
                    AWARDS
                </span>
                <span className="flex items-center justify-center text-[#3A3535] text-6xl font-mono font-bold">
                    BALLOT
                </span>
                <span className="flex items-center justify-center text-[#3A3535] text-l font-mono pt-20">
                    Escolha abaixo qual premiação você gostaria de votar:
                </span>
                <div className="flex justify-center space-x-4 py-10">
                    <Button>
                        <Link href="/golden-globes" className="flex items-center">
                            <Image src={GoldenGlobe} alt="Golden Globes" width={20} height={20} />
                            GOLDEN GLOBES
                        </Link>
                    </Button>
                    <Button>
                        <Link href="/grammys" className="flex items-center">
                            <Image src={Gramofone} alt="Gramofone" width={20} height={20} />
                            GRAMMYS
                        </Link>
                    </Button>
                    <Button>
                        <Link href="/oscar" className="flex items-center">
                            <Image src={Estatueta} alt="Estatueta" width={20} height={20} />
                            OSCAR
                        </Link>
                    </Button>
                </div>
            </div>
        </div>


    );
}
export default HomePage;