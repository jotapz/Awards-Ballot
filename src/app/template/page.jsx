import Image from 'next/image';
import Link from 'next/link';
import Template from '../../images/template ab.png';
import { Button } from '@/components/ui/button';

function TemplatePage() {
    return (
        <div className="flex items-center justify-center h-full w-full">
            <div className="w-[65vw] h-[80vh] bg-[#E5D9B6] rounded-3xl text-[#3A3535] ms-8 my-8 me-8 flex justify-center items-center">
                <div className="flex items-center h-full w-full ms-10">
                    <Image src={Template} alt="Template" width={430} height={500} />
                        <div className="flex flex-col items-center ms-4"> 
                            <span className="text-[#3A3535] -mt-5 mb-5 -ml-1 text-5xl font-inter font-semibold pt-15 text-center"> 
                                Template gerado!
                            </span>
                        <div className='flex flex-col items-center ms-4'>
                            <span className="text-[#3A3535] -mt-15 ml-3 text-l font-inter pt-20"> 
                                Agora, você pode baixar seu arquivo ou refazer as suas apostas.
                            </span>
                <div className="flex justify-center space-x-8 py-10 me-10">
                    <Button>
                        Baixar template
                    </Button>
                    <Button>
                        Refazer
                    </Button>    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
}
export default TemplatePage;