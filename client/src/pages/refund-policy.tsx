export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto px-4 py-12 space-y-8">
        <h1 className="text-4xl font-bold mb-8">Refund Policy</h1>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. When Refunds Are Applicable</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li>• Service not provided by technician (no-show)</li>
            <li>• Service cancelled by technician before work begins</li>
            <li>• Service incompletely provided and customer cancels before work begins</li>
            <li>• Duplicate payment or payment errors</li>
            <li>• Fraudulent activity or service provider misconduct</li>
            <li>• Service does not match agreed description</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">2. When Refunds Are NOT Applicable</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li>• Service completed as per agreement</li>
            <li>• Customer-requested cancellation after work begins (see Cancellation Policy)</li>
            <li>• Service quality disputes (use complaint procedure instead)</li>
            <li>• Change of mind after booking</li>
            <li>• Customer unavailability on service date</li>
            <li>• Third-party payment issues (bank declined, UPI failed)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">3. Refund Timeline (RBI & Consumer Protection Compliance)</h2>
          <ol className="space-y-2 text-muted-foreground">
            <li>1. <strong>Request Submission:</strong> File refund request within 7 days of transaction</li>
            <li>2. <strong>Investigation:</strong> LabourConnect investigates within 5 business days</li>
            <li>3. <strong>Decision:</strong> Refund decision communicated within 14 days</li>
            <li>4. <strong>Processing:</strong> Approved refunds processed to original payment method within 5-7 business days</li>
            <li>5. <strong>Bank Processing:</strong> Bank processes refund, typically 2-3 business days</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Refund Process</h2>
          <ol className="space-y-3 text-muted-foreground">
            <li>
              <strong>Step 1:</strong> Go to "My Bookings" → Select service → Click "Request Refund"
            </li>
            <li>
              <strong>Step 2:</strong> Provide reason and supporting documents (photos, videos, witness info)
            </li>
            <li>
              <strong>Step 3:</strong> LabourConnect contacts technician for their version
            </li>
            <li>
              <strong>Step 4:</strong> Both parties have 3 days to provide evidence
            </li>
            <li>
              <strong>Step 5:</strong> LabourConnect makes decision based on evidence
            </li>
            <li>
              <strong>Step 6:</strong> Refund processed to wallet or original payment method
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Wallet Credit vs. Bank Refund</h2>
          <div className="bg-card border border-border p-4 rounded-lg space-y-3">
            <div>
              <p className="text-foreground font-semibold">Wallet Credit (Faster):</p>
              <p className="text-muted-foreground text-sm">• Credited immediately after approval</p>
              <p className="text-muted-foreground text-sm">• Can be used for future bookings</p>
            </div>
            <div>
              <p className="text-foreground font-semibold">Bank Refund (Preferred):</p>
              <p className="text-muted-foreground text-sm">• Processed to original payment method</p>
              <p className="text-muted-foreground text-sm">• Takes 5-7 business days</p>
              <p className="text-muted-foreground text-sm">• Always available on request</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Partial Refunds</h2>
          <p className="text-muted-foreground mb-3">
            For partially completed work, refund calculation:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            <li>• Refund % = (Work not done %) × (Amount Paid)</li>
            <li>• Technician may be entitled to compensation for materials/travel</li>
            <li>• Disputes resolved by LabourConnect based on evidence</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">7. Escalation & Consumer Remedies</h2>
          <p className="text-muted-foreground mb-3">
            If unsatisfied with refund decision, you can:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            <li>• File complaint at District Consumer Disputes Redressal Commission</li>
            <li>• Seek damages for deficiency in service (Consumer Protection Act, 2019)</li>
            <li>• Request compensation for harassment/unfair trade practice</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">8. Contact for Refund Issues</h2>
          <div className="bg-card border border-border p-4 rounded-lg">
            <p className="text-foreground">Email: refunds@labourconnect.in</p>
            <p className="text-foreground">Phone: +91 9910710219</p>
            <p className="text-foreground text-sm text-muted-foreground mt-2">Response within 24 business hours</p>
          </div>
        </section>

        <section>
          <p className="text-xs text-muted-foreground">
            Last updated: November 2025 | Complies with RBI payment guidelines and Consumer Protection Act, 2019
          </p>
        </section>
      </div>
    </div>
  );
}
