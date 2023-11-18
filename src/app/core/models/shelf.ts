export interface Shelf {
  id: string;
  name: string;
  cover?: string;
}

export interface ShelfDto {
  id: string;
  name: string;
  cover?: File;
}