import React from "react";
import Select from "@cloudscape-design/components/select";
import services from "../assets/index.json";

type ServiceOption = { label: string; value: string };

interface Props {
  selectedService: ServiceOption | null;
  setSelectedService: (service: ServiceOption | null) => void;
}

const ServiceSelector: React.FC<Props> = ({ selectedService, setSelectedService }) => {
  // Build options from JSON
  const options: ServiceOption[] = Object.entries((services as any).offers).map(
    ([key, value]: [string, any]) => ({
      label: value.offerCode,
      value: key,
    })
  );

  return (
    <Select
      selectedOption={selectedService}
      onChange={({ detail }) => setSelectedService(detail.selectedOption)}
      options={options}
      placeholder="Select AWS Service"
      selectedAriaLabel="Selected service"
    />
  );
};

export default ServiceSelector;
