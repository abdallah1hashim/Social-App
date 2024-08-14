import Sidebar from "../_components/Sidebar";

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh grid grid-cols-12">
      <Sidebar className="col-span-3 sticky top-0" />

      <div className="col-span-6 border-r-2 border-base-200">{children}</div>
      <div className="col-span-3"></div>
    </div>
  );
}

export default MainLayout;
