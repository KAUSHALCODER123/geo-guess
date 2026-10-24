import type { Metadata } from "next";
import { getCountryByCode } from "@/lib/api/restcountries";
import { CountryDetailView } from "@/components/features/country";

interface PageProps {
  params: Promise<{ code: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { code } = await params;
  try {
    const country = await getCountryByCode(code);
    return {
      title: `${country.name.common} - FlagForge`,
      description: `Explore ${country.name.common} (${country.name.official}). Capital: ${
        country.capital?.join(", ") || "N/A"
      }, Region: ${country.region}, Population: ${country.population.toLocaleString()}.`,
      openGraph: {
        title: `${country.name.common} - FlagForge`,
        description: `Demographics, flag, weather, and geographical facts for ${country.name.common}.`,
        images: country.flags.png ? [{ url: country.flags.png }] : [],
      },
    };
  } catch {
    return {
      title: `${code.toUpperCase()} - FlagForge`,
      description: `Geographic information and national statistics for ${code.toUpperCase()}.`,
    };
  }
}

export function generateStaticParams() {
  const commonCodes = [
    "usa",
    "gbr",
    "ind",
    "fra",
    "jpn",
    "deu",
    "bra",
    "can",
    "aus",
    "zaf",
    "ita",
    "esp",
    "mex",
    "arg",
    "egy",
    "nga",
    "kor",
    "idn",
    "tur",
    "sau",
    "chn",
    "nor",
    "swe",
    "nzl",
    "sgp",
    "grc",
    "prt",
    "nld",
    "che",
  ];
  return commonCodes.map((code) => ({ code }));
}

export default async function CountryPage({ params }: PageProps) {
  const { code } = await params;
  return <CountryDetailView code={code} />;
}
