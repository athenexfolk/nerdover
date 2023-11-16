import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Image } from '../models/image';

@Injectable({
  providedIn: 'root',
})
export class ImageRepositoryService {
  private readonly imageEndpoint = '/api/images';

  constructor(private http: HttpClient) {}

  findAll() {
    return this.http.get<Image[]>(this.imageEndpoint);
  }

  uploadImage(image: File) {
    const formData = new FormData();
    formData.append('file', image);
    return this.http.post<Image>(`${this.imageEndpoint}/upload`, formData);
  }
}
