
import { LandingHero } from "@/components/landing-hero";
import { LandingNavbar } from "@/components/landing-navbar";

const LandingLayout = async ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
        <main className="h-full bg-[#111827] overflow-auto">
            <div className="mx-auto max-w-screen-xl h-full w-full">
                <LandingNavbar/>
                <LandingHero/>
            </div>
        </main>
    )
}

export default LandingLayout;