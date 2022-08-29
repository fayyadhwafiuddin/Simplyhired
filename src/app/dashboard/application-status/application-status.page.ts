import { Component,NgZone, OnInit } from '@angular/core';
import { getFirestore, collection, onSnapshot, doc, getDoc, getDocs, QuerySnapshot } from 'firebase/firestore';
import { getApp } from 'firebase/app';
import { Jobs } from '../../models/jobs';

@Component({
  selector: 'app-application-status',
  templateUrl: './application-status.page.html',
  styleUrls: ['./application-status.page.scss'],
})
export class ApplicationStatusPage implements OnInit { 

  public jobList: Jobs[] = [];

  constructor(private zone: NgZone) { }

  async ngOnInit() {
    const firebaseApp = getApp();
    const db = getFirestore(firebaseApp);

    //to get collection from firestore
    const jobscollection = await getDocs(collection(db, 'jobposted'));
    
    //push data to array
    //this also help to show to homepage
    jobscollection.forEach((doc) => { 
      this.jobList.push({
        company_name : doc.data().company_name,
        img : doc.data().img,
        job_position : doc.data().job_position,
        location: doc.data().location,
        more_info: doc.data().more_info,
        requirement: doc.data().requirement,
        salary_from: doc.data().salary_from,
        salary_to: doc.data().salary_to,
        post_duration: doc.data().post_duration,
      });

      //this is just to show if data can be retrieved
      console.log(doc.id, " => ", doc.data());
    });
  }

}