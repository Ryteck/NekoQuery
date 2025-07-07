"use client";

import { useNavigationStore } from "@/stores/navigation";
import { useEffect } from "react";

export default function Page() {
	const navigationStore = useNavigationStore();

	useEffect(() => {
		navigationStore.setCurrentPage("About");
	}, []);

	return (
		<div className="mx-auto prose dark:prose-invert text-justify">
			<section>
				<h2>Disclaimer</h2>
				<p>
					⚠️ This page is a mockup created for demonstration and testing purposes
					only. All content, including the About, Terms of Service, and Privacy
					Policy sections, is purely fictional and does not represent any real
					entity or enforceable agreement.
				</p>
			</section>

			<section>
				<h1>About Us</h1>

				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sit
					amet facilisis sapien. Nam scelerisque diam vel nisl volutpat, sed
					cursus felis tincidunt. Etiam in feugiat nisl. Nulla at lacus nec
					sapien tincidunt rhoncus. Integer in luctus purus.
				</p>

				<p>
					Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
					posuere cubilia curae; Vestibulum tincidunt eu nibh nec pharetra. Sed
					congue, justo ut eleifend convallis, ligula risus commodo lorem, in
					finibus lorem arcu eget felis. Cras vel rhoncus nisl.
				</p>

				<p>
					Proin euismod lorem id felis varius tristique. Integer eu blandit
					sapien. Suspendisse potenti. Duis fermentum, lorem vel dignissim
					gravida, nisi orci vehicula nisi, ac fermentum ex augue non magna.
					Quisque pretium, tortor vel scelerisque accumsan, sapien turpis
					pretium erat, at aliquam lectus sapien nec nisl.
				</p>

				<p>
					Nunc at lacus nec sapien sodales tempor. Integer tincidunt, nulla in
					rhoncus laoreet, arcu sapien malesuada magna, non porttitor mauris
					ipsum nec lacus. Donec et eros ac nulla bibendum luctus. Sed eget orci
					vel sem commodo gravida. Lorem ipsum dolor sit amet, consectetur
					adipiscing elit.
				</p>
			</section>

			<section>
				<h1>Terms of Service</h1>

				<h2>1. Introduction</h2>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eget
					lorem vitae odio blandit rutrum. Curabitur luctus, arcu non fermentum
					tincidunt, turpis erat varius mi, non cursus odio metus at nibh. Fusce
					in aliquam ligula. Pellentesque habitant morbi tristique senectus et
					netus et malesuada fames ac turpis egestas.
				</p>

				<h2>2. Use of Services</h2>
				<p>
					Sed ut perspiciatis unde omnis iste natus error sit voluptatem
					accusantium doloremque laudantium. Nemo enim ipsam voluptatem quia
					voluptas sit aspernatur aut odit aut fugit. Neque porro quisquam est,
					qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.
				</p>
				<p>
					Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis
					suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis
					autem vel eum iure reprehenderit qui in ea voluptate velit esse quam
					nihil molestiae consequatur?
				</p>

				<h2>3. Account Responsibility</h2>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec libero
					vel ex dapibus finibus. Nulla vel leo a nulla porta fermentum.
					Suspendisse potenti. Vivamus suscipit dui nec purus porttitor
					vestibulum. Pellentesque nec commodo justo. Sed congue leo eget sapien
					malesuada, a luctus nisi pretium.
				</p>

				<h2>4. Intellectual Property</h2>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed cursus,
					justo nec sollicitudin dapibus, eros nulla pulvinar turpis, ac
					imperdiet erat odio vel nisl. Integer id orci sed nulla pulvinar
					tincidunt. Mauris at luctus nunc.
				</p>
				<p>
					Vivamus sagittis est in justo bibendum, nec tincidunt elit tincidunt.
					Fusce tincidunt odio sed volutpat varius. Aenean tempor, tortor id
					sodales fermentum, justo ex vulputate risus, nec cursus arcu sapien at
					orci.
				</p>

				<h2>5. Termination</h2>
				<p>
					Duis sit amet enim vitae nunc porttitor cursus. Curabitur vulputate
					sapien vel erat volutpat, vel porta neque semper. Proin non orci sed
					sem convallis aliquam. Nulla facilisi.
				</p>
				<p>
					Aenean non augue eget augue imperdiet cursus. Lorem ipsum dolor sit
					amet, consectetur adipiscing elit. Nulla dapibus lorem non augue
					faucibus, nec posuere justo hendrerit.
				</p>

				<h2>6. Governing Law</h2>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sed
					sodales diam, nec volutpat tortor. Suspendisse eu feugiat justo.
					Integer nec orci sed justo pulvinar suscipit. Nunc sit amet fermentum
					risus.
				</p>
				<p>
					Morbi nec lacinia lorem. Nulla facilisi. In euismod sapien vitae purus
					tincidunt, at placerat sapien volutpat. Integer dictum metus vitae
					diam efficitur tincidunt.
				</p>
			</section>

			<section>
				<h1>Privacy Policy</h1>

				<h2>1. Information Collection</h2>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sodales
					risus in mi fringilla, non commodo metus eleifend. Nullam convallis
					felis eget metus laoreet, non feugiat est posuere. Cras eget magna ut
					massa tincidunt convallis nec vel enim.
				</p>

				<h2>2. Use of Personal Information</h2>
				<p>
					Aenean sed metus et sem commodo pulvinar non vitae sapien. Integer
					dignissim, sapien sit amet tincidunt eleifend, erat lacus lacinia leo,
					sed tristique nisi nisi a justo. Lorem ipsum dolor sit amet,
					consectetur adipiscing elit.
				</p>

				<h2>3. Sharing of Information</h2>
				<p>
					Curabitur tincidunt ligula ac eros rhoncus, in tristique nulla
					iaculis. Donec ultricies est sed lectus euismod luctus. Maecenas in
					risus vel magna rhoncus imperdiet. Nam porttitor ante sed sapien
					facilisis, non porttitor ligula sollicitudin.
				</p>

				<h2>4. Data Security</h2>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
					convallis, massa sed suscipit rutrum, nisl magna bibendum eros, nec
					dapibus justo augue a quam. Sed semper ex eget diam gravida porttitor.
					In posuere magna at convallis tempus.
				</p>

				<h2>5. Your Rights</h2>
				<p>
					Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
					posuere cubilia curae; Suspendisse et neque id sem pulvinar tincidunt.
					Duis eget fermentum elit. Aliquam erat volutpat. Curabitur id erat a
					sem feugiat scelerisque. Morbi tincidunt luctus purus.
				</p>

				<h2>6. Changes to This Policy</h2>
				<p>
					Aliquam sed elit a purus tempor porttitor nec at justo. Praesent
					feugiat sapien ac mauris pulvinar, eget bibendum tortor laoreet.
					Quisque gravida, arcu sed imperdiet mattis, sapien velit iaculis ante,
					non congue augue sapien id augue.
				</p>
			</section>
		</div>
	);
}
