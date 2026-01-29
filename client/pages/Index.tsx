import { useState, useMemo } from "react";
import { Activity } from "lucide-react";

interface BMIResult {
  bmi: number | null;
  category: string;
  color: string;
  description: string;
}

export default function Index() {
  const [isMetric, setIsMetric] = useState(true);
  const [height, setHeight] = useState<number | string>("");
  const [weight, setWeight] = useState<number | string>("");

  const result: BMIResult = useMemo(() => {
    if (!height || !weight) {
      return {
        bmi: null,
        category: "",
        color: "text-gray-400",
        description: "",
      };
    }

    let h = Number(height);
    let w = Number(weight);

    // Convert to standard units (meters and kg)
    if (!isMetric) {
      h = (h * 0.3048) / 1; // feet to meters (ft * 0.3048)
      w = w * 0.453592; // pounds to kg
    } else {
      h = h / 100; // cm to meters
    }

    if (h <= 0 || w <= 0) {
      return {
        bmi: null,
        category: "",
        color: "text-gray-400",
        description: "",
      };
    }

    const bmi = w / (h * h);

    let category = "";
    let color = "";
    let description = "";

    if (bmi < 18.5) {
      category = "Underweight";
      color = "text-blue-500";
      description = "Below the healthy weight range";
    } else if (bmi < 25) {
      category = "Normal Weight";
      color = "text-green-500";
      description = "Healthy weight range";
    } else if (bmi < 30) {
      category = "Overweight";
      color = "text-yellow-500";
      description = "Above the healthy weight range";
    } else {
      category = "Obese";
      color = "text-red-500";
      description = "Significantly above healthy weight";
    }

    return { bmi: parseFloat(bmi.toFixed(1)), category, color, description };
  }, [height, weight, isMetric]);

  const categoryRanges = [
    {
      range: "< 18.5",
      category: "Underweight",
      color: "bg-blue-100 text-blue-800",
    },
    {
      range: "18.5 - 24.9",
      category: "Normal Weight",
      color: "bg-green-100 text-green-800",
    },
    {
      range: "25 - 29.9",
      category: "Overweight",
      color: "bg-yellow-100 text-yellow-800",
    },
    {
      range: "≥ 30",
      category: "Obese",
      color: "bg-red-100 text-red-800",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-br from-purple-500 to-blue-500 p-4 rounded-2xl">
              <Activity className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            BMI Calculator
          </h1>
          <p className="text-gray-600">Find your Body Mass Index</p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6 animate-slide-up">
          {/* Unit Toggle */}
          <div className="flex gap-2 mb-8">
            <button
              onClick={() => setIsMetric(true)}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                isMetric
                  ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Metric
            </button>
            <button
              onClick={() => setIsMetric(false)}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                !isMetric
                  ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Imperial
            </button>
          </div>

          {/* Input Fields */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Height {isMetric ? "(cm)" : "(ft)"}
              </label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder={isMetric ? "170" : "5.9"}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 text-lg transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Weight {isMetric ? "(kg)" : "(lbs)"}
              </label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder={isMetric ? "70" : "154"}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 text-lg transition-colors"
              />
            </div>
          </div>

          {/* Result */}
          {result.bmi !== null && (
            <div className="mt-8 pt-8 border-t-2 border-gray-100">
              <div className="text-center mb-6 animate-fade-in">
                <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500 mb-2">
                  {result.bmi}
                </div>
                <div className={`text-2xl font-bold ${result.color} mb-2`}>
                  {result.category}
                </div>
                <p className="text-gray-600">{result.description}</p>
              </div>
            </div>
          )}

          {result.bmi === null && (
            <div className="mt-8 pt-8 border-t-2 border-gray-100 text-center">
              <p className="text-gray-400">
                Enter your height and weight to calculate
              </p>
            </div>
          )}
        </div>

        {/* BMI Chart */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 animate-slide-up">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            BMI Categories
          </h2>
          <div className="space-y-3">
            {categoryRanges.map((item, index) => (
              <div
                key={index}
                className={`p-4 rounded-xl ${item.color} flex justify-between items-center font-semibold transition-all ${
                  result.category === item.category
                    ? "ring-2 ring-offset-2 ring-purple-500 scale-105"
                    : ""
                }`}
              >
                <span>{item.category}</span>
                <span className="text-sm opacity-75">{item.range}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>
            BMI is a screening tool for weight categories. Consult a healthcare
            provider for a complete assessment.
          </p>
        </div>
      </div>
    </div>
  );
}
