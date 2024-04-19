/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

// This wrapper accepts any component that can take any props
const MenuItemWrapper = ({
  component: Component,
  props
}: {
  component: React.ComponentType<any>;
  props: any;
}) => <Component {...props}/>;

export default MenuItemWrapper;