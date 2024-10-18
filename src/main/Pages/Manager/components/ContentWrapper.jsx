const ContentWrapper = ({children}) => {
  return (
    <>
      <div className="p-10 h-screen w-full overflow-auto">{children}</div>
    </>
  );
};
export default ContentWrapper;
