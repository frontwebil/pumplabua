// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";

// export async function GET() {
//   const products = await prisma.product.findMany({
//     where: {
//       isPublished: true,
//     },
//     include: {
//       variants: true,
//     },
//   });

//   const xml = `<?xml version="1.0" encoding="UTF-8"?>
// <rss version="2.0"
//      xmlns:g="http://base.google.com/ns/1.0">
// <channel>
// <title>PumpLab UA</title>
// <link>https://pumplabua.shop</link>
// <description>Official PumpLab product feed</description>

// ${products
//   .map((product: any) => {
//     const variant =
//       product.variants.find((v: any) => v.isMain) || product.variants[0];

//     if (!variant) return "";

//     const price =
//       variant.discount > 0
//         ? Math.ceil(variant.price - variant.price * (variant.discount / 100))
//         : variant.price;

//     return `
// <item>
//   <g:id>${product.id}</g:id>
//   <g:title><![CDATA[${product.name}]]></g:title>
//   <g:description><![CDATA[${product.mainDescription}]]></g:description>
//   <g:link>https://pumplabua.shop/product/${product.slug}</g:link>
//   <g:image_link>${variant.images?.[0]}</g:image_link>

//   <g:availability>${variant.inStock ? "in_stock" : "out_of_stock"}</g:availability>
//   <g:price>${price} UAH</g:price>

//   <g:brand>${product.brand || "PumpLab"}</g:brand>
//   <g:condition>new</g:condition>

// </item>`;
//   })
//   .join("")}

// </channel>
// </rss>`;

//   return new NextResponse(xml, {
//     headers: {
//       "Content-Type": "application/xml",
//     },
//   });
// }
