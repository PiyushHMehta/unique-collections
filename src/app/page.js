import Hero from "@/components/layout/Hero";
import HomeMenu from "@/components/layout/HomeMenu";
import SectionHeaders from "@/components/layout/SectionHeaders";

export default function Home() {
	return (
		<>
			<Hero />
			<HomeMenu />
			<section className="text-center my-16">
				<SectionHeaders subHeader={'Our Story'} mainHeader={'About Us'} id="about" />
				<div className="max-w-2xl mx-auto text-gray-500 mt-4 flex flex-col gap-4">
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.

					</p>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
					</p>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
					</p>
				</div>
			</section>

			<section className="text-center my-8" id="contact">
				<SectionHeaders subHeader={'Got any queries'} mainHeader={'Contact Us'} />
				<div className="mt-8">
					<a href="tel:+43738123123" className="text-4xl underline">+43 738 123 123</a>
				</div>
			</section>

			
		</>
	);
}
