const CustomDatePicker = (props: any) => {
  const { label, ...otherProps } = props;
  return (
    <div className="flex flex-col">
      <label className="text-[#1C2434] font-[500] mb-[10px]">{label}</label>
      <input
        {...otherProps}
        type="date"
        className="bg-[#fff] rounded-[4px] border border-slate-200 outline-none px-[20px] py-[16.5px] text-[#6B7280] focus:outline-blue-700 fcous:outline-[2px]"
      />
    </div>
  );
};

export default CustomDatePicker;
