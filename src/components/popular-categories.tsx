"use client"
import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useLocalizedCategories } from "@/components/language-provider"
import { useLanguage } from "@/components/language-provider"
import Link from "next/link"
import Image from "next/image"

export default function PopularCategoriesSection() {
  const { t } = useLanguage();
  const categories = useLocalizedCategories();

  return (
    <div className="py-8 sm:py-12 lg:py-16 xl:py-20 flex justify-center flex-col items-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-6xl mx-auto text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4">
              {t("popular.categories.title")}
            </h2>
        </div>
        <Carousel className="w-full max-w-6xl mx-auto">
            <CarouselContent>
            {categories.slice(0, 7).map((category, index) => (
                <CarouselItem className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4" key={index}>
                    <Link href={`/search?category=${category.path}`} className="p-1">
                        <Card>
                            <CardContent className="relative overflow-hidden flex aspect-square items-center justify-center p-4 sm:p-6">
                                {category.img ? (
                                    <Image src={category.img} alt={category.name} fill className="object-cover rounded-md" />
                                ) : null}
                                <div className="absolute top-0 left-0 w-full py-2 sm:py-3 px-3 sm:px-4 text-base sm:text-xl font-semibold text-white bg-black/20">
                                  {category.name}
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                </CarouselItem>
            ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
        </Carousel>
    </div>
  );
}







