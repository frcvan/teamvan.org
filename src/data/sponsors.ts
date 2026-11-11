import type { ImageMetadata } from "astro";

import mindforgeGuildLogo from "@/images/sponsors/mindforge-guild.png";
import argosyFoundationLogo from "@/images/sponsors/argosy-foundation-logo.png";
import hcbLogo from "@/images/sponsors/hcb-logo.png";
import nasaLogo from "@/images/sponsors/nasa-logo.svg";

export type SponsorLogo =
    { asset: ImageMetadata } | { url: string; width: number; height: number };

export type SponsorTierId =
    | "diamond"
    | "platinum"
    | "gold"
    | "silver"
    | "bronze"
    | "friend"
    | "partner";

export interface SponsorshipTier {
    id: SponsorTierId;
    label: string;
    /** Heading used wherever the tier's sponsors are listed. */
    heading: string;
}

// Ordered highest first. What each tier includes, and what it takes to reach
// one, lives in the investment packet.
export const sponsorshipTiers: SponsorshipTier[] = [
    { id: "diamond", label: "Diamond", heading: "Diamond Sponsors" },
    { id: "platinum", label: "Platinum", heading: "Platinum Sponsors" },
    { id: "gold", label: "Gold", heading: "Gold Sponsors" },
    { id: "silver", label: "Silver", heading: "Silver Sponsors" },
    { id: "bronze", label: "Bronze", heading: "Bronze Sponsors" },
    { id: "friend", label: "Friend", heading: "Friends of the Team" },
    { id: "partner", label: "Partner", heading: "Partners" },
];

const partnerTier = sponsorshipTiers[sponsorshipTiers.length - 1];

export const tierById = (id: SponsorTierId): SponsorshipTier =>
    sponsorshipTiers.find((tier) => tier.id === id) ?? partnerTier;

export interface Sponsor {
    name: string;
    href: string;
    logo: SponsorLogo;
    tier: SponsorTierId;
}

export const sponsors: Sponsor[] = [
    {
        name: "NASA",
        href: "https://www.nasa.gov/",
        logo: { asset: nasaLogo },
        tier: "gold",
    },
    {
        name: "The MindForge Guild",
        href: "https://themindforgeguild.org",
        logo: { asset: mindforgeGuildLogo },
        tier: "platinum",
    },
    {
        name: "Argosy Foundation",
        href: "https://www.argosyfnd.org/",
        logo: { asset: argosyFoundationLogo },
        tier: "gold",
    },
    {
        name: "Hack Club Bank",
        href: "https://hackclub.com/hcb",
        logo: { asset: hcbLogo },
        tier: "bronze",
    },
    {
        name: "RMFG",
        href: "https://www.rmfg.com",
        tier: "bronze",
        // Hotlinked because we have no local copy of their logo; the intrinsic
        // size keeps the card from shifting while the image loads.
        logo: {
            url: "https://www.rmfg.com/RMFG-V2-Wordmark-Green-On-Black.png",
            width: 1337,
            height: 467,
        },
    },
];

export interface SponsorGroup {
    tier: SponsorshipTier;
    sponsors: Sponsor[];
}

/** Sponsors grouped by tier, highest tier first, with empty tiers dropped. */
export const sponsorsByTier: SponsorGroup[] = sponsorshipTiers
    .map((tier) => ({
        tier,
        sponsors: sponsors.filter((sponsor) => sponsor.tier === tier.id),
    }))
    .filter(({ sponsors: tierSponsors }) => tierSponsors.length > 0);
