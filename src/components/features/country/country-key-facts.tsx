"use client";

import * as React from "react";
import {
  Building2,
  Languages,
  Coins,
  Phone,
  Clock,
  Compass,
  Disc3,
  ShieldCheck,
} from "lucide-react";
import type { Country } from "@/types";
import { Badge } from "@/components/ui/badge";

export interface CountryKeyFactsProps {
  country: Country;
}

export function CountryKeyFacts({ country }: CountryKeyFactsProps) {
  // Format currencies
  const currenciesFormatted = React.useMemo(() => {
    const list = Object.entries(country.currencies || {});
    if (list.length === 0) return "N/A";
    return list
      .map(([code, cur]) => `${cur.name || code} (${cur.symbol || code})`)
      .join(", ");
  }, [country.currencies]);

  // Format languages
  const languagesFormatted = React.useMemo(() => {
    const list = Object.values(country.languages || {});
    if (list.length === 0) return "N/A";
    return list.join(", ");
  }, [country.languages]);

  // Format calling codes
  const callingCodesFormatted = React.useMemo(() => {
    if (!country.callingCodes || country.callingCodes.length === 0) return "N/A";
    return country.callingCodes.join(", ");
  }, [country.callingCodes]);

  // Format timezones
  const timezonesFormatted = React.useMemo(() => {
    if (!country.timezones || country.timezones.length === 0) return "N/A";
    if (country.timezones.length <= 3) return country.timezones.join(", ");
    return `${country.timezones.slice(0, 3).join(", ")} (+${country.timezones.length - 3} more)`;
  }, [country.timezones]);

  const facts = [
    {
      icon: <Building2 className="h-4 w-4 text-primary" />,
      label: "Capital City",
      value: country.capital?.length > 0 ? country.capital.join(", ") : "None (No official capital)",
    },
    {
      icon: <Languages className="h-4 w-4 text-primary" />,
      label: "Official Languages",
      value: languagesFormatted,
    },
    {
      icon: <Coins className="h-4 w-4 text-primary" />,
      label: "Currency",
      value: currenciesFormatted,
    },
    {
      icon: <Phone className="h-4 w-4 text-primary" />,
      label: "Calling Code",
      value: callingCodesFormatted,
    },
    {
      icon: <Clock className="h-4 w-4 text-primary" />,
      label: "Timezones",
      value: timezonesFormatted,
    },
    {
      icon: <Disc3 className="h-4 w-4 text-primary" />,
      label: "Driving Side",
      value: country.carSide
        ? `Drives on the ${country.carSide}`
        : "Right-hand traffic",
    },
    {
      icon: <ShieldCheck className="h-4 w-4 text-primary" />,
      label: "UN Membership",
      value: country.unMember ? "Full Member State" : "Non-member / Special Territory",
      badge: country.unMember ? (
        <Badge variant="success" size="sm">Member</Badge>
      ) : (
        <Badge variant="secondary" size="sm">Non-member</Badge>
      ),
    },
    {
      icon: <Compass className="h-4 w-4 text-primary" />,
      label: "Coastline Status",
      value: country.landlocked ? "Landlocked (No direct ocean access)" : "Coastal sovereign territory",
      badge: country.landlocked ? (
        <Badge variant="warning" size="sm">Landlocked</Badge>
      ) : (
        <Badge variant="outline" size="sm">Coastal</Badge>
      ),
    },
  ];

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-xs space-y-4">
      <h2 className="text-lg font-bold text-foreground tracking-tight">
        Key Facts & Geopolitical Status
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {facts.map((fact, idx) => (
          <div
            key={idx}
            className="flex flex-col justify-between rounded-lg border border-border/50 bg-muted/20 p-4 space-y-2"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] uppercase font-bold tracking-wider text-muted-foreground flex items-center gap-1.5">
                {fact.icon}
                {fact.label}
              </span>
              {fact.badge}
            </div>
            <div className="text-sm font-semibold text-foreground break-words">
              {fact.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
