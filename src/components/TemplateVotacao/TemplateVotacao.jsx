import Link from "next/link";
import NomineesComponent from "../NomineesComponent";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

const TemplateVotacao = ({ categories, onClickNext, disabledNext, onClickPrevious, disabledPrevious }) => {
    if (!categories || !categories.category) return null;
    return (
        <div className="w-[80vw] h-[80vh] bg-[#E5D9B6] rounded-r-3xl text-[#3A3535] mt-6 mr-6 mb-6 flex justify-center items-center">
            <div className="flex">
                <div className="flex p-10 flex-col w-[600px]">
                    <p className="text-[60px] leading-none mb-10">
                        {categories.category}
                    </p>
                    <span>{categories.explanation}</span>
                    <span className="text-[32px] mt-10 font-bold">{categories.awardsName}</span>
                </div>
                <div className="flex justify-center">
                    <Separator orientation="vertical" className="bg-[#3A3535]" />
                    <div className="flex flex-col ml-10">
                        <div className="grid grid-cols-2 gap-4">
                            {categories.nominees?.map((nominee, index) => (
                                <NomineesComponent key={index} nominees={nominee} />
                            ))}
                        </div>
                        <div className="mt-6 self-center">
                            <Button onClick={onClickPrevious} disabled={disabledPrevious}>
                                Anterior
                            </Button>
                            {disabledNext ? (
                                <Button>
                                    <Link href="/template">
                                        Finalizar
                                    </Link>
                                </Button>
                            ) : (
                                <Button onClick={onClickNext} disabled={disabledNext}>
                                    Próximo
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="w-[355px] h-[485px] bg-[#E5D9B6] rounded-xl border-4 border-black ms-250">
            </div> */}
        </div>
    )
};

export default TemplateVotacao;