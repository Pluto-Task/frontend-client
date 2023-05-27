import Fork from "../../assets/svg/fork";
import Car from "../../assets/svg/car";
import Tools from "../../assets/svg/tools";
import Translate from "../../assets/svg/translate";
import Slider from "../custom/SlideBart";

function Information() {
    return(
        <>
        <div className="flex absolute top-0 left-0 mt-4">
            <h1 className="text-8xl">Порятунок Чорнозему</h1>
        </div>
        <div className="flex gap-40">
            <div>
                <p className="text-xl text-[#868E96]">Тривалість</p>
                <p className="text-4xl"><time>12:00</time> - <time>14:00</time></p>  
                <p className="text-base">ПН 16 червня 2023</p>  
            </div>
            <div><p className="text-xl text-[#868E96]">Amenities</p>
            <div className="flex gap-2   items-center">
                <div className="items-start">
            <div className="flex gap-4  items-center"><div className="w-5 h-5"><Fork/></div><p className="text-xl">Приготування їжі — 1 роки</p></div>
            <div className="flex gap-4  items-center"><div className="w-5 h-5"><Car/></div><p className="text-xl">Перевезення людей  — 2 роки</p></div>
            </div>
            <div className="">
            <div className="flex gap-4  items-center"><div className="w-5 h-5"><Tools/></div><p className="text-xl"> Ремонт техніки — 3 роки </p> </div>
            <div className="flex gap-4  items-center"><div className="w-5 h-5"><Translate/></div><p className="text-xl">Переклади  — 2 роки</p></div>
            </div>
            </div>
            </div>
        </div>
        <div><button className="border">Записатись</button></div>
        </>
    );
}
export default Information;