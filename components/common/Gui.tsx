import React, { useState } from "react";
import DatGui, {
  DatBoolean,
  DatColor,
  DatNumber,
  DatString,
} from "react-dat-gui";

// types
type Data = {
  package: string;
  power: number;
  isAwesome: boolean;
  feelsLike: string;
};

const Gui: React.FC = () => {
  const [data, setData] = useState<Data>({
    package: "react-dat-gui",
    power: 9000,
    isAwesome: true,
    feelsLike: "#2FA1D6",
  });
  const handleOnUpdate = (newData: Data) => {
    setData(newData);
  };
  return (
    <DatGui data={data} onUpdate={handleOnUpdate}>
      <DatString path="package" label="Package"></DatString>
      <DatNumber
        path="power"
        label="Power"
        min={9000}
        max={9999}
        step={1}
      ></DatNumber>
      <DatBoolean path="isAwesome" label="Awesome?"></DatBoolean>
      <DatColor path="feelsLike" label="Feels Like"></DatColor>
    </DatGui>
  );
};

export default Gui;
