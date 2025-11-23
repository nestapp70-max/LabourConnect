export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto px-4 py-12 space-y-8">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li>• Personal information: Name, phone number, email, address</li>
            <li>• Identity documents: Aadhaar, PAN, voter ID (for verification)</li>
            <li>• Service data: Work history, ratings, reviews, job preferences</li>
            <li>• Payment information: Bank account, UPI details (never stored in full)</li>
            <li>• Device information: IP address, device type, operating system</li>
            <li>• Location data: Pincode, city, service area (with consent)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li>• To provide and improve our services</li>
            <li>• To verify identity and conduct background checks</li>
            <li>• To process payments and handle disputes</li>
            <li>• To communicate about bookings, updates, and support</li>
            <li>• To comply with legal and regulatory requirements</li>
            <li>• To prevent fraud and maintain platform security</li>
            <li>• To send promotional content (only with consent)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">3. Data Protection & Security</h2>
          <p className="text-muted-foreground mb-4">
            LabourConnect implements industry-standard security measures including:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            <li>• SSL encryption for data transmission</li>
            <li>• Secure password hashing</li>
            <li>• Regular security audits</li>
            <li>• Limited access to personal data (staff need-to-know basis)</li>
            <li>• Payment processing through PCI-DSS compliant gateways</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Data Sharing & Third Parties</h2>
          <p className="text-muted-foreground mb-4">
            We do NOT sell personal data. We may share information with:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            <li>• Payment gateways (Razorpay) - for transaction processing</li>
            <li>• SMS providers (Twilio) - for OTP verification</li>
            <li>• Law enforcement - if legally required</li>
            <li>• Service partners - only with explicit consent</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Your Rights Under DPDP Act, 2023</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li>• Right to know what data we collect about you</li>
            <li>• Right to correct inaccurate data</li>
            <li>• Right to erasure (with legal limitations)</li>
            <li>• Right to withdraw consent</li>
            <li>• Right to lodge complaints with regulatory authorities</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Cookies & Tracking</h2>
          <p className="text-muted-foreground">
            We use cookies for user preference, authentication, and analytics. You can disable cookies in your browser settings, but this may affect functionality.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">7. Data Retention</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li>• Active user data: Retained as long as account is active</li>
            <li>• After account deletion: Data deleted within 90 days (legal hold if dispute)</li>
            <li>• Payment records: Retained for 7 years (tax compliance)</li>
            <li>• Transaction logs: Retained for 5 years</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">8. Contact for Privacy Concerns</h2>
          <div className="bg-card border border-border p-4 rounded-lg">
            <p className="text-foreground mb-2">Data Protection Officer:</p>
            <p className="text-foreground">Email: privacy@labourconnect.in</p>
            <p className="text-foreground">Phone: +91 9910710219</p>
            <p className="text-foreground text-sm text-muted-foreground mt-2">We will respond to data requests within 30 days</p>
          </div>
        </section>

        <section>
          <p className="text-xs text-muted-foreground">
            Last updated: November 2025 | This policy complies with Digital Personal Data Protection Act, 2023 (DPDP) and Information Technology Act, 2000
          </p>
        </section>
      </div>
    </div>
  );
}
