const CustomTextArea = (props: any) => {
  const { label, className, ...otherProps } = props;

  return (
    <>
      <div className="flex flex-col">
        {label && (
          <label className="text-[#1C2434] font-[500] mb-[10px]">{label}</label>
        )}
        <textarea
          {...otherProps}
          className={`${className} bg-[#fff] rounded-[4px] border border-slate-200 outline-none px-[20px] py-[16.5px] text-[#6B7280] focus:outline-blue-700 fcous:outline-[2px]`}
        />
      </div>
    </>
  );
};

export default CustomTextArea;
