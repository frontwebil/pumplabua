import { OrderPageContainer } from "@/components/OrderPage/OrderPageContainer";
import "@/components/OrderPage/OrderPage.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export default async function OrderPage() {
  const session = await getServerSession(authOptions);

  let user = null;

  if (session?.user?.id) {
    user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        name: true,
        surname: true,
        middleName: true,
        email: true,
        phoneNumber: true,
      },
    });
  }

  console.log(user);
  return (
    <div className="OrderPage">
      <OrderPageContainer user={user}/>
    </div>
  );
}
