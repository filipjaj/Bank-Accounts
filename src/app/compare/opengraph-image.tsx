import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "Sammenlign bankkontoer";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image() {
  // Font
  //   const interSemiBold = fetch(
  //     new URL("./Inter-SemiBold.ttf", import.meta.url)
  //   ).then((res) => res.arrayBuffer());

  const res = await fetch("https://www.kontovelger.no/api/all");

  const data = await res.json();
  const account = data?.[0];

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 20,
          background: "#dc2626",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          color: "white",
        }}
      >
        <p>
          Den beste kontoen akkurat nå er {account.accountName} fra{" "}
          {account.bankName}
        </p>
        <p
          style={{
            fontSize: 10,
            background: "#dc2626",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            color: "white",
          }}
        >
          Med renter fra {account.interestRate.interest} %
        </p>
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
      //   fonts: [
      //     {
      //       name: "Inter",
      //       data: await interSemiBold,
      //       style: "normal",
      //       weight: 400,
      //     },
      //   ],
    }
  );
}
