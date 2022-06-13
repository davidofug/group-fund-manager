import React from "react";
import { Link } from "react-router-dom";
import PublicNav from "../shared/PublicNav";
import groupTable from "../../assets/images/group-table.png";
import Analytics from "../../assets/images/analytics-visualisation.png";
const Landingpage = () => {
	return (
		<>
			<header className="container max-w-screen-lg mx-auto">
				<PublicNav />
			</header>
			<section className="py-16 text-center">
				<h1 className="text-center text-3xl">
					Group Fund Management Automated.
				</h1>
				<figure>
					<img
						src={groupTable}
						alt="Savings group"
						className="w-1/2 h-auto mx-auto mt-16"
					/>
				</figure>
				<div className="py-8">
					<Link
						to="/login"
						className="bg-blue rounded-full text-2xl px-8 py-2 text-white transition duration-300 dark:bg-black hover:-translate-y-1 hover:bg-black">
						Get started
					</Link>
				</div>
			</section>
			<section className="container max-w-screen-lg mx-auto md:flex md:gap-14 xs:flex-reverse">
				<article className="md:w-1/2 lg:w-1/2">
					<h1 className="text-3xl font-bold mb-8">
						What you can do?
					</h1>
					<ul>
						<li className="mb-4">
							<span className="font-bold text-xl">Groups</span>
							<p>
								Conveniently add and delete groups of savers,
								investors and more.
							</p>
						</li>
						<li className="mb-4">
							<span className="font-bold text-xl">
								Group Members
							</span>
							<p>
								Add members to your groups. Want more members to
								join your group? Invite them at the click of a
								button.
							</p>
						</li>
						<li className="mb-4">
							<span className="font-bold text-xl">
								Transactions
							</span>
							<p>Add and track transactions in real-time.</p>
						</li>
						<li className="mb-4">
							<span className="font-bold text-xl">Analytics</span>
							<p>
								Are you hitting targets? See how you are doing
								in weekly reports.
							</p>
						</li>
					</ul>
				</article>
				<figure className="md:w-1/2 lg:w-1/2">
					<img
						src={Analytics}
						alt="Quick Analytics"
						className="w-full h-auto"
					/>
				</figure>
			</section>
			<footer className="bg-slate-200 py-8 mt-12">
				<section className="max-w-screen-lg mx-auto">
					<p className="text-center text-gray">
						&copy; Group Fund Manager{" "}
					</p>
				</section>
			</footer>
		</>
	);
};

export default Landingpage;
