"use client"
import TemplateVotacao from "@/components/TemplateVotacao/TemplateVotacao";
import { categoriesData } from "@/components/utils/oscarInfo";

const Page = () => {
    const categorias = categoriesData.categories;
    const { index, category, next, prev } = useCategoryNavigation(categorias);
    return (
        <div className="text-white">
            <TemplateVotacao
                disabledNext={index === categorias.length - 1}
                disabledPrevious={index === 0}
                onClickNext={next}
                onClickPrevious={prev}
                categories={{
                    ...category,
                    awardsName: categoriesData.awardsName
                }}
            />
        </div>
    );
}
export default Page;