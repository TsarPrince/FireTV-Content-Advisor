import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import * as cheerio from "cheerio";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q");

    const data = await axios.get(`https://www.amazon.com/s?k=${q}`, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
      },
    });
    const $ = cheerio.load(data.data);
    const products = $('div[data-component-type="s-search-result"]');
    const productData = products
      .map((_, element) => {
        const imgSrc = $(element).find("img").attr("src");
        const h2Text = $(element)
          .find(".a-section.s-title-instructions-style h2")
          .text();
        const numRatings = $(element)
          .find(".a-row.a-size-small .a-size-base.s-underline-text")
          .text();
        const starRating = $(element)
          .find(".a-icon.a-icon-star-small span")
          .text();
        const price = $(element).find(".a-price").text();
        const link = $(element).find("a").attr("href");

        return {
          imgSrc,
          h2Text,
          numRatings,
          starRating,
          price,
          link: "https://www.amazon.com" + link,
        };
      })
      .toArray();

    return NextResponse.json(productData);
  } catch (e) {
    console.error(e);
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 500 });
    } else {
      return NextResponse.json({}, { status: 500 });
    }
  }
}
