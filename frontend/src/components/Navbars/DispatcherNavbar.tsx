
import { BtnMyLocation } from "../BtnLocation";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { NavbarLayout } from "./NavbarLayout";
import { BtnDirections } from "../../views/Map/components/DirectionsBtn";
export const DispatcherNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
      <NavbarLayout>
        <div >
        {location.pathname === "/"  &&  <div className="flex  gap-4 ">
        <BtnDirections  />
        <BtnMyLocation/>
        <Link to="/sumarios" className="btn">
              ver sumarios
              </Link>
        </div>  }
        </div>
        <div className="navbar-center flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/">Mapa</Link>
            </li>

            <li>
              <Link to="/sumarios" className="focus:bg-base-300 active:bg-base-300 ">
                sumarios
              </Link>
            </li>
            <li>
              <Link to="/reportes" className="focus:bg-base-300 active:bg-base-300 ">
                reportes
              </Link>
            </li>
            <li>
            <Link to="/grupos" className="focus:bg-base-300 active:bg-base-300 ">
                grupos
              </Link>
            </li>
            <li>
              <Link to="/agentes" className="focus:bg-base-300 active:bg-base-300 ">
                agentes
              </Link>
            </li>
          </ul>
        </div>
        </NavbarLayout>
  );
};
