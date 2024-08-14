function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <div className="border-b-2 border-base-200 sticky h-14 flex justify-center items-center">
        navbar
      </div>
      {children}
    </div>
  );
}

export default layout;
