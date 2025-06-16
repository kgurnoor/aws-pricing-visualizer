import React from "react";
import VerifiedPermissionsTable from "../services/verified-permissions/VerifiedPermissionsTable";

interface Props {
  service: { label?: string; value?: string } | null;
  region: { label?: string; value?: string } | null;
  product: { label?: string; value?: string } | null;
  duration: { label?: string; value?: string } | null;
}

const PricingTable: React.FC<Props> = ({ service, region, product, duration }) => {
  if (!service) return null;

  switch (service.value) {
    case "AmazonVerifiedPermissions":
      return (
        <VerifiedPermissionsTable
          selectedRegion={region}
          selectedProduct={product}
          selectedDuration={duration}
        />
      );
    // Future: add more cases for other services
    default:
      return (
        <div>
          Data for {service.label || "this service"} is not yet available.
        </div>
      );
  }
};

export default PricingTable;
