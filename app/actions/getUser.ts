import client from "@libs/prismadb";
import getSession from "./getSession";

const getUsers = async () => {
	const session = await getSession();

	if (!session?.user?.email) {
		return null;
	}

	try {
		const users = client.user.findMany({
			orderBy: {
				createdAt: "desc",
			},
			where: {
				NOT: {
					email: session.user.email,
				},
			},
		});

		return users;
	} catch (error) {
		return [];
	}
};

export default getUsers;
