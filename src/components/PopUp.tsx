const PopUp = (props: { children: any }) => {
  const { children } = props;
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full bg-[rgb(0,0,0,0.25)] flex justify-center overflow-y-scroll px-[20px] py-[20px]">
        {children}
      </div>
    </>
  );
};

export default PopUp;
