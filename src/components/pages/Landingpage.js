import React from "react";
import PublicNav from "../shared/PublicNav";

const Landingpage = () => {
	return (
		<section>
			<header className="container max-w-screen-lg mx-auto">
				<PublicNav />
			</header>
			<section className="p-24">
				<h1 className="text-center text-3xl">
					Track Group Funds in One Place.
				</h1>
			</section>
			<section className="container max-w-screen-lg mx-auto md:flex md:gap-14 md:py-24">
				<article className="p-6">
					<h1 className="text-3xl font-bold">
						What can you do with Group Fund Manager?
					</h1>
				</article>
				<article>
					<ul>
						<li>Groups</li>
						<li>Members</li>
						<li>Transactions</li>
						<li>Analytics</li>
					</ul>
				</article>
			</section>
			<footer>
				<section className="max-w-screen-lg">
					<p className="text-center text-gray">
						&copy; Group Fund Manager{" "}
					</p>
				</section>
			</footer>
		</section>
	);
};

export default Landingpage;
