import React from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarMenuToggle,
    NavbarMenuItem,
    NavbarMenu,
    NavbarContent,
    NavbarItem,
    Link,
} from "@heroui/react";
import { ThemeSwitch } from "@/components/theme-switch";
import { Button } from "@heroui/button";
import GridUniUnica from "@/template/grid";
import LogoSVG from "../logoUnicaSVG/logo";

const AcmeLogo = () => (
    <div className="shrink-0">
        <LogoSVG />
    </div>
);

export default function AppHeader() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const menuItems = [
        "Graduação", "Pós-Graduação", "Segunda-Graduação", "Disciplina-Isolada",
    ];

    const wrapper = "max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8";

    return (
        <GridUniUnica cols="12" className="w-full">
            <Navbar
                position="static"
                isMenuOpen={isMenuOpen}
                onMenuOpenChange={setIsMenuOpen}
                className="hidden sm:flex border-none bg-transparent !px-0"
                classNames={{
                    wrapper,
                    item: "!px-0",
                }}
            >
                <NavbarContent justify="center" className="gap-44">
                    <NavbarItem>
                        <Link color="foreground" href="#" className="hover:text-[#6424b3] transition-colors">
                            Graduação
                        </Link>
                    </NavbarItem>
                    <NavbarItem isActive>
                        <Link color="foreground" href="#" className="hover:text-[#6424b3] transition-colors">
                            Segunda Graduação
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link color="foreground" href="#" className="hover:text-[#6424b3] transition-colors">
                            Pós-Graduação
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link color="foreground" href="#" className="hover:text-[#6424b3] transition-colors">
                            Disciplina Isolada
                        </Link>
                    </NavbarItem>
                </NavbarContent>

                <NavbarContent justify="end" className="!px-0">
                    <NavbarItem><ThemeSwitch /></NavbarItem>
                </NavbarContent>
            </Navbar>

            <Navbar
                isMenuOpen={isMenuOpen}
                onMenuOpenChange={setIsMenuOpen}
                className="border-none bg-transparent !px-0"
                classNames={{
                    wrapper: "max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8",
                    brand: "!px-0",
                }}
            >
                <NavbarContent className="sm:hidden" justify="start">
                    <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
                </NavbarContent>
                <NavbarContent justify="start">
                    <NavbarBrand className="m-0 p-0">
                        <AcmeLogo />
                    </NavbarBrand>
                </NavbarContent>

                <NavbarContent className="hidden sm:flex flex-1" />

                <NavbarContent className="hidden sm:flex" justify="end">
                    <NavbarItem>
                        <Button as={Link} color="warning" href="#" variant="flat">
                            Já Sou Aluno
                        </Button>
                    </NavbarItem>
                </NavbarContent>

                <NavbarMenu>
                    {menuItems.map((item, idx) => (
                        <NavbarMenuItem key={item}>
                            <Link
                                className="w-full text-white"
                                href="#"
                                size="lg"
                            >
                                {item}
                            </Link>
                        </NavbarMenuItem>
                    ))}
                </NavbarMenu>
            </Navbar>

        </GridUniUnica>
    );
}
