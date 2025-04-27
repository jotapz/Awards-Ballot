import NomineesComponent from "../NomineesComponent";
import { Separator } from "../ui/separator";

const TemplateVotacao = () => {
    return (
        <div className="w-[80vw] h-[80vh] bg-[#E5D9B6] rounded-r-3xl text-[#3A3535] mt-6 mr-6 mb-6 flex items-center justify-center">
            <div className="flex">
                <div className="flex p-10 flex-col w-[400px]">
                    <p className="text-[64px] leading-none mb-10">
                        ACTOR LEADING
                    </p>
                    <span>A atuação excepcional de um ator em papel principal, demonstrando profundidade, autenticidade e impacto emocional.</span>
                    <span className="text-[32px] mt-10 font-bold">OSCAR 2025</span>
                </div>
                <div className="flex">
                    <Separator orientation="vertical" className="bg-[#3A3535]" />
                    <div className="grid grid-cols-2 gap-4 ml-10">
                        <NomineesComponent />
                        <NomineesComponent />
                        <NomineesComponent />
                        <NomineesComponent />
                        <NomineesComponent />
                        <NomineesComponent />
                        <NomineesComponent />
                        <NomineesComponent />
                    </div>
                </div>
            </div>
            {/* <div className="w-[355px] h-[485px] bg-[#E5D9B6] rounded-xl border-4 border-black ms-250">
            </div> */}
        </div>
    )
};

export default TemplateVotacao;