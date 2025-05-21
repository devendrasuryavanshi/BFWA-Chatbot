import Features from "@/components/home/features";
import Work from "@/components/home/work";
import Hero from "@/components/home/hero";

export default function Home() {
    return (
        <div className="overflow-hidden">
            <Hero />
            <Features />
            <Work />
        </div>
    );
}
