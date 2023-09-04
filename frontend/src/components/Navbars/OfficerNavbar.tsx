
import { BtnMyLocation } from "../BtnLocation";
import { Link, useLocation} from "react-router-dom";
import { NavbarLayout } from "./NavbarLayout";
import { ReportModal } from "../../views/Reports/components/ReportModal";
import { BtnDirections } from "../../views/Map/components/DirectionsBtn";

export const OfficerNavbar = () => {
  const location = useLocation();

  return (
    <NavbarLayout>
         <div >
        {location.pathname === "/"  &&  <div className="flex  gap-4 ">
        <BtnDirections  />
        <BtnMyLocation/>
        <ReportModal/>
        </div>  }
        </div>
        <div className="navbar-center flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/">Mapa</Link>
            </li>

            <li>
              <Link to="/reportes" className="focus:bg-base-300 active:bg-base-300 ">
                mis Reportes
              </Link>
            </li>
          </ul>
        </div>
    </NavbarLayout>
  );
};
