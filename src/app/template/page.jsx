import Image from 'next/image';
import Template from '../../images/template ab.png';

function TemplatePage() {
    return (
        <div className="flex items-center justify-center h-full w-full">
            <div className="w-[65vw] h-[80vh] bg-[#E5D9B6] rounded-3xl text-[#3A3535] ms-8 my-8 me-8 flex justify-center items-center">
                <div className="flex items-center h-full w-full ms-10">
                    <Image src={Template} alt="Template" width={430} height={500} />
                        <span className="flex items-center text-[#3A3535] ms-15 mt-0 mb-50 text-5xl font-inter font-semibold pt-15">
                            Template gerado!
                        </span>
                        <span className="flex items-center text-[#3A3535] me-5 mt-100 text-l font-inter pt-15">
                            Agora, você pode baixar seu arquivo ou refazer as suas apostas.
                        </span>
                </div>
            </div>
        </div>
    );
}
export default TemplatePage;