const SignWrapper = ({ children }: { children: any }) => {
  return (
    <>
      <div className="flex flex-col flex-1 items-center justify-center">
        {children}
      </div>
    </>
  );
};

export default SignWrapper;
