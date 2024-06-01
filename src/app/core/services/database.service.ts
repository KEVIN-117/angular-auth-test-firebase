import {inject, Injectable} from '@angular/core';
import {FileUpload} from "./storage.service";
import {Database, get, push, child, getDatabase, ref, onValue} from "@angular/fire/database";
import { v4 as uuid } from 'uuid'

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private database = inject(Database)

  constructor() { }



  insertData(data: FileUpload, path: string){
    const db = getDatabase()
    const json = {
      key: uuid(),
      data: {
        name: data.name,
        url: data.url
      }
    }
    console.log(json)
    return push(ref(db, path), json)
  }

  getDataRealTime(path: string, callback:(data: any)=> void){
    const db = getDatabase()
    const dataRef= ref(db, path)
    onValue(dataRef, (snapshot) => {
      const data = snapshot.val()
      callback(data)
    })
  }

  async getDataOnce(path: string): Promise<any> {
    const dbRef = ref(getDatabase());
    const snapshot = await get(child(dbRef, path));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No data available");
      return null;
    }
  }
}

