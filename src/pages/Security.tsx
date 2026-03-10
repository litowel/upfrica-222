import { Shield, Lock, Server, FileCheck } from "lucide-react";

export default function Security() {
  return (
    <div className="bg-white pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-4xl font-bold mb-6">Bank-grade security</h1>
          <p className="text-xl text-neutral-600">
            Your funds and data are protected by industry-leading infrastructure.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-24">
          <div className="flex gap-6">
            <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 shrink-0">
              <Shield size={32} />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-3">Multi-Signature Wallets</h3>
              <p className="text-neutral-600 leading-relaxed">
                We use Safe Global infrastructure to secure all treasury assets. Every transaction requires multiple approvals, making it impossible for a single point of failure to compromise funds.
              </p>
            </div>
          </div>

          <div className="flex gap-6">
            <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 shrink-0">
              <Lock size={32} />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-3">Encryption at Rest</h3>
              <p className="text-neutral-600 leading-relaxed">
                All sensitive data, including API keys and personal information, is encrypted using AES-256 before being stored in our databases.
              </p>
            </div>
          </div>

          <div className="flex gap-6">
            <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 shrink-0">
              <Server size={32} />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-3">ISO 27001 Compliant</h3>
              <p className="text-neutral-600 leading-relaxed">
                Our infrastructure provider is ISO 27001 certified, ensuring rigorous information security management standards are met.
              </p>
            </div>
          </div>

          <div className="flex gap-6">
            <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 shrink-0">
              <FileCheck size={32} />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-3">Real-time Fraud Detection</h3>
              <p className="text-neutral-600 leading-relaxed">
                We monitor all transactions in real-time using AI-driven fraud detection systems to prevent unauthorized access and suspicious activity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
