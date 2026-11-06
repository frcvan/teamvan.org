import type { ImageMetadata } from "astro";

import firstLogo from "@/images/sponsors/first-logo.svg";
import mindforgeGuildLogo from "@/images/sponsors/mindforge-guild.jpeg";
import argosyFoundationLogo from "@/images/sponsors/argosy-foundation-logo.png";
import hcbLogo from "@/images/sponsors/hcb-logo.png";

export type SponsorLogo =
    { asset: ImageMetadata } | { url: string; width: number; height: number };

export interface Sponsor {
    name: string;
    href: string;
    logo: SponsorLogo;
}

export const sponsors: Sponsor[] = [
    {
        name: "FIRST Robotics Competition",
        href: "https://www.firstinspires.org/",
        logo: { asset: firstLogo },
    },
    {
        name: "The MindForge Guild",
        href: "https://themindforgeguild.org",
        logo: { asset: mindforgeGuildLogo },
    },
    {
        name: "Argosy Foundation",
        href: "https://www.argosyfnd.org/",
        logo: { asset: argosyFoundationLogo },
    },
    {
        name: "Hack Club Bank",
        href: "https://hackclub.com/hcb",
        logo: { asset: hcbLogo },
    },
    {
        name: "RMFG",
        href: "https://www.rmfg.com",
        // Hotlinked because we have no local copy of their logo; the intrinsic
        // size keeps the card from shifting while the image loads.
        logo: {
            url: "https://www.rmfg.com/RMFG-V2-Wordmark-Green-On-Black.png",
            width: 1337,
            height: 467,
        },
    },
];
