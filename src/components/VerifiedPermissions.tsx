import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  SpaceBetween,
  Table,
  Header,
  Input
} from "@cloudscape-design/components";
import pricingData from "../assets/index-current-version.json";

interface PricingItem {
  regionCode: string;
  location: string;
  price: string;
  unit: string;
  description: string;
}

const VerifiedPermissions: React.FC = () => {
  const [pricing, setPricing] = useState<PricingItem[]>([]);
  const [filterText, setFilterText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const extractedPricing: PricingItem[] = [];
    // Safely access pricingData structure
    if (
      pricingData &&
      pricingData.products &&
      pricingData.terms &&
      pricingData.terms.OnDemand
    ) {
      for (const productSku in pricingData.products) {
        const product = pricingData.products[productSku];
        const regionCode = product.attributes.regionCode;
        const location = product.attributes.location;

        const onDemandTerms = pricingData.terms.OnDemand[productSku];
        if (onDemandTerms) {
          for (const termKey in onDemandTerms) {
            const priceDimensions = onDemandTerms[termKey].priceDimensions;
            for (const priceDimKey in priceDimensions) {
              const priceDimension = priceDimensions[priceDimKey];
              extractedPricing.push({
                regionCode,
                location,
                price: priceDimension.pricePerUnit.USD,
                unit: priceDimension.unit,
                description: priceDimension.description,
              });
            }
          }
        }
      }
    }
    setPricing(extractedPricing);
    setLoading(false);
  }, []);

  const filteredPricing = pricing.filter((item) =>
    item.location.toLowerCase().includes(filterText.toLowerCase())
  );

  const columns = [
    {
      id: "regionCode",
      header: "Region Code",
      cell: (item: PricingItem) => item.regionCode,
      width: 150,
    },
    {
      id: "location",
      header: "Location",
      cell: (item: PricingItem) => item.location,
      width: 200,
    },
    {
      id: "description",
      header: "Description",
      cell: (item: PricingItem) => item.description,
      width: 300,
    },
    {
      id: "price",
      header: "Price (USD)",
      cell: (item: PricingItem) => item.price,
      width: 100,
    },
    {
      id: "unit",
      header: "Unit",
      cell: (item: PricingItem) => item.unit,
      width: 100,
    },
  ];

  return (
    <Box margin="l">
      <Header variant="h2">Verified Permissions Pricing</Header>
      <SpaceBetween size="m">
        <Input
          type="search"
          placeholder="Find pricing by location"
          value={filterText}
          onChange={({ detail }) => setFilterText(detail.value)}
        />
        <Table
          columnDefinitions={columns}
          items={filteredPricing}
          loading={loading}
          loadingText="Loading pricing data…"
          header="Pricing Table"
          variant="embedded"
          stickyHeader
        />
      </SpaceBetween>
    </Box>
  );
};

export default VerifiedPermissions;
