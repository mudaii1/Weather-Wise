import { Outlet } from "react-router";

function AppLayout() {
  return (
    <div className="font-main relative min-h-dvh">
      <Outlet />
    </div>
  );
}

export default AppLayout;
