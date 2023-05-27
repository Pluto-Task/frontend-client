const InputField = (props: any) => {
  const { isError, disabled, icon, ...otherProps } = props;

  return (
    <>
      <div className="relative flex items-center justify-between w-full">
        <input
          className={` bg-white border w-full !border-slate-200 pl-[12px] pr-[42px] py-[16.5px] leading-[18.65px] outline-[2px] text-slate-900 rounded placeholder:text-[#CBD5E0] placeholder:select-none ${
            isError == true
              ? "placeholder:text-red-700 border-[2px] outline-none !border-red-700 bg-red-50"
              : "focus:outline-blue-700"
          } ${disabled ? "pointer-events-none bg-[#F3F4F6]" : ""}`}
          {...otherProps}
        />
        <span className="absolute right-[15px]">{icon}</span>
      </div>
    </>
  );
};

const Label = (props: any) => {
  const { isError, text } = props;
  return (
    <>
      <label
        className={`block mb-[10px] font-[500]  ${
          isError == true ? "text-red-700" : "text-[#1C2434]"
        }`}
      >
        {text}
      </label>
    </>
  );
};

const CustomInput = (props: any) => {
  const { icon, isError, message, disabled, className, label, ...otherProps } =
    props;

  return (
    <>
      <div className={`w-full flex flex-col `}>
        <Label text={label} isError={isError} />
        <InputField
          isError={isError}
          disabled={disabled}
          icon={icon}
          {...otherProps}
        />
        {message && (
          <>
            {isError && (
              <>
                <h4 className="mt-[10px] text-[#E03616] text-[14px]">
                  {message}
                </h4>
              </>
            )}
            {!isError && (
              <>
                <h4 className="mt-[10px] text-slate-800 text-[14px]">
                  {message}
                </h4>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default CustomInput;
