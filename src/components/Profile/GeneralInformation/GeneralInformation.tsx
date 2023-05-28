export const GeneralInformation = () => {
  return (
    <div className="relative h-full">
      <p className="text-4xl text-[#ADB5BD] font-semibold mb-[40px]">
        Загальна інформація
      </p>
      <div>
        <label htmlFor="price" className="mb-[10px]">
          Ім'я
        </label>
        <div>
          <input
            type="text"
            name="name"
            id="name"
            className="rounded h-[52px] pt-[16px] pr-[12px] pb-[16px] pl-[12px] w-full border-2 border-[#E1E7EF] focus:border-[#1D4ED7] focus:border-2"
          />
        </div>
      </div>
      <div className="mt-[40px]">
        <label htmlFor="price" className="mb-[10px]">
          Email
        </label>
        <div>
          <input
            type="email"
            name="email"
            id="email"
            className="rounded h-[52px] pt-[16px] pr-[12px] pb-[16px] pl-[12px] w-full border-2 border-[#E1E7EF] focus:border-[#1D4ED7] focus:border-2"
          />
        </div>
      </div>
      <div className="mt-[40px]">
        <label htmlFor="price" className="mb-[10px]">
          Телефон
        </label>
        <div>
          <input
            type="tel"
            name="phone"
            id="phone"
            className="rounded h-[52px] pt-[16px] pr-[12px] pb-[16px] pl-[12px] w-full border-2 border-[#E1E7EF] focus:border-[#1D4ED7] focus:border-2"
          />
        </div>
      </div>
      <button
        type="submit"
        className="absolute bottom-3 bg-[#4174F6] w-full h-[60px] rounded text-white font-normal text-xl"
      >
        Submit
      </button>
    </div>
  );
};
