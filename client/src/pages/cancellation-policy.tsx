export default function CancellationPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto px-4 py-12 space-y-8">
        <h1 className="text-4xl font-bold mb-8">Cancellation Policy</h1>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Cancellation by Customer</h2>
          <table className="w-full text-muted-foreground border border-border rounded-lg overflow-hidden">
            <thead className="bg-card">
              <tr>
                <th className="text-left p-3 border-b border-border">Cancellation Time</th>
                <th className="text-left p-3 border-b border-border">Refund Amount</th>
                <th className="text-left p-3">Cancellation Fee</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="p-3">Before 24 hours</td>
                <td className="p-3">100% refund</td>
                <td className="p-3">No fee</td>
              </tr>
              <tr className="border-b border-border">
                <td className="p-3">6-24 hours before</td>
                <td className="p-3">90% refund</td>
                <td className="p-3">10% of booking amount</td>
              </tr>
              <tr className="border-b border-border">
                <td className="p-3">2-6 hours before</td>
                <td className="p-3">75% refund</td>
                <td className="p-3">25% of booking amount</td>
              </tr>
              <tr>
                <td className="p-3">Within 2 hours / After confirmation</td>
                <td className="p-3">No refund</td>
                <td className="p-3">100% charge (non-refundable)</td>
              </tr>
            </tbody>
          </table>
          <p className="text-muted-foreground text-sm mt-4">
            *Time calculated from when technician confirms booking, not booking placement
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">2. Cancellation by Technician</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li>• Customer receives 100% refund</li>
            <li>• Technician may face penalties/suspension for frequent cancellations</li>
            <li>• If within 2 hours of scheduled time: Technician flagged for unreliability</li>
            <li>• Multiple cancellations may result in account suspension</li>
            <li>• Customer can request different technician</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">3. How to Cancel</h2>
          <ol className="space-y-2 text-muted-foreground">
            <li>1. Open LabourConnect app → Go to "My Bookings"</li>
            <li>2. Select the booking you want to cancel</li>
            <li>3. Click "Cancel Booking"</li>
            <li>4. Select cancellation reason from dropdown</li>
            <li>5. Confirm cancellation</li>
            <li>6. Refund will be processed as per policy above</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Exception Cases (No Cancellation Fees)</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li>• Service provider does not arrive (eligible for full refund + compensation)</li>
            <li>• Service provider is intoxicated or unfit</li>
            <li>• Service provider engages in misconduct/harassment</li>
            <li>• Emergency medical situation</li>
            <li>• Natural disaster or force majeure event</li>
            <li>• System error or double booking</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Recurring Service Cancellations</h2>
          <p className="text-muted-foreground mb-3">
            For weekly/monthly recurring services:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            <li>• Cancel individual session: 24 hours notice required</li>
            <li>• Cancel entire recurring service: 7 days notice (contract basis)</li>
            <li>• Partial refund for remaining sessions if contract allows</li>
            <li>• Early termination may incur 10% fee (see service agreement)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Refund Processing</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li>• Approved refunds processed within 24 hours</li>
            <li>• Can choose wallet credit (instant) or bank refund (2-3 days)</li>
            <li>• Cancellation fees deducted before refund calculation</li>
            <li>• GST implications handled as per tax regulations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">7. Habitual Cancellation Policy</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li>• 3+ cancellations in 30 days: Warning issued</li>
            <li>• 5+ cancellations in 30 days: Account restricted temporarily</li>
            <li>• Repeated pattern: Account may be suspended</li>
            <li>• Technicians: Same rules apply to protect customer interests</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">8. Dispute & Escalation</h2>
          <p className="text-muted-foreground">
            If you believe cancellation fee was wrongly charged, file dispute within 7 days. LabourConnect will review and provide refund if policy was misapplied.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">9. Contact Support</h2>
          <div className="bg-card border border-border p-4 rounded-lg">
            <p className="text-foreground">Email: support@labourconnect.in</p>
            <p className="text-foreground">Phone: +91 9910710219</p>
            <p className="text-foreground text-sm text-muted-foreground mt-2">24/7 support for cancellation issues</p>
          </div>
        </section>

        <section>
          <p className="text-xs text-muted-foreground">
            Last updated: November 2025 | Complies with E-commerce rules and Consumer Protection Act, 2019
          </p>
        </section>
      </div>
    </div>
  );
}
