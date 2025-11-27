import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { AccauntOrdersContent } from "@/components/AccountComponents/AccauntOrdersContent";
import { Breadcrumbs } from "@/components/Breadcrumbs/Breadcrumbs";
import { HeroTemplateSmall } from "@/components/HeroTemplate/HeroTemplateSmall";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export default async function page() {
  const session = await getServerSession(authOptions);

  const orders = await prisma.order.findMany({
    where: {
      email: session?.user.email,
    },
    include: {
      items: true,
    },
  });

  return (
    <>
      <HeroTemplateSmall
        title="Персональний акаунт"
        bgImage="/Account/bg.png"
      />
      <Breadcrumbs
        links={[{ title: "Головна", href: "/" }, { title: "Користувач" }]}
      />
      <AccauntOrdersContent orders={orders} />
    </>
  );
}
