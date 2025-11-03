import Stepper from "@/app/components/Stepper";
import Card from "@/app/components/Card";
import './page.css'

export default function Page() {
  return (
    <div className="container">
      <div className="stepper-inner">
        <Stepper currentStep={2} />
        <div className="filters">
          <div className="date-range">
            JUN 17, 2025 &rarr; JUN 18, 2025
          </div>
          <div className="capacity">
            1 Guest | 1 Night
          </div>
        </div>
        <div className="room-list">
          <Card/>
          <Card/>
        </div>
      </div>
    </div>
  );
}