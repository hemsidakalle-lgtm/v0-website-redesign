"use client"

import { Check } from "lucide-react"

const features = [
  "Local service with a personal touch",
  "Ongoing support and maintenance",
  "Competitive pricing and transparent quotes",
  "Fast response times and dependable service",
  "Flexible support plans tailored to your needs",
  "Experienced technicians with years of expertise",
]

const stats = [
  { value: "10+", label: "Years Experience" },
  { value: "500+", label: "Projects Completed" },
  { value: "99%", label: "Client Satisfaction" },
  { value: "24/7", label: "Support Available" },
]

export function WhyUs() {
  return (
    <section id="why-us" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <span className="text-sm font-medium text-primary uppercase tracking-widest">
              Why Choose Us
            </span>
            <h2 className="mt-4 text-3xl lg:text-5xl font-bold tracking-tight text-balance">
              We are committed to delivering reliable, professional IT services
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Our team combines expertise, dedication, and personalized service in every 
              project we undertake. From simple home network upgrades to comprehensive 
              business solutions — we're here to help you every step of the way.
            </p>

            {/* Features List */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature) => (
                <div key={feature} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-sm text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Stats */}
          <div className="relative">
            {/* Background Card */}
            <div className="absolute inset-4 bg-primary/5 rounded-3xl -z-10" />
            
            <div className="grid grid-cols-2 gap-6 p-8">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`p-6 rounded-2xl bg-card border border-border ${
                    index === 0 ? "col-span-2 sm:col-span-1" : ""
                  }`}
                >
                  <div className="text-4xl lg:text-5xl font-bold text-primary">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
