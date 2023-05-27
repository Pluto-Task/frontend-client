const Layout = ({ children }: { children: any }) => {
  return (
    <>
      <div className="max-w-[1440px] w-full mx-auto flex flex-col min-h-[100vh]">
        {children}
      </div>
    </>
  );
};

export default Layout;
