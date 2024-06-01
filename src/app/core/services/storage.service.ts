import {inject, Injectable, signal} from '@angular/core';
import {getDownloadURL, getStorage, ref, Storage, uploadBytesResumable} from "@angular/fire/storage";

import {DatabaseService} from "./database.service";
import {Observable} from "rxjs";
import firebase from "firebase/compat";
import {DataBaseImagesDto} from "../../../types";


export class FileUpload {
  key!: string;
  name!: string;
  url!: string;
  file!: File;

  constructor(file: File) {
    this.file = file;
  }
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private storageService = inject(Storage)
  private database = inject(DatabaseService)
  private storage = getStorage()
  private basePath = '/uploads'
  private storageRef = ref(this.storage, this.basePath)

  private readonly metadata: any

  constructor() {
    this.metadata = {
      contentType: 'image/jpeg'
    }
  }

  async uploadFile(data: File) {
    const file = new FileUpload(data)
    console.log(file)

    const imageRef = ref(this.storage, `${this.basePath}/${file.file.name}`);
    const task = uploadBytesResumable(imageRef, file.file, this.metadata)
    task.on('state_changed', (snapshot)=>{
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    },
      (error) => {
        switch (error.code){
          case 'storage/unauthorized':
            console.log('User does not have permission to access the object');
            break;
          case 'storage/canceled':
            console.log('User canceled the upload');
            break;
          case 'storage/unknown':
            console.log('Unknown error occurred, inspect error.serverResponse');
            break;
        }
      },
    async () => {
      file.url = await getDownloadURL(task.snapshot.ref)
      file.name = file.file.name
      await this.database.insertData(file, this.basePath)
    })
  }

   getImages(): Observable<DataBaseImagesDto[]>{
    return new Observable<DataBaseImagesDto[]>(subscriber => {
      this.database.getDataRealTime(this.basePath, (data) => {
        const images: DataBaseImagesDto[] = []
        this.database.getDataRealTime(this.basePath, (data: any) => {
          const imagesData: DataBaseImagesDto[] = Object.values(data)
          images.push(...imagesData)
        })
        subscriber.next(images)
      })
    })
  }
}
