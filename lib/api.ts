
const API_BASE_URL = "https://openapi.programming-hero.com/api/bazardor";

export type Market = {
  market: string;
  division: string;
  min: number;
  max: number;
};

export type Product = {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
  markets: Market[];
};

export type Category = {
  slug: string;
  nameBn: string;
  icon?: string;
  [key: string]: unknown;
};

async function requestApi<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function getProducts(): Promise<Product[]> {
  return requestApi<Product[]>("/products");
}

export async function getProductById(
  id: number | string,
): Promise<Product> {
  return requestApi<Product>(`/products/${id}`);
}

export async function getCategories(): Promise<Category[]> {
  return requestApi<Category[]>("/categories");
}

export async function getProductsByCategory(
  category: string,
): Promise<Product[]> {
  return requestApi<Product[]>(
    `/products?category=${encodeURIComponent(category)}`,
  );
}

export async function getCategoryBySlug(
  slug: string,
): Promise<Category> {
  return requestApi<Category>(
    `/categories/${encodeURIComponent(slug)}`,
  );
}
