import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

export default function Navigation({
    navlinks,
    className,
}: {
    navlinks: {
        href: string;
        label: string;
        labelClass?: string;
        active?: boolean;
    }[];
    className?: string;
}) {
    return (
        <NavigationMenu className={className}>
            <NavigationMenuList>
                {navlinks.map((navlink) => (
                    <NavigationMenuItem key={navlink.href}>
                        <NavigationMenuLink
                            render={<a href={navlink.href} />}
                            aria-current={navlink.active ? "page" : undefined}
                            className={cn(
                                navigationMenuTriggerStyle(),
                                navlink.active &&
                                    "bg-main text-main-foreground border-border",
                                navlink.labelClass || "",
                            )}
                        >
                            {navlink.label}
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    );
}
