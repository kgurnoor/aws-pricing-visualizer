import React from "react";
import Select from "@cloudscape-design/components/select";

type DurationOption = { label: string; value: string };

interface Props {
  selectedDuration: DurationOption | null;
  setSelectedDuration: (duration: DurationOption | null) => void;
}

const durationOptions: DurationOption[] = [
  { label: "On-Demand", value: "OnDemand" },
  // In the future, add reserved or spot options here
];

const DurationSelector: React.FC<Props> = ({ selectedDuration, setSelectedDuration }) => (
  <Select
    selectedOption={selectedDuration}
    onChange={({ detail }) => setSelectedDuration(detail.selectedOption)}
    options={durationOptions}
    placeholder="Select Duration"
    selectedAriaLabel="Selected duration"
  />
);

export default DurationSelector;
