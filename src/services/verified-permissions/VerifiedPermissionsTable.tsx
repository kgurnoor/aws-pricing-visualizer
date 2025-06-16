import Table from "@cloudscape-design/components/table";
import pricingData from "../../assets/index-current-version.json";

interface PricingItem {
  regionCode: string;
  location: string;
  price: string;
  unit: string;
  description: string;
  usagetype?: string;
}

interface Props {
  selectedRegion: { label?: string; value?: string } | null;
  selectedProduct: { label?: string; value?: string } | null;
  selectedDuration: { label?: string; value?: string } | null;
}

const VerifiedPermissionsTable: React.FC<Props> = ({
  selectedRegion,
  selectedProduct,
  selectedDuration,
}) => {
  const pricing: PricingItem[] = [];

  if (
    pricingData.products &&
    pricingData.terms &&
    pricingData.terms.OnDemand &&
    selectedRegion &&
    selectedProduct &&
    selectedDuration
  ) {
    for (const [productSku, product] of Object.entries<any>(pricingData.products)) {
      const regionCode = product.attributes.regionCode;
      if (regionCode !== selectedRegion.value) continue;
      const usagetype = product.attributes.usagetype || productSku;
      if (usagetype !== selectedProduct.value) continue;
      if (selectedDuration.value !== "OnDemand") continue;
      const location = product.attributes.location;
      const onDemandTerms = (pricingData.terms.OnDemand as Record<string, any>)[productSku];
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
              usagetype,
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
      empty={<span>No pricing data for this selection.</span>}
    />
  );
};

export default VerifiedPermissionsTable;
