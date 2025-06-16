import React, { useState } from "react";
import AppLayout from "@cloudscape-design/components/app-layout";
import Container from "@cloudscape-design/components/container";
import Header from "@cloudscape-design/components/header";
import Select from "@cloudscape-design/components/select";
import Button from "@cloudscape-design/components/button";
import SpaceBetween from "@cloudscape-design/components/space-between";

const serviceOptions = [
  { label: "Verified Permissions", value: "verified-permissions" },
  { label: "S3", value: "s3" },
  { label: "EC2", value: "ec2" },
];

const productOptions = [
  { label: "API Requests", value: "api-requests" },
  { label: "Storage", value: "storage" },
];

const durationOptions = [
  { label: "On-Demand", value: "on-demand" },
  { label: "1 Year Reserved", value: "1yr" },
  { label: "3 Year Reserved", value: "3yr" },
];

const regionOptions = [
  { label: "US East (N. Virginia)", value: "us-east-1" },
  { label: "EU (Ireland)", value: "eu-west-1" },
  { label: "Asia Pacific (Mumbai)", value: "ap-south-1" },
];

export default function App() {
  const [service, setService] = useState(serviceOptions[0]);
  const [product, setProduct] = useState(productOptions[0]);
  const [duration, setDuration] = useState(durationOptions[0]);
  const [region, setRegion] = useState(regionOptions[0]);

  return (
    <AppLayout
      content={
        <Container
          header={<Header variant="h1">AWS Pricelist Visualizer</Header>}
        >
          <SpaceBetween size="l">
            <SpaceBetween direction="horizontal" size="l">
              <Select
                selectedOption={service}
                onChange={({ detail }) => setService(detail.selectedOption)}
                options={serviceOptions}
                selectedAriaLabel="Selected service"
                placeholder="Select Service"
              />
              <Select
                selectedOption={product}
                onChange={({ detail }) => setProduct(detail.selectedOption)}
                options={productOptions}
                selectedAriaLabel="Selected product"
                placeholder="Select Product"
              />
              <Select
                selectedOption={duration}
                onChange={({ detail }) => setDuration(detail.selectedOption)}
                options={durationOptions}
                selectedAriaLabel="Selected duration"
                placeholder="Select Duration"
              />
              <Select
                selectedOption={region}
                onChange={({ detail }) => setRegion(detail.selectedOption)}
                options={regionOptions}
                selectedAriaLabel="Selected region"
                placeholder="Select Region"
              />
            </SpaceBetween>
            <SpaceBetween direction="horizontal" size="m">
              <Button variant="primary">View Pricing</Button>
              <Button>Show Discounts</Button>
              <Button variant="link">Help</Button>
            </SpaceBetween>
          </SpaceBetween>
        </Container>
      }
    />
  );
}
