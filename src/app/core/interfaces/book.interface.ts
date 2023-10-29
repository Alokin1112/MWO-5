export interface BookDTO {
  id: number;
  title: string;
  author: string;
  pageCount: number;
  price: number;
  photoUrl?: string;
}

export type Book = Omit<BookDTO, "id">;