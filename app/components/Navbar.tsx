import { useState } from "react";
import { NavLink } from "react-router";
import { SiDatabricks } from "react-icons/si";
import { FaTimes, FaBars } from "react-icons/fa";

const Navbar = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	const base = "transition hover:text-blue-400";
	const active = "text-blue-400 font-semibold";

	return (
		<nav className="bg-gray-800 border-b border-gray-700 sticky top-0 shadow-md z-50">
			<div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
				<NavLink
					to="/"
					className="flex items-center gap-2 text-lg font-bold text-blue-300"
				>
					<SiDatabricks className="text-blue-400 text-xl" />
					<span>Tom.Camp Dashboard</span>
				</NavLink>
				{/* Desktop nav */}
				<div className="hidden md:flex items-center gap-6">
					<div className="space-x-4 text-sm text-gray-300">
						<NavLink
							className={({ isActive }) => (isActive ? active : base)}
							to="/"
						>
							Home
						</NavLink>
						<NavLink
							className={({ isActive }) => (isActive ? active : base)}
							to="/germinator"
						>
							Germinator
						</NavLink>
						<NavLink
							className={({ isActive }) => (isActive ? active : base)}
							to="/nulay"
						>
							NuLay Inn
						</NavLink>
					</div>
				</div>

				<div className="md:hidden flex items-center gap-4">
					<button onClick={() => setMenuOpen(!menuOpen)} className="text-blue-400 text-xl cursor-pointer" title="Menu">
						{menuOpen ? <FaTimes /> : <FaBars />}
					</button>
				</div>
			</div>

			{/* Mobile nav */}
			{
				menuOpen && (
					<div className="md:hidden text-white bg-gray-800 border-t border-gray-700 px-6 py-4 space-y-2 space-x-4 text-center">
						<NavLink
							className={({ isActive }) => (isActive ? active : base)}
							to="/"
							onClick={() => setMenuOpen(false)}
						>
							Home
						</NavLink>
						<NavLink
							className={({ isActive }) => (isActive ? active : base)}
							to="/germinator"
							onClick={() => setMenuOpen(false)}
						>
							Germinator
						</NavLink>
						<NavLink
							className={({ isActive }) => (isActive ? active : base)}
							to="/nulay"
							onClick={() => setMenuOpen(false)}
						>
							Nu Lay Inn
						</NavLink>
					</div>
				)
			}
		</nav>
	);
};

export default Navbar;
