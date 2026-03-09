"use client"

import { useState, useEffect, useCallback } from "react"
import { 
  Monitor, 
  Network, 
  Globe, 
  Cloud, 
  Database, 
  ShieldCheck, 
  Headphones, 
  Lightbulb,
  ArrowUpRight,
  X,
  Check,
  type LucideIcon
} from "lucide-react"

interface ServiceDetail {
  icon: LucideIcon
  title: string
  description: string
  category: "Infrastructure" | "Cloud" | "Security" | "Support"
  fullDescription: string
  features: string[]
  pricing: {
    type: "hourly" | "monthly" | "project" | "custom"
    startingFrom?: number
    currency?: string
    note?: string
  }
}

const services: ServiceDetail[] = [
  {
    icon: Monitor,
    title: "Hardware",
    description: "Tailored advice for the purchase, installation, and configuration of your new laptop, server, or accessories.",
    category: "Infrastructure",
    fullDescription: "Get expert guidance on selecting the right hardware for your business needs. From workstations to servers, we ensure you make informed decisions that align with your budget and performance requirements.",
    features: [
      "Hardware selection consultation",
      "Professional installation & setup",
      "Configuration & optimization",
      "Data migration assistance",
      "Extended warranty options",
      "Ongoing maintenance support"
    ],
    pricing: {
      type: "hourly",
      startingFrom: 75,
      currency: "EUR",
      note: "Hardware costs quoted separately"
    }
  },
  {
    icon: Network,
    title: "Networking",
    description: "Stable, fast, and future-proof business networks. Always accessible for your customers.",
    category: "Infrastructure",
    fullDescription: "Build a robust network infrastructure that grows with your business. We design, implement, and maintain networks that ensure seamless connectivity, security, and performance for all your operations.",
    features: [
      "Network design & architecture",
      "Router & switch configuration",
      "WiFi optimization & coverage",
      "VPN setup for remote access",
      "Network security implementation",
      "Performance monitoring"
    ],
    pricing: {
      type: "project",
      startingFrom: 500,
      currency: "EUR",
      note: "Based on network size and complexity"
    }
  },
  {
    icon: Globe,
    title: "Domains & Hosting",
    description: "We handle your domain name, web hosting, and email integration with seamless setup.",
    category: "Infrastructure",
    fullDescription: "Secure your online presence with professional domain management and reliable hosting solutions. We handle the technical details so you can focus on your business.",
    features: [
      "Domain registration & transfers",
      "SSL certificate management",
      "Website hosting setup",
      "Professional email configuration",
      "DNS management",
      "99.9% uptime guarantee"
    ],
    pricing: {
      type: "monthly",
      startingFrom: 25,
      currency: "EUR",
      note: "Includes hosting & email"
    }
  },
  {
    icon: Cloud,
    title: "Microsoft 365",
    description: "Transition to Microsoft 365 for seamless collaboration with employees, suppliers, and customers.",
    category: "Cloud",
    fullDescription: "Empower your team with Microsoft 365's powerful suite of productivity tools. We handle the complete migration and setup, ensuring your team can collaborate effectively from anywhere.",
    features: [
      "License procurement & setup",
      "Email migration (any source)",
      "SharePoint & Teams configuration",
      "User training & onboarding",
      "Security & compliance setup",
      "Ongoing administration support"
    ],
    pricing: {
      type: "custom",
      note: "Microsoft licensing + setup fee from €299"
    }
  },
  {
    icon: Database,
    title: "Data Backup",
    description: "Properly configured backups of your critical business data — keeping cybercriminals out.",
    category: "Security",
    fullDescription: "Protect your business-critical data with automated, secure backup solutions. We implement robust backup strategies that ensure your data is always recoverable, even in worst-case scenarios.",
    features: [
      "Automated daily backups",
      "Cloud & local redundancy",
      "Encrypted data storage",
      "Disaster recovery planning",
      "Regular backup testing",
      "Quick data restoration"
    ],
    pricing: {
      type: "monthly",
      startingFrom: 49,
      currency: "EUR",
      note: "Based on data volume"
    }
  },
  {
    icon: ShieldCheck,
    title: "Cybersecurity",
    description: "Comprehensive protection against cyberattacks, allowing you to do business with peace of mind.",
    category: "Security",
    fullDescription: "Stay protected against evolving cyber threats with our comprehensive security solutions. We implement multi-layered defenses to safeguard your business, employees, and customer data.",
    features: [
      "Security assessment & audit",
      "Firewall configuration",
      "Antivirus & malware protection",
      "Email security & filtering",
      "Security awareness training",
      "24/7 threat monitoring"
    ],
    pricing: {
      type: "monthly",
      startingFrom: 99,
      currency: "EUR",
      note: "Per business, up to 10 users"
    }
  },
  {
    icon: Headphones,
    title: "IT Support",
    description: "Computer issues? We're here to help and can take control of your system remotely.",
    category: "Support",
    fullDescription: "Get fast, reliable IT support when you need it most. Our expert team is available to troubleshoot and resolve issues quickly, minimizing downtime and keeping your business running smoothly.",
    features: [
      "Remote desktop support",
      "On-site assistance available",
      "Quick response times",
      "Software troubleshooting",
      "Hardware diagnostics",
      "Priority support options"
    ],
    pricing: {
      type: "hourly",
      startingFrom: 65,
      currency: "EUR",
      note: "Support packages available"
    }
  },
  {
    icon: Lightbulb,
    title: "IT Consulting",
    description: "We provide tailored IT advice, carefully aligned with your business needs and goals.",
    category: "Support",
    fullDescription: "Make informed technology decisions with expert IT consulting. We analyze your current infrastructure, identify opportunities for improvement, and create strategic roadmaps aligned with your business objectives.",
    features: [
      "IT infrastructure assessment",
      "Technology roadmap planning",
      "Vendor selection guidance",
      "Budget optimization",
      "Digital transformation advice",
      "Compliance consultation"
    ],
    pricing: {
      type: "hourly",
      startingFrom: 95,
      currency: "EUR",
      note: "First consultation free"
    }
  },
]

const categoryColors: Record<string, string> = {
  Infrastructure: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Cloud: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Security: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Support: "bg-primary/10 text-primary border-primary/20",
}

interface ServiceModalProps {
  service: ServiceDetail | null
  isOpen: boolean
  onClose: () => void
}

function ServiceModal({ service, isOpen, onClose }: ServiceModalProps) {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    
    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }
    
    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

  if (!service) return null

  const formatPricing = (pricing: ServiceDetail["pricing"]) => {
    if (pricing.type === "custom") {
      return pricing.note || "Contact for pricing"
    }
    
    const typeLabels = {
      hourly: "/hour",
      monthly: "/month",
      project: " per project"
    }
    
    return `€${pricing.startingFrom}${typeLabels[pricing.type]}`
  }

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 z-50 transition-all duration-300 ${
          isOpen 
            ? "opacity-100 backdrop-blur-md bg-background/80" 
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Modal */}
      <div 
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
          isOpen 
            ? "opacity-100" 
            : "opacity-0 pointer-events-none"
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div 
          className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-card border border-border rounded-2xl shadow-2xl transition-all duration-300 ${
            isOpen 
              ? "scale-100 translate-y-0" 
              : "scale-95 translate-y-4"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors z-10"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="p-6 pb-0">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <service.icon className="w-7 h-7 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full border ${categoryColors[service.category]}`}>
                    {service.category}
                  </span>
                </div>
                <h2 id="modal-title" className="text-2xl font-bold">
                  {service.title}
                </h2>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Description */}
            <p className="text-muted-foreground leading-relaxed">
              {service.fullDescription}
            </p>

            {/* Features */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                What&apos;s included
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pricing */}
            <div className="bg-secondary/50 rounded-xl p-5 border border-border">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    Starting from
                  </h3>
                  <p className="text-3xl font-bold text-primary">
                    {formatPricing(service.pricing)}
                  </p>
                  {service.pricing.note && service.pricing.type !== "custom" && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {service.pricing.note}
                    </p>
                  )}
                </div>
                <button className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors whitespace-nowrap">
                  Get a Quote
                </button>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a 
                href="#contact" 
                onClick={onClose}
                className="flex-1 px-6 py-3 bg-foreground text-background font-medium rounded-lg hover:bg-foreground/90 transition-colors text-center"
              >
                Contact Us
              </a>
              <button 
                onClick={onClose}
                className="flex-1 px-6 py-3 border border-border font-medium rounded-lg hover:bg-muted transition-colors"
              >
                Back to Services
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export function Services() {
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = useCallback((service: ServiceDetail) => {
    setSelectedService(service)
    setIsModalOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setIsModalOpen(false)
    // Delay clearing the service to allow animation to complete
    setTimeout(() => setSelectedService(null), 300)
  }, [])

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

        {/* Category Legend */}
        <div className="mt-8 flex flex-wrap gap-3">
          {Object.entries(categoryColors).map(([category, colorClass]) => (
            <span 
              key={category}
              className={`text-xs font-medium px-3 py-1.5 rounded-full border ${colorClass}`}
            >
              {category}
            </span>
          ))}
        </div>

        {/* Services Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <button
              key={service.title}
              onClick={() => openModal(service)}
              className="group relative p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 text-left cursor-pointer"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Category Badge */}
              <span className={`absolute top-4 right-4 text-[10px] font-medium px-2 py-0.5 rounded-full border ${categoryColors[service.category]}`}>
                {service.category}
              </span>

              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <service.icon className="w-6 h-6 text-primary" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                {service.title}
                <ArrowUpRight className="w-4 h-4 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all text-primary" />
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {service.description}
              </p>

              {/* Pricing Preview */}
              <div className="pt-4 border-t border-border">
                <span className="text-xs text-muted-foreground">From </span>
                <span className="text-sm font-semibold text-primary">
                  {service.pricing.type === "custom" 
                    ? "Contact us" 
                    : `€${service.pricing.startingFrom}`}
                </span>
                {service.pricing.type !== "custom" && (
                  <span className="text-xs text-muted-foreground">
                    {service.pricing.type === "hourly" && "/hr"}
                    {service.pricing.type === "monthly" && "/mo"}
                    {service.pricing.type === "project" && ""}
                  </span>
                )}
              </div>

              {/* Hover Gradient */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
            </button>
          ))}
        </div>
      </div>

      {/* Modal */}
      <ServiceModal 
        service={selectedService} 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />
    </section>
  )
}
