import React, { useState } from "react";
import AppLayout from "@cloudscape-design/components/app-layout";
import Container from "@cloudscape-design/components/container";
import Header from "@cloudscape-design/components/header";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import ServiceSelector from "./components/ServiceSelector";
import VersionSelector from "./components/VersionSelector";
import RegionSelector from "./components/RegionSelector";
import PricingTable from "./components/PricingTable";

function App() {
  const [selectedService, setSelectedService] = useState<any>(null);
  const [selectedVersion, setSelectedVersion] = useState<any>(null);
  const [selectedRegion, setSelectedRegion] = useState<any>(null);
  const [showPricingTable, setShowPricingTable] = useState(false);

  const handleShowPricing = () => setShowPricingTable(true);

  return (
    <AppLayout
      content={
        <Container header={<Header variant="h1">AWS Pricelist Visualizer</Header>}>
          <SpaceBetween size="l">
            <SpaceBetween direction="horizontal" size="l">
              <ServiceSelector
                selectedService={selectedService}
                setSelectedService={setSelectedService}
              />
              <VersionSelector
                selectedVersion={selectedVersion}
                setSelectedVersion={setSelectedVersion}
              />
              <RegionSelector
                selectedRegion={selectedRegion}
                setSelectedRegion={setSelectedRegion}
              />
              <Button
                variant="primary"
                onClick={handleShowPricing}
                disabled={
                  !selectedService || !selectedVersion || !selectedRegion
                }
              >
                View Pricing
              </Button>
            </SpaceBetween>
            {showPricingTable && <PricingTable />}
          </SpaceBetween>
        </Container>
      }
    />
  );
}

export default App;
