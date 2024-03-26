"use client";

import { fetchDatafromSstrapi } from "@/utils/api";
import { useEffect, useState } from "react";
import CategoryCard from "@/components/CategoryCard";

export default function Category () {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchAsyncData = async () => {
            try {
                const fetchedData = await fetchDatafromSstrapi('categories');
                setData(fetchedData);
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };

        fetchAsyncData();
    }, []);

    
    return (
        <div className="flex flex-col space-between font-sans items-center px-20 pb-20">
            <h1 className="text-3xl text-bold mt-5 mb-10">Categories</h1>
            {data && (
                <div className="flex grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                    {/* {console.log(data)} */}
                    {
                        data.data.map((category) => (
                            <CategoryCard
                                key={category.id}
                                title={category.attributes.title}
                                description={category.attributes.description}
                                imageUrl={category.attributes.image.data.attributes.url}
                            />
                        ))
                    }
                </div>
            )}
        </div>
    )
}