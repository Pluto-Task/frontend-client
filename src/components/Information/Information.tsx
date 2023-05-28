import Fork from "../../assets/svg/fork";
import Car from "../../assets/svg/car";
import Tools from "../../assets/svg/tools";
import Translate from "../../assets/svg/translate";
import Slider from "../custom/SlideBart";
import MyMap from "../map/Map";

function Information() {
    return(
        <>
        <div >
        <div className="flex absolute top-0 left-0 mt-4">
            <h1 className="text-8xl">Порятунок Чорнозему</h1>
        </div>
        <div className="flex gap-40 mt-[15%]">
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
        <div className="flex mt-[10%] gap-4  items-center">
        <div><button className="border bg-[#4174F6] rounded-md text-[white] w-[300px] h-[50px]">Записатись</button></div>
        <div><p className="text-xl">Контактний <br/>телефон</p></div>
        <div className="flex justify-center items-center bg-[black] h-[2px] w-[70%]"></div>
        <div><p className="text-4xl justify-center items-center">380962501688</p></div>
        </div>
        <div className="mt-[10%]"><div><p className="text-6xl">Коротний опис:</p><div className="mt-[3%]"><p className="text-2xl">Як ученими мадярський паспорт з помощу леваш оби пуйти за гарницюю</p></div>
        </div>
        </div>
        <div className="mt-[10%]"><p className="text-6xl">Контакти:</p></div>
        <div>
        <div className="flex justify-center items-center bg-[black] h-[2px] w-[100%] mt-[5%] mb-[5%]"></div>
        <div className="flex  items-center"><p className="text-3xl">Телефон</p><p className="ml-[35%]">asdsd</p></div>
        <div className="flex justify-center items-center bg-[black] h-[2px] w-[100%] mt-[5%] mb-[5%]"></div>
        <div className="flex  items-center"><p className="text-3xl">Телефон</p><p className="ml-[35%]">asdsd</p></div>
        <div className="flex justify-center items-center bg-[black] h-[2px] w-[100%] mt-[5%] mb-[5%]"></div>
        <div className="flex  items-center"><p className="text-3xl">Телефон</p><p className="ml-[35%]">asdsd</p></div>
        <div className="flex justify-center items-center bg-[black] h-[2px] w-[100%] mt-[5%] mb-[5%]"></div>
        <div className="flex justify-center items-center"><p className="text-5xl">Вулиця</p></div>
        <div className="flex justify-center items-center bg-[black] h-[2px] w-[100%] mt-[5%] mb-[5%]"></div>
        </div>
        <div><MyMap/></div>
        <div className="flex mt-[10%] mb-[10%] gap-4  items-center">
        <div><button className="border bg-[#4174F6] rounded-md text-[white] w-[300px] h-[50px]">Записатись</button></div>
        <div><p className="text-xl">Контактний <br/>телефон</p></div>
        <div className="flex justify-center items-center bg-[black] h-[2px] w-[70%]"></div>
        <div><p className="text-4xl justify-center items-center">380962501688</p></div>
        </div>
        </div>

        </>
    );
}
export default Information;