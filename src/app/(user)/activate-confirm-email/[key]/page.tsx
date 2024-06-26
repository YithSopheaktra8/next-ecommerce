"use client";
import { GiConfirmed } from "react-icons/gi";
type Props = {
	params: {
		key: string;
	};
	searchParams: any;
};

import style from "./style.module.css";
import Button from "./components/Button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useVerifyEmailMutation } from "@/redux/service/user";
import { useEffect } from "react";
import LoadingComponent from "@/components/LoadingComponent";

export default function ConfirmEmail(props: Props) {
	const [verifyEmail, { isLoading, data }] = useVerifyEmailMutation();
	const { key } = props.params;
	console.log(key);

	const handleVerifyEmail = async () => {
		try {
			const res = await verifyEmail(decodeURIComponent(key)).unwrap();
			if (res.status === 200) {
				console.log("verifyEmail:", data);
				console.log("Email has been confirmed!");
			}
		} catch (e) {
			console.log("error verify email", e);
		}
	};

	useEffect(() => {
		handleVerifyEmail();
	}, [key]);

	if (isLoading) {
		return <LoadingComponent />;
	}

	return (
		<main className={style.container}>
			{/* Confirm Email Card */}
			<section className="flex flex-col items-center">
				{/* Icon Confirm */}
				<GiConfirmed color="#080" className="h-44 w-44 mb-8" />
				{/* Title */}
				<h1 className="text-6xl my-4">Email has been Confirmed!</h1>
				{/* Description */}
				<p className="text-3xl">
					Your email comfirmed! you can go to login page by press
					below button!
				</p>
				<p className="text-3xl my-4">
					សូមអរគុណសម្រាប់ការបញ្ជាក់អ៊ីមែល!
					អ្នកអាចចូលទៅទំព័រចូលដោយចុចលើប៊ូតុងខាងក្រោយ!
				</p>
				{/* Button */}
				<Link
					href="/login"
					className="my-8 bg-blue-500 px-24 py-8 rounded-lg text-white font-bold text-5xl">
					Login
				</Link>
			</section>
		</main>
	);
}
