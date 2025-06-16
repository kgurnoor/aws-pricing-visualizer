import React from "react";
import Select from "@cloudscape-design/components/select";
import regionData from "../assets/index-current-region.json";

type RegionOption = { label: string; value: string };

interface Props {
  selectedRegion: RegionOption | null;
  setSelectedRegion: (region: RegionOption | null) => void;
}

const RegionSelector: React.FC<Props> = ({ selectedRegion, setSelectedRegion }) => {
  const options: RegionOption[] = Object.entries((regionData as any).regions)
    .map(([key, value]: [string, any]) => ({
      label: value.regionCode,
      value: key,
    }))
    .sort((a, b) => a.label.localeCompare(b.label)); // Sort alphabetically by label

  return (
    <Select
      selectedOption={selectedRegion}
      onChange={({ detail }) => setSelectedRegion(detail.selectedOption)}
      options={options}
      placeholder="Select Region"
      selectedAriaLabel="Selected region"
      filteringType="auto"
    />
  );
};

export default RegionSelector;
