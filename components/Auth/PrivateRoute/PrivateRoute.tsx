import React, {
  useEffect,
  useState,
  isValidElement,
  cloneElement,
} from "react";
import Router from "next/router";
import {
  Container,
  Header,
  Content,
  Sidebar,
  Sidenav,
  Icon,
  Nav,
  IconProps,
} from "rsuite";
import NavToggle from "./NavToggle";

import "./styles.scss";

interface IChildrenProps {
  token: string;
}

interface INavItem {
  label: string;
  eventKey: string;
  icon: IconProps["icon"];
}

const navItems: INavItem[] = [
  {
    label: "Dashboard",
    eventKey: "/home",
    icon: "dashboard",
  },
  {
    label: "Usuarios",
    eventKey: "/users",
    icon: "group",
  },
  {
    label: "Solicitudes",
    eventKey: "/requests",
    icon: "user-plus",
  },
  {
    label: "Configuración",
    eventKey: "/config",
    icon: "cog",
  },
  {
    label: "Cerrar sesión",
    eventKey: "/logout",
    icon: "window-close-o",
  },
];

const PrivateRoute = ({ children }) => {
  const [token, setToken] = useState("");
  const [expand, setExpand] = useState(true);
  const [activeKey, setActiveKey] = useState("/home");

  const childrenProps: IChildrenProps = { token };

  // * Redirect to home if not logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("token: ", `${Router.pathname} -> ${token}`);
    if (!token && Router.pathname !== "/") {
      Router.push("/");
    } else {
      setToken(token);
    }
  }, []);

  const onItemClick = (eventKey: string) => {
    setActiveKey(eventKey);
    Router.push(activeKey);
  };

  if (!token) return null;

  return (
    <Container>
      <Sidebar
        style={{ height: "100vh" }}
        className="flex flex-col"
        width={expand ? 260 : 56}
        collapsible
      >
        <Sidenav.Header>
          <div id="sidenav-header" className={expand ? `h-32` : `h-12`}>
            <Icon
              icon="universal-access"
              size={expand ? "4x" : "2x"}
              style={{ verticalAlign: 0 }}
            />
            {expand && <span className="text-3xl font-bold">CESFAM</span>}
          </div>
        </Sidenav.Header>

        <Sidenav
          expanded={expand}
          appearance="subtle"
          className="flex-1"
          activeKey={activeKey}
        >
          <Sidenav.Body className="mt-5">
            <Nav>
              {navItems.map(({ label, eventKey, icon }) => (
                <Nav.Item
                  key={eventKey}
                  eventKey={eventKey}
                  active={activeKey === eventKey}
                  icon={<Icon icon={icon} />}
                  onClick={() => onItemClick(eventKey)}
                >
                  {label}
                </Nav.Item>
              ))}
            </Nav>
          </Sidenav.Body>
        </Sidenav>

        <NavToggle expand={expand} onChange={() => setExpand(!expand)} />
      </Sidebar>

      <Container>
        <Header>
          <h2>Page Title</h2>
        </Header>
        <Content>
          {React.Children.map(children, (child) => {
            if (isValidElement(child)) {
              return cloneElement(child, { ...childrenProps });
            }

            return child;
          })}
        </Content>
      </Container>
    </Container>
  );
};

export default React.memo(PrivateRoute);
