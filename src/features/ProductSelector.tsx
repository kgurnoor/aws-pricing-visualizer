import Select from "@cloudscape-design/components/select";
import pricingData from "../assets/index-current-version.json";

type ProductOption = { label?: string; value?: string };

interface Props {
  selectedProduct: ProductOption | null;
  setSelectedProduct: (product: ProductOption | null) => void;
  selectedRegion: { label?: string; value?: string } | null;
}

const ProductSelector: React.FC<Props> = ({ selectedProduct, setSelectedProduct, selectedRegion }) => {
  const productSet = new Set<string>();
  if (
    pricingData.products &&
    selectedRegion
  ) {
    for (const product of Object.values<any>(pricingData.products)) {
      if (product.attributes.regionCode === selectedRegion.value) {
        productSet.add(product.attributes.usagetype || product.sku);
      }
    }
  }
  const options: ProductOption[] = Array.from(productSet).map((prod) => ({
    label: prod,
    value: prod,
  })).sort((a, b) => (a.label || "").localeCompare(b.label || ""));

  return (
    <Select
      selectedOption={selectedProduct}
      onChange={({ detail }) => setSelectedProduct(detail.selectedOption)}
      options={options}
      placeholder="Select Product (e.g. API Requests)"
      selectedAriaLabel="Selected product"
      disabled={!selectedRegion}
      filteringType="auto"
    />
  );
};

export default ProductSelector;
