const statusSteps = ["pending", "preparing", "completed"];

export default function OrderProgress({ status }) {
  const currentStepIndex = statusSteps.indexOf(status);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-warm-100 mb-6">
      <h2 className="font-semibold text-warm-900 mb-4">Order Progress</h2>

      <div className="flex items-center justify-between">
        {statusSteps.map((step, idx) => (
          <div key={step} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  idx <= currentStepIndex
                    ? "bg-primary text-white"
                    : "bg-warm-200 text-warm-400"
                }`}
              >
                {idx + 1}
              </div>

              <span
                className={`text-xs mt-2 font-medium capitalize ${
                  idx <= currentStepIndex ? "text-primary" : "text-warm-400"
                }`}
              >
                {step}
              </span>
            </div>

            {idx < statusSteps.length - 1 && (
              <div
                className={`flex-1 h-1 mx-2 rounded-full ${
                  idx < currentStepIndex ? "bg-primary" : "bg-warm-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
