"use client";
import React from "react";
import "./Stepper.css";

interface StepperProps {
  currentStep: number;
}

const steps = [
  "Search",
  "Select Room",
  "Contact Information",
  "Confirmation",
];

export default function Stepper({ currentStep }: StepperProps) {
  return (
    <div className="stepper-container">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber <= currentStep;
        return (
          <div
            key={step}
            className={`step-item ${isActive ? "active" : ""}`}
          >
            <div className="step-circle">{stepNumber}</div>
            <div className="step-label">{step}</div>
          </div>
        );
      })}
    </div>
  );
}