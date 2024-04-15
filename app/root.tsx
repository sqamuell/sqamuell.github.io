import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from "@remix-run/react";
import { useState } from 'react';

import NavBar from "./NavBar";
import AlbumSelector from "./album-selector";

import type { LinksFunction } from "@remix-run/node";
import stylesheet from "~/tailwind.css?url";
import { Block } from "@react-three/fiber/dist/declarations/src/core/utils";

export const links: LinksFunction = () => [
	{ rel: "stylesheet", href: stylesheet },
];

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="description" content="Samuel Losi is a student of Computational Design. He is attending the University of Stuttgart's ITECH Program to study intimate processes of digital making." />
				<meta name="keywords" content="architect, computational design, student, architecture portfolio, carnegie mellon university, school of architecture, institue of compoutational design, university of stuttgart, design, architecture, ITECH, soa, sam losi, samuel losi, losi, undergraduate student, graduate student, computation, robotics, architectural robotics" />
				<Meta />
				<Links />
			</head>
			<body>
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {

	return (
		<div className="w-full h-screen">

			<AlbumSelector />
			<Outlet />
			<NavBar />

		</div>
	);
}
