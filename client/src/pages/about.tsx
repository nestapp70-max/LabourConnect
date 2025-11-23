export default function About() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-primary/10 to-transparent py-12 px-4">
        <div className="container max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About LabourConnect</h1>
          <p className="text-lg text-muted-foreground">
            Connecting India's skilled workforce with trusted customers across 100+ service categories
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container max-w-4xl mx-auto px-4 py-12 space-y-12">
        {/* Problem & Solution */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">The Problem We Solve</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            LabourConnect is a modern platform built to solve a long-standing problem in India: customers struggle to find trusted workers on time, and skilled labourers struggle to find safe, steady jobs with dignity.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            The platform connects people who need services with skilled professionals across more than 100 categories including construction labour, carpenters, electricians, plumbers, welders, AC and refrigerator technicians, EV repair specialists, housemaids, drivers, cooks, babysitters, gardeners, warehouse helpers, catering staff and many others.
          </p>
        </section>

        {/* Vision */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Workers deserve stable earning opportunities. Customers deserve reliable services without struggle. LabourConnect brings both sides together.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            This platform is designed for the real world — where families need trustworthy workers, and workers need fair chances, verified jobs and secure payments. Every technician and labour professional on the platform builds their public profile, ratings and repeat customers, ensuring long-term career growth instead of daily uncertainty.
          </p>
        </section>

        {/* Mission */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Purpose and Mission</h2>
          <p className="text-muted-foreground mb-4">The mission behind LabourConnect is clear:</p>
          <ul className="space-y-3">
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span className="text-muted-foreground">To make it easy for customers to get professional and affordable services anytime</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span className="text-muted-foreground">To provide labourers and technicians stable earning opportunities across India</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span className="text-muted-foreground">To bring dignity, safety and recognition to those who build and support our homes, workplaces and cities</span>
            </li>
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-4">
            LabourConnect is not just an application. It is a long-term effort toward labour security and a structured service ecosystem across India.
          </p>
        </section>

        {/* Founder */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Created and Owned by Sachida Nand Sharma</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            LabourConnect is conceptualised, designed, developed and owned by Sachida Nand Sharma.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The vision behind the platform comes from direct experience with the challenges faced by workers and customers in the unorganised labour market. Rather than building just another app, Sachida focused on solving problems that affect real Indian households and real workers every day — stable jobs, fair pricing, transparency and trust.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            LabourConnect continues to grow with the same belief: technology should work for people, not the other way around.
          </p>
        </section>

        {/* Company Info */}
        <section className="bg-card border border-border rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-6">Company Information</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <a href="mailto:support@labourconnect.in" className="text-primary font-medium hover:underline">
                support@labourconnect.in
              </a>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <a href="tel:+919910710219" className="text-primary font-medium hover:underline">
                +91 9910710219
              </a>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Network</p>
              <p className="text-foreground font-medium">Pan-India</p>
            </div>
          </div>
        </section>

        {/* Copyright */}
        <section className="text-center py-8 border-t border-border">
          <p className="text-muted-foreground">
            © 2025 LabourConnect — All rights reserved. Built and owned by Sachida Nand Sharma.
          </p>
        </section>
      </div>
    </div>
  );
}
