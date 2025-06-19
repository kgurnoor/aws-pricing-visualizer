import SideNavigation from "@cloudscape-design/components/side-navigation";

const NavBar = () => (
  <SideNavigation
    header={{ text: "AWS Pricing", href: "/" }}
    items={[
      { type: "link", text: "Home", href: "/" }
    ]}
    activeHref="/"
  />
);

export default NavBar;
