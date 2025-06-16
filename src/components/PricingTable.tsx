import React from "react";
import Table from "@cloudscape-design/components/table";
import pricingData from "../assets/index-current-version.json";

interface PricingItem {
  regionCode: string;
  location: string;
  price: string;
  unit: string;
  description: string;
}

const PricingTable: React.FC = () => {
  // Extract pricing as before (simplified)
  const pricing: PricingItem[] = [];
  if (pricingData.products && pricingData.terms && pricingData.terms.OnDemand) {
    for (const [productSku, product] of Object.entries<any>(pricingData.products)) {
      const regionCode = product.attributes.regionCode;
      const location = product.attributes.location;
      const onDemandTerms = pricingData.terms.OnDemand[productSku];
      if (onDemandTerms) {
        for (const termKey of Object.keys(onDemandTerms)) {
          const priceDimensions = onDemandTerms[termKey].priceDimensions;
          for (const priceDimKey of Object.keys(priceDimensions)) {
            const priceDimension = priceDimensions[priceDimKey];
            pricing.push({
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

  const columns = [
    { id: "regionCode", header: "Region Code", cell: (item: PricingItem) => item.regionCode },
    { id: "location", header: "Location", cell: (item: PricingItem) => item.location },
    { id: "description", header: "Description", cell: (item: PricingItem) => item.description },
    { id: "price", header: "Price (USD)", cell: (item: PricingItem) => item.price },
    { id: "unit", header: "Unit", cell: (item: PricingItem) => item.unit },
  ];

  return (
    <Table
      columnDefinitions={columns}
      items={pricing}
      header="Pricing Table"
      variant="embedded"
      stickyHeader
    />
  );
};

export default PricingTable;
