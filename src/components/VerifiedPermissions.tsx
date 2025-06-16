import React, { useState, useEffect } from 'react';
import { Box, Button, SpaceBetween, Table, Header } from "@cloudscape-design/components";
import pricingData from '../assets/index-current-version.json';

interface PricingItem {
  regionCode: string;
  location: string;
  price: string;
  unit: string;
  description: string;
}

const VerifiedPermissions = () => {
  const [region, setRegion] = useState('');
  const [pricing, setPricing] = useState<PricingItem[]>([]);
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    const extractedPricing: PricingItem[] = [];
    for (const productSku in (pricingData as any).products) {
      const product = (pricingData as any).products[productSku];
      const regionCode = product.attributes.regionCode;
      const location = product.attributes.location;

      if ((pricingData as any).terms.OnDemand[productSku]) {
        const term = (pricingData as any).terms.OnDemand[productSku];
        for (const priceDimensionKey in term) {
          const priceDimension = (term as any)[priceDimensionKey].priceDimensions[Object.keys((term as any)[priceDimensionKey].priceDimensions)[0]];
          const price = priceDimension.pricePerUnit.USD;
          const unit = priceDimension.unit;
          const description = priceDimension.description;

          extractedPricing.push({
            regionCode,
            location,
            price,
            unit,
            description,
          });
        }
      }
    }
    setPricing(extractedPricing);
  }, []);

  const filteredPricing = pricing.filter(item =>
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

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(event.target.value);
  };

  return (
    <Box margin="l">
      <Header variant="h2">Verified Permissions Pricing</Header>
      <input
        type="text"
        placeholder="Find pricing"
        value={filterText}
        onChange={handleFilterChange}
      />
<Table
        columnDefinitions={columns}
        items={filteredPricing}
      />
    </Box>
  );
};

export default VerifiedPermissions;
