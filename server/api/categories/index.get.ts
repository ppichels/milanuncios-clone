import type { categories } from "@prisma/client";
import prisma from "~/server/lib/prisma";
import { z } from "zod";

const queryParamsSchema = z.object({
  searchTerm: z.string().min(3).optional(),
});

export interface categoryParent extends categories {
  childrens: categoryParent[];
}

export default defineEventHandler(async (event) => {
  const { searchTerm } = await getValidatedQuery(
    event,
    queryParamsSchema.parse,
  );

  const categories = await prisma.categories.findMany({
    where: {
      ...(searchTerm
        ? { name: { contains: searchTerm, mode: "insensitive" } }
        : {}),
    },
  });

  if (searchTerm) {
    return categories;
  }

  const formattedCategories = categories.map(
    (category) =>
      <categoryParent>{
        ...category,
        childrens: [],
      },
  );

  formattedCategories
    .filter((category) => category.parent_id)
    .forEach((category) => {
      const parent = formattedCategories.find(
        (parent) => parent.id === category.parent_id,
      );
      parent?.childrens.push(category);
    });

  const categoriesByParent = formattedCategories.filter(
    (category) => !category.parent_id,
  );

  return categoriesByParent;
});
