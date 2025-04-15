import Link from "next/link";
import Image from 'next/image';
import GoldenGlobeIcon from '../../images/goldenglobe.png';
import GrammyIcon from '../../images/Grammys.png';
import OscarIcon from '../../images/Oscar.png';

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
                <button className="px-6 py-2 bg-[#C9A227] rounded-lg hover:bg-blue-700 transition-colors font-bold text-[#3A3535]">
                <span className="flex items-center"><Image src={GoldenGlobeIcon} alt="Golden Globes" width={50} height={50} />GOLDEN GLOBES</span>
                </button>
                <button className="px-6 py-2 bg-[#C9A227] rounded-lg hover:bg-blue-700 transition-colors font-bold text-[#3A3535]">
                    <span className="flex items-center pr-3"><Image src={GrammyIcon} alt="Grammys" width={50} height={50}/>GRAMMYS</span>
                </button>
                <button className="px-6 py-2 bg-[#C9A227] rounded-lg hover:bg-blue-700 transition-colors font-bold text-[#3A3535]">
                    <span className="flex items-center pr-3"><Image src={OscarIcon} alt="Oscar" width={50} height={50} />OSCAR</span>
                </button>
                </div>
            </div>
        </div>


    );
}
export default HomePage;