"use client"

import { 
  Monitor, 
  Network, 
  Globe, 
  Cloud, 
  Database, 
  ShieldCheck, 
  Headphones, 
  Lightbulb,
  ArrowUpRight
} from "lucide-react"

const services = [
  {
    icon: Monitor,
    title: "Hardware",
    description: "Tailored advice for the purchase, installation, and configuration of your new laptop, server, or accessories.",
  },
  {
    icon: Network,
    title: "Networking",
    description: "Stable, fast, and future-proof business networks. Always accessible for your customers.",
  },
  {
    icon: Globe,
    title: "Domains & Hosting",
    description: "We handle your domain name, web hosting, and email integration with seamless setup.",
  },
  {
    icon: Cloud,
    title: "Microsoft 365",
    description: "Transition to Microsoft 365 for seamless collaboration with employees, suppliers, and customers.",
  },
  {
    icon: Database,
    title: "Data Backup",
    description: "Properly configured backups of your critical business data — keeping cybercriminals out.",
  },
  {
    icon: ShieldCheck,
    title: "Cybersecurity",
    description: "Comprehensive protection against cyberattacks, allowing you to do business with peace of mind.",
  },
  {
    icon: Headphones,
    title: "IT Support",
    description: "Computer issues? We're here to help and can take control of your system remotely.",
  },
  {
    icon: Lightbulb,
    title: "IT Consulting",
    description: "We provide tailored IT advice, carefully aligned with your business needs and goals.",
  },
]

export function Services() {
  return (
    <section id="services" className="py-24 lg:py-32 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-secondary/30" />
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl">
          <span className="text-sm font-medium text-primary uppercase tracking-widest">
            Our Services
          </span>
          <h2 className="mt-4 text-3xl lg:text-5xl font-bold tracking-tight text-balance">
            IT solutions tailored to your business
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Comprehensive IT solutions, tailored to all your technology needs. We ensure 
            your systems remain secure, fast, and reliable.
          </p>
        </div>

        {/* Services Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group relative p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <service.icon className="w-6 h-6 text-primary" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                {service.title}
                <ArrowUpRight className="w-4 h-4 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all text-primary" />
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {service.description}
              </p>

              {/* Hover Gradient */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
