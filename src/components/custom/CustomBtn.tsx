const CustomBtn = (props: any) => {
  const { className, children, ...otherProps } = props;
  return (
    <>
      <button
        className={`${className} rounded-[6px] px-[16px] py-[10px] font-[500]`}
      >
        {children}
      </button>
    </>
  );
};

export default CustomBtn;
