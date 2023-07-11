"use client";

import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BsGithub, BsGoogle } from "react-icons/bs";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import type { Variant } from "../../../types/auth";
import type { FieldValues, SubmitHandler } from "react-hook-form/dist/types";

import Input from "@components/input/Input";
import Button from "@components/Button";
import AuthSocialButton from "./AuthSocialButton";
import { RegisterParams, apiRegister } from "@service/auth";
import notification from "@utils/notification";

const AuthForm = () => {
	const session = useSession();
	const router = useRouter();
	const [variant, setVariant] = useState<Variant>("LOGIN");
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		if (session?.status === "authenticated") {
			router.push("/users");
		}
	}, [session?.status, router]);

	const toggleVariant = useCallback(() => {
		if (variant === "LOGIN") {
			setVariant("REGISTER");
		} else {
			setVariant("LOGIN");
		}
	}, [variant]);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			email: "",
			password: "",
			userName: "",
		},
	});

	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		setIsLoading(true);
		if (variant === "REGISTER") {
			try {
				await apiRegister(data as RegisterParams);
				router.push("/users");
			} catch (error) {
				notification.error((error as Error)?.message);
			} finally {
				setIsLoading(false);
			}
		}

		if (variant === "LOGIN") {
			signIn("credentials", {
				...data,
				redirect: false,
			})
				.then((callback) => {
					if (callback?.error) {
						notification.error("Invalid credentials");
					}

					if (callback?.ok && !callback?.error) {
						notification.success("Logged in!");
						router.push("/users");
					}
				})
				.finally(() => {
					setIsLoading(false);
				});
		}
	};

	const socialAction = (action: string) => {
		setIsLoading(true);

		signIn(action, { redirect: false })
			.then((callback) => {
				console.log(callback);
				if (callback?.error) {
					notification.error("Invalid credentials");
				}

				if (callback?.ok && !callback?.error) {
					notification.success("Logged in!");
				}
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	return (
		<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
			<div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
				<form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
					{variant === "REGISTER" && (
						<Input
							errors={errors}
							id="name"
							label="Name"
							type="name"
							register={register}
							disabled={isLoading}
						/>
					)}
					<Input
						errors={errors}
						id="email"
						label="Email Address"
						type="email"
						register={register}
						disabled={isLoading}
					/>
					<Input
						errors={errors}
						id="password"
						label="Password"
						type="password"
						register={register}
						disabled={isLoading}
					/>

					<div>
						<Button disable={isLoading} fullWidth type="submit">
							{variant === "LOGIN" ? "Sign in" : "Register"}
						</Button>
					</div>
				</form>

				<div className="mt-6">
					<div className="relative">
						<div className="absolute inset-0 flex items-center">
							<div className="w-full border-t border-gray-300"></div>
						</div>
						<div className="relative flex justify-center text-sm">
							<span className="bg-white px-2 text-gray-500">Or continue with</span>
						</div>
					</div>
					<div className="mt-6 flex gap-2">
						<AuthSocialButton
							Icon={BsGithub}
							onCLick={() => socialAction("github")}
						/>
						<AuthSocialButton
							Icon={BsGoogle}
							onCLick={() => socialAction("google")}
						/>
					</div>
				</div>

				<div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
					<div className="">
						{variant === "LOGIN" ? "New to Messenger?" : "Already have an account?"}
					</div>
					<div onClick={toggleVariant} className="underline cursor-pointer">
						{variant === "LOGIN" ? "Create an account" : "Login"}
					</div>
				</div>
			</div>
		</div>
	);
};

export default AuthForm;
