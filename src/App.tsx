import React, { useState } from "react";
import AppLayout from "@cloudscape-design/components/app-layout";
import Container from "@cloudscape-design/components/container";
import Header from "@cloudscape-design/components/header";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import ServiceSelector from "./features/ServiceSelector";
import VersionSelector from "./features/VersionSelector";
import RegionSelector from "./features/RegionSelector";
import ProductSelector from "./features/ProductSelector";
import DurationSelector from "./features/DurationSelector";
import PricingTable from "./features/PricingTable";
import Box from "@cloudscape-design/components/box";

function App() {
  const [selectedService, setSelectedService] = useState<any>(null);
  const [selectedVersion, setSelectedVersion] = useState<any>(null);
  const [selectedRegion, setSelectedRegion] = useState<any>(null);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedDuration, setSelectedDuration] = useState<any>(null);
  const [showPricingTable, setShowPricingTable] = useState(false);
  const [showDiscounts, setShowDiscounts] = useState(false);

  const handleShowPricing = () => setShowPricingTable(true);

  // Reset table when selections change
  const handleServiceChange = (service: any) => {
    setSelectedService(service);
    setShowPricingTable(false);
    setShowDiscounts(false);
    setSelectedProduct(null);
    setSelectedDuration(null);
  };
  const handleVersionChange = (version: any) => {
    setSelectedVersion(version);
    setShowPricingTable(false);
    setShowDiscounts(false);
    setSelectedProduct(null);
    setSelectedDuration(null);
  };
  const handleRegionChange = (region: any) => {
    setSelectedRegion(region);
    setShowPricingTable(false);
    setShowDiscounts(false);
    setSelectedProduct(null);
    setSelectedDuration(null);
  };
  const handleProductChange = (product: any) => {
    setSelectedProduct(product);
    setShowPricingTable(false);
    setShowDiscounts(false);
  };
  const handleDurationChange = (duration: any) => {
    setSelectedDuration(duration);
    setShowPricingTable(false);
    setShowDiscounts(false);
  };

  const serviceName = selectedService?.label || "this service";

  return (
    <AppLayout
      content={
        <Container header={<Header variant="h1">AWS Pricelist Visualizer</Header>}>
          <SpaceBetween size="l">
            <SpaceBetween direction="horizontal" size="l">
              <ServiceSelector
                selectedService={selectedService}
                setSelectedService={handleServiceChange}
              />
              <VersionSelector
                selectedVersion={selectedVersion}
                setSelectedVersion={handleVersionChange}
              />
              <RegionSelector
                selectedRegion={selectedRegion}
                setSelectedRegion={handleRegionChange}
              />
              <ProductSelector
                selectedProduct={selectedProduct}
                setSelectedProduct={handleProductChange}
                selectedRegion={selectedRegion}
              />
              <DurationSelector
                selectedDuration={selectedDuration}
                setSelectedDuration={handleDurationChange}
              />
              <Button
                variant="primary"
                onClick={handleShowPricing}
                disabled={
                  !selectedService ||
                  !selectedVersion ||
                  !selectedRegion ||
                  !selectedProduct ||
                  !selectedDuration
                }
              >
                View Pricing
              </Button>
              <Button
                variant="normal"
                onClick={() => setShowDiscounts(true)}
                disabled={!selectedService}
              >
                Show Discounts
              </Button>
              <Button
                variant="link"
                onClick={() => window.open("https://aws.amazon.com/pricing/", "_blank")}
              >
                Help
              </Button>
            </SpaceBetween>

            {showPricingTable && (
              <PricingTable
                service={selectedService}
                region={selectedRegion}
                product={selectedProduct}
                duration={selectedDuration}
              />
            )}

            {showDiscounts && (
              <Box margin="m">
                <Header variant="h3">Discounts</Header>
                <p>
                  No discounts or reserved pricing available for {serviceName}.
                </p>
              </Box>
            )}
          </SpaceBetween>
        </Container>
      }
    />
  );
}

export default App;
