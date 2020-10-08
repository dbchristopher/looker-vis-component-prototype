import React, { FC, useContext } from "react";
import { QueryContext } from "./QueryContext";

interface VisualizationProps {
  /*
   * debug renders the raw query data and query config rather than the chart
   * @default false
   */
  debug?: boolean;
}

export const Visualization: FC<VisualizationProps> = () => {
  const results = useContext(QueryContext);
  // TODO: render raw query data and vis config
  console.log(results);
  return <></>;
};
