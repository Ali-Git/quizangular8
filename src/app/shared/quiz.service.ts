import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  readonly rootUrl = "http://localhost:8080";
  qns: any[];
  seconds: number;
  timer;
  qnProgress: number;
  correctAnswerCount: number =0;
  constructor(private http: HttpClient) { }

  displayTimeElapsed() {
    return Math.floor(this.seconds / 3600) + ':' + Math.floor(this.seconds / 60) + ':' + Math.floor(this.seconds % 60);
  }

  getParticipantName() {
    var participant = JSON.parse(localStorage.getItem('participant'));
    return participant.name;
  }

  saveOrUpdateParticipant(name :string, email : string){
    console.log('imhere');
      var body = {
        "name": name,
        "email": email
      }
      return this.http.post(this.rootUrl + '/api/saveorupdate/participant', body)
  }

  getQuestions(){
      return this.http.get(this.rootUrl +'/api/questions');
  }

  submitScore() {
    var body = JSON.parse(localStorage.getItem('participant'));
    body.Score = this.correctAnswerCount;
    body.TimeSpent = this.seconds;
    return this.http.post(this.rootUrl + '/api/saveorupdate/participant', body);
  }

  getAnswers() {
    return this.http.get(this.rootUrl + '/api/answers');
  }
}
